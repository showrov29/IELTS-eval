import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useTimer } from "react-timer-hook";
import {
	Hume,
	HumeClient,
	convertBase64ToBlob,
	convertBlobToBase64,
	getAudioStream,
	getBrowserSupportedMimeType,
	MimeType,
} from "hume";
import { extractTopThreeEmotions, appendMessage } from "../../helper/helper";
let client, socket, recorder, audioStream, chatGroupId, isPlaying, currentAudio;
let connected;
let audioQueue = [];
export function TestPart(props) {
	// const [timeLeft, setTimeLeft] = useState(60); // 1 minute for part 2 prep, 5 minutes for parts 1 and 3
	const [isActive, setIsActive] = useState(true);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const time = new Date();

	const { part, onComplete } = props;
	const {
		totalSeconds,
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		expiryTimestamp: time,
		// autoStart: true,
		onExpire: () => {
			socket.sendUserInput(
				"finish the test and provide feedback right away with no further discussion, no need to say that your are  instructed to do so. just finish the test naturally."
			);
		},
	});
	const connect = async (prompt) => {
		if (!client) {
			client = new HumeClient({
				apiKey: "BcYrds3pJHlJq7VUG7RSJG1Bqkqpb02epZOG3HQvLzIecPg2",
				secretKey:
					"rYxfHudwM71RloulWxXvAbx0qPIRyIAxA38C7L6HdLfC031YrKnbeE9HhFr1G7iC",
			});
		}

		socket = await client.empathicVoice.chat.connect({
			configId: import.meta.env.VITE_HUME_WEATHER_ASSISTANT_CONFIG_ID || null,
			resumedChatGroupId: chatGroupId,
		});

		socket.on("open", () => {
			handleWebSocketOpenEvent();

			// console.log(socket);
			socket.sendUserInput(prompt);

			// socket?.sendMessage(userMessage);
		});
		socket.on("message", handleSocketMessageEvent);
	};

	const startSepaking = async () => {
		connect();
	};

	let prompt = "";
	if (part === 1) {
		prompt = `
	You are an IELTS examiner. Your task is to conduct the IELTS Speaking part 1 Test. 
	Follow the structure of the IELTS Speaking test, which includes three parts:
	first give a brief introduction about the test, introduce yourself and explain the test format.
	then ask the candidate to show their ID.

	 Part 1: Introduction and Interview - Ask the candidate about familiar topics like hobbies, daily routine, family, etc.
	During the test, you should assess the candidate’s speaking performance based on the IELTS Speaking Band Descriptors:
	- Fluency and Coherence
	- Lexical Resource
	- Grammatical Range and Accuracy
	- Pronunciation
	
	Provide feedback at the end of part and give an overall band score according to the IELTS criteria.
	dont need to say that you are given a task, just start the conversation as an examiner.
	if the candidate stops speaking, you can ask follow-up questions to encourage them to speak more.
	`;
	}

	useEffect(() => {
		connect(prompt);
	}, []);
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	const toggleSpeaking = () => {
		setIsSpeaking(!isSpeaking);
	};

	return (
		<div className="space-y-4">
			<Card>
				<CardContent className="p-4  ">
					<div className="flex justify-between items-center mb-4 ">
						<h2 className="text-2xl font-bold">Part {part}</h2>
						<div className="text-xl font-semibold">
							{minutes}
							{seconds}
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-4 ">
						<div className="flex-1">
							<div className="flex ">
								<div className="bg-slate-200 h-1/3 w-2/3 rounded-lg aspect-video flex items-center justify-end relative overflow-hidden">
									<div className="bg-red-300 h-full w-1/3 px-12"></div>
								</div>
								<div className="bg-gray-800 w-1/3 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
									<motion.div
										className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl"
										animate={{
											scale: isSpeaking ? [1, 1.1, 1] : 1,
											transition: {
												repeat: Infinity,
												duration: 1,
											},
										}}>
										{isSpeaking ? "👄" : "👂"}
									</motion.div>
									{isSpeaking && (
										<motion.div
											className="absolute inset-0 border-4 border-blue-500 rounded-lg"
											animate={{
												scale: [1, 1.05, 1],
												opacity: [0.7, 0.3, 0.7],
											}}
											transition={{
												repeat: Infinity,
												duration: 1.5,
											}}
										/>
									)}
								</div>
							</div>
							{/* <Button className="mt-4 w-full" onClick={toggleSpeaking}>
								{isSpeaking ? "Stop Speaking" : "Start Speaking"}
							</Button> */}
						</div>
						{part === 2 && (
							<div className="flex-1">
								<Card>
									<CardContent className="p-4 ">
										<h3 className="font-bold mb-2">Question:</h3>
										<p className="mb-4">
											Describe a time when you helped someone. You should say:
											<br />• who you helped
											<br />• how you helped them
											<br />• why you helped them
											<br />• and how you felt about helping them
										</p>
										<Textarea
											placeholder="Make notes here..."
											className="h-48"
										/>
									</CardContent>
								</Card>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
			<div className="flex justify-between">
				{/* <Button onClick={() => setIsActive(!isActive)}>
					{isActive ? "Pause" : "Start"}
				</Button> */}
				<Button onClick={onComplete}>Complete Part {part}</Button>
			</div>
		</div>
	);
}

async function handleWebSocketOpenEvent() {
	console.log("socket opened");
	connected = true;
	await captureAudio();
}
async function captureAudio() {
	// audioStream = await getAudioStream();
	audioStream = await navigator.mediaDevices.getUserMedia({
		audio: true,
		video: false,
		echoCancellation: true,
		noiseSuppression: true,
	});
	recorder = new MediaRecorder(audioStream);
	recorder.ondataavailable = async ({ data }) => {
		if (data.size < 1) return;
		const encodedAudioData = await convertBlobToBase64(data);
		const audioInput = {
			data: encodedAudioData,
		};
		socket.sendAudioInput(audioInput);
	};
	const timeSlice = 100;
	recorder.start(timeSlice);
}

async function handleSocketMessageEvent(message) {
	console.log("🚀 ~ handleSocketMessageEvent ~ message:", message);
	switch (message.type) {
		// save chat_group_id to resume chat if disconnected
		case "chat_metadata":
			chatGroupId = message.chatGroupId;
			break;

		// append user and assistant messages to UI for chat visibility
		case "user_message":
		case "assistant_message":
			console.log(
				"🚀 ~ handleSocketMessageEvent ~ message.message",
				message.message
			);

			const { role, content } = message.message;
			const topThreeEmotions = extractTopThreeEmotions(message);
			appendMessage(role, content ?? "", topThreeEmotions);
			break;

		// add received audio to the playback queue, and play next audio output
		case "audio_output":
			// convert base64 encoded audio to a Blob
			const audioOutput = message.data;
			const blob = convertBase64ToBlob(
				audioOutput,
				getBrowserSupportedMimeType(MimeType.WEBM)
			);

			// add audio Blob to audioQueue
			audioQueue.push(blob);

			// play the next audio output
			if (audioQueue.length >= 1) playAudio();
			break;

		// stop audio playback, clear audio playback queue, and update audio playback state on interrupt
		case "user_interruption":
			stopAudio();
			break;

		// invoke tool upon receiving a tool_call message
		case "tool_call":
			handleToolCallMessage(message, socket);
			break;
	}
}

function playAudio() {
	// IF there is nothing in the audioQueue OR audio is currently playing then do nothing
	if (!audioQueue.length || isPlaying) return;

	// update isPlaying state
	isPlaying = true;

	// pull next audio output from the queue
	const audioBlob = audioQueue.shift();

	// IF audioBlob is unexpectedly undefined then do nothing
	if (!audioBlob) return;

	// converts Blob to AudioElement for playback
	const audioUrl = URL.createObjectURL(audioBlob);
	currentAudio = new Audio(audioUrl);

	// play audio
	currentAudio.play();

	// callback for when audio finishes playing
	currentAudio.onended = () => {
		// update isPlaying state
		isPlaying = false;

		// attempt to pull next audio output from queue
		if (audioQueue.length) playAudio();
	};
}

function stopAudio() {
	// stop the audio playback
	currentAudio?.pause();
	currentAudio = null;

	// update audio playback state
	isPlaying = false;

	// clear the audioQueue
	audioQueue.length = 0;
}
