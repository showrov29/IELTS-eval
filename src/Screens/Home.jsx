import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const headerRef = useRef(null);
	const heroRef = useRef(null);
	const featuresRef = useRef(null);
	const contactRef = useRef(null);

	useEffect(() => {
		const header = headerRef.current;
		const hero = heroRef.current;
		const features = featuresRef.current;
		const contact = contactRef.current;

		gsap.from(header, {
			y: -100,
			opacity: 0,
			duration: 1,
			ease: "power3.out",
		});

		gsap.from(hero, {
			opacity: 0,
			y: 50,
			duration: 1,
			delay: 0.5,
			ease: "power3.out",
		});

		gsap.from(features.querySelectorAll(".feature-item"), {
			opacity: 0,
			y: 50,
			duration: 0.8,
			stagger: 0.2,
			scrollTrigger: {
				trigger: features,
				start: "top 80%",
			},
		});

		gsap.from(contact, {
			opacity: 0,
			y: 50,
			duration: 1,
			scrollTrigger: {
				trigger: contact,
				start: "top 80%",
			},
		});
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
			<Header ref={headerRef} />

			<main className="container mx-auto px-4 py-8">
				<section ref={heroRef} className="text-center mb-16">
					<h1 className="text-5xl font-bold mb-4 text-indigo-900">
						Master IELTS Speaking
					</h1>
					<p className="text-xl mb-8 text-indigo-700">
						Prepare for success with our interactive mock tests
					</p>
					<div className="w-64 h-64 mx-auto mb-8">
						{/* <Lottie animationData={speakingAnimation} loop={true} /> */}
					</div>
					<Link  to={'/mock-test'}>
						<Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
							Start Mock Test
						</Button>
					</Link>
				</section>

				<section ref={featuresRef} className="grid md:grid-cols-2 gap-8 mb-16">
					{[
						{
							title: "Realistic Simulation",
							description:
								"Experience a test environment that closely mimics the real IELTS Speaking test.",
							icon: "🎭",
						},
						{
							title: "Immediate Feedback",
							description:
								"Receive instant feedback on your performance to help you improve.",
							icon: "📊",
						},
						{
							title: "Flexible Practice",
							description: "Practice at your own pace, anytime and anywhere.",
							icon: "🕰️",
						},
						{
							title: "Comprehensive Coverage",
							description: "Covers all three parts of the IELTS Speaking test.",
							icon: "📚",
						},
					].map((feature, index) => (
						<div
							key={index}
							className="feature-item bg-white p-6 rounded-lg shadow-lg">
							<div className="text-4xl mb-4">{feature.icon}</div>
							<h3 className="text-2xl font-semibold mb-2 text-indigo-800">
								{feature.title}
							</h3>
							<p className="text-indigo-600">{feature.description}</p>
						</div>
					))}
				</section>

				<section className="mb-16">
					<h2 className="text-3xl font-bold mb-8 text-center text-indigo-900">
						Comprehensive IELTS Preparation
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-2xl font-semibold mb-4 text-indigo-800">
								Speaking Practice
							</h3>
							<p className="text-indigo-600 mb-4">
								Enhance your speaking skills with our interactive mock tests
								covering all parts of the IELTS Speaking exam.
							</p>

							<Link to={"/speaking"}>
								<Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
									Start Speaking Test
								</Button>
							</Link>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<h3 className="text-2xl font-semibold mb-4 text-indigo-800">
								Writing Practice
							</h3>
							<p className="text-indigo-600 mb-4">
								Improve your writing skills with our guided practice sessions
								for both Task 1 and Task 2 of the IELTS Writing exam.
							</p>
							<Link href="/writing">
								<Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
									Start Writing Practice
								</Button>
							</Link>
						</div>
					</div>
				</section>

				<section className="mb-16">
					<h2 className="text-3xl font-bold mb-8 text-center text-indigo-900">
						Our Success Stories
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{ name: "Sarah L.", score: "8.5", image: "/testimonial1.jpg" },
							{ name: "Michael R.", score: "8.0", image: "/testimonial2.jpg" },
							{ name: "Emily T.", score: "7.5", image: "/testimonial3.jpg" },
						].map((testimonial, index) => (
							<div
								key={index}
								className="bg-white p-6 rounded-lg shadow-lg text-center">
								<img
									src={testimonial.image}
									alt={testimonial.name}
									width={100}
									height={100}
									className="rounded-full mx-auto mb-4"
								/>
								<h3 className="text-xl font-semibold mb-2 text-indigo-800">
									{testimonial.name}
								</h3>
								<p className="text-indigo-600">
									Achieved a speaking score of {testimonial.score}
								</p>
							</div>
						))}
					</div>
				</section>

				<section ref={contactRef} className="text-center mb-16">
					<h2 className="text-3xl font-bold mb-4 text-indigo-900">
						Get in Touch
					</h2>
					<p className="text-xl mb-8 text-indigo-700">
						Have questions? We're here to help!
					</p>
					<div className="flex justify-center space-x-4">
						<Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
							Contact Us
						</Button>
						<Button
							variant="outline"
							className="border-indigo-600 text-indigo-600 hover:bg-indigo-100">
							FAQ
						</Button>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
