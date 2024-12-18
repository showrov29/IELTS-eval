import { useState } from "react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const cambridgeTests = [
	{ id: 1, name: "Cambridge IELTS 1" },
	{ id: 2, name: "Cambridge IELTS 2" },
	{ id: 3, name: "Cambridge IELTS 3" },
	{ id: 4, name: "Cambridge IELTS 4" },
	{ id: 5, name: "Cambridge IELTS 5" },
	{ id: 6, name: "Cambridge IELTS 6" },
	{ id: 7, name: "Cambridge IELTS 7" },
	{ id: 8, name: "Cambridge IELTS 8" },
	{ id: 9, name: "Cambridge IELTS 9" },
	{ id: 10, name: "Cambridge IELTS 10" },
	{ id: 11, name: "Cambridge IELTS 11" },
	{ id: 12, name: "Cambridge IELTS 12" },
	{ id: 13, name: "Cambridge IELTS 13" },
	{ id: 14, name: "Cambridge IELTS 14" },
	{ id: 15, name: "Cambridge IELTS 15" },
	{ id: 16, name: "Cambridge IELTS 16" },
	{ id: 17, name: "Cambridge IELTS 17" },
];

const demoQuestions = [
	{
		section: 1,
		questions: [
			{
				id: 1,
				type: "fill",
				question: "The woman's name is _______.",
				answer: "Sarah",
			},
			{
				id: 2,
				type: "mcq",
				question: "What is the purpose of the call?",
				options: [
					"Book a hotel",
					"Make a complaint",
					"Request information",
					"Cancel a reservation",
				],
				answer: 1,
			},
		],
	},
	{
		section: 2,
		questions: [
			{
				id: 3,
				type: "fill",
				question: "The guided tour starts at _______ am.",
				answer: "9:30",
			},
			{
				id: 4,
				type: "mcq",
				question: "What is not included in the tour?",
				options: ["Transport", "Lunch", "Entry fees", "Guide"],
				answer: 1,
			},
		],
	},
	// Add more sections and questions as needed
];

export default function MockTest() {
	const [selectedTest, setSelectedTest] = useState(null);
	const [currentSection, setCurrentSection] = useState(0);
	const [userAnswers, setUserAnswers] = useState({});
	const [showResults, setShowResults] = useState(false);

	const handleStartTest = (test) => {
		setSelectedTest(test);
		setCurrentSection(0);
		setUserAnswers({});
		setShowResults(false);
	};

	const handleAnswer = (questionId, answer) => {
		setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
	};

	const handleNextSection = () => {
		if (currentSection < demoQuestions.length - 1) {
			setCurrentSection((prev) => prev + 1);
		} else {
			setShowResults(true);
		}
	};

	const calculateScore = () => {
		let score = 0;
		demoQuestions.forEach((section) => {
			section.questions.forEach((question) => {
				if (userAnswers[question.id] === question.answer) {
					score++;
				}
			});
		});
		return score;
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
			<Header />

			<main className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-center mb-8 text-indigo-900">
					IELTS Cambridge Practice Tests
				</h1>

				{!selectedTest ? (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{cambridgeTests.map((test) => (
							<Card
								key={test.id}
								className="hover:shadow-lg  transition-shadow duration-300">
								<CardHeader>
									<CardTitle>{test.name}</CardTitle>
									<CardDescription>Practice Listening Test</CardDescription>
								</CardHeader>
								<CardContent>
									<Button onClick={() => handleStartTest(test)}>
										Start Test
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				) : showResults ? (
					<Card>
						<CardHeader>
							<CardTitle>Test Results</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-xl mb-4">
								Your score: {calculateScore()} /{" "}
								{demoQuestions.reduce(
									(acc, section) => acc + section.questions.length,
									0
								)}
							</p>
							{demoQuestions.map((section) => (
								<div key={section.section} className="mb-4">
									<h3 className="text-lg font-semibold">
										Section {section.section}
									</h3>
									{section.questions.map((question) => (
										<div key={question.id} className="ml-4 mb-2">
											<p>{question.question}</p>
											<p className="text-green-600">
												Correct answer: {question.answer}
											</p>
											<p
												className={
													userAnswers[question.id] === question.answer
														? "text-green-600"
														: "text-red-600"
												}>
												Your answer: {userAnswers[question.id]}
											</p>
										</div>
									))}
								</div>
							))}
							<Button onClick={() => setSelectedTest(null)} className="mt-4">
								Back to Test Selection
							</Button>
						</CardContent>
					</Card>
				) : (
					<Card>
						<CardHeader>
							<CardTitle>{selectedTest.name} - Listening Test</CardTitle>
							<CardDescription>
								Section {demoQuestions[currentSection].section}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{demoQuestions[currentSection].questions.map((question) => (
								<div key={question.id} className="mb-4">
									<Label>{question.question}</Label>
									{question.type === "fill" ? (
										<Input
											type="text"
											value={userAnswers[question.id] || ""}
											onChange={(e) =>
												handleAnswer(question.id, e.target.value)
											}
											className="mt-1"
										/>
									) : (
										<RadioGroup
											value={userAnswers[question.id]}
											onValueChange={(value) =>
												handleAnswer(question.id, parseInt(value))
											}
											className="mt-1">
											{question.options.map((option, index) => (
												<div
													key={index}
													className="flex items-center space-x-2">
													<RadioGroupItem
														value={index.toString()}
														id={`q${question.id}-${index}`}
													/>
													<Label htmlFor={`q${question.id}-${index}`}>
														{option}
													</Label>
												</div>
											))}
										</RadioGroup>
									)}
								</div>
							))}
							<Button onClick={handleNextSection} className="mt-4">
								{currentSection < demoQuestions.length - 1
									? "Next Section"
									: "Submit Test"}
							</Button>
						</CardContent>
					</Card>
				)}
			</main>

			<Footer />
		</div>
	);
}
