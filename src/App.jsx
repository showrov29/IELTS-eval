import { useState } from "react";

import "./App.css";
import {
	Hume,
	HumeClient,
	convertBase64ToBlob,
	convertBlobToBase64,
	getAudioStream,
	getBrowserSupportedMimeType,
	MimeType,
} from "hume";
import { extractTopThreeEmotions, appendMessage } from "./helper/helper";
let client, socket, recorder, audioStream, chatGroupId, isPlaying, currentAudio;
let connected;
let audioQueue = [];
function App() {
	const connect = async () => {
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

		socket.on("open", handleWebSocketOpenEvent);
		socket.on("message", handleSocketMessageEvent);
	};

	const startSepaking = async () => {
		connect();
	};

	return (
		<>
			<button onClick={() => startSepaking()}>Click me</button>
		</>
	);
}

async function handleWebSocketOpenEvent() {
	console.log("socket opened");
	connected = true;
	await captureAudio();
}
async function captureAudio() {
	audioStream = await getAudioStream();
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
export default App;
