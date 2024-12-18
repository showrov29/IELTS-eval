import { useState } from "react";
// import "./index.css";
// import "./App.css";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestPart } from "@/components/ui/TestPart";
import { Link } from "react-router-dom";


function SpeakingTest() {
	const [activePart, setActivePart] = useState(null);
	
	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<h1 className="text-3xl font-bold text-center mb-8">
				IELTS Speaking Mock Test
			</h1>
			{activePart === null ? (
				<div className="space-y-4">
					{[1, 2, 3].map((part) => (
						<Card key={part}>
							<CardHeader>
								<CardTitle>Part {part}</CardTitle>
								<CardDescription>
									{part === 1 && "Introduction and Interview"}
									{part === 2 && "Individual Long Turn"}
									{part === 3 && "Two-way Discussion"}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button onClick={() => setActivePart(part)}>
									Start Part {part}
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<TestPart part={activePart} onComplete={() => setActivePart(null)} />
			)}{" "}
		</div>
	);
}


export default SpeakingTest;
