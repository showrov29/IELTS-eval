import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function AnimatedInfo() {
	const items = [
		{
			title: "Realistic Simulation",
			description:
				"Experience a test environment that closely mimics the real IELTS Speaking test.",
		},
		{
			title: "Immediate Feedback",
			description:
				"Receive instant feedback on your performance to help you improve.",
		},
		{
			title: "Flexible Practice",
			description: "Practice at your own pace, anytime and anywhere.",
		},
		{
			title: "Comprehensive Coverage",
			description: "Covers all three parts of the IELTS Speaking test.",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{items.map((item, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: index * 0.1 }}>
					<Card>
						<CardContent className="p-4">
							<h3 className="font-bold mb-2">{item.title}</h3>
							<p className="text-sm text-gray-600">{item.description}</p>
						</CardContent>
					</Card>
				</motion.div>
			))}
		</div>
	);
}
