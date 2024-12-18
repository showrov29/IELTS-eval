import { Link } from "react-router-dom";

export function Footer() {
	return (
		<footer className="bg-indigo-900 text-white py-8">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-xl font-semibold mb-4">IELTS Speak Pro</h3>
						<p>
							Empowering learners to achieve their IELTS goals in all four
							skills: Speaking, Writing, Listening, and Reading.
						</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<Link to="/" className="hover:text-indigo-300">
									Home
								</Link>
							</li>
							<li>
								<Link to="/about" className="hover:text-indigo-300">
									About
								</Link>
							</li>
							<li>
								<Link to="/test" className="hover:text-indigo-300">
									Speaking Test
								</Link>
							</li>
							<li>
								<Link to="/writing" className="hover:text-indigo-300">
									Writing Practice
								</Link>
							</li>
							<li>
								<Link to="/listening" className="hover:text-indigo-300">
									Listening Test
								</Link>
							</li>
							<li>
								<Link to="/reading" className="hover:text-indigo-300">
									Reading Test
								</Link>
							</li>
							<li>
								<Link to="/contact" className="hover:text-indigo-300">
									Contact
								</Link>
							</li>
							<li>
								<Link to="/faq" className="hover:text-indigo-300">
									FAQ
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Resources</h4>
						<ul className="space-y-2">
							<li>
								<Link to="/blog" className="hover:text-indigo-300">
									Blog
								</Link>
							</li>
							<li>
								<Link to="/faq" className="hover:text-indigo-300">
									FAQ
								</Link>
							</li>
							<li>
								<Link to="/terms" className="hover:text-indigo-300">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link to="/privacy" className="hover:text-indigo-300">
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Connect</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="https://facebook.com"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-indigo-300">
									Facebook
								</a>
							</li>
							<li>
								<a
									href="https://twitter.com"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-indigo-300">
									Twitter
								</a>
							</li>
							<li>
								<a
									href="https://instagram.com"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-indigo-300">
									Instagram
								</a>
							</li>
							<li>
								<a
									href="https://linkedin.com"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-indigo-300">
									LinkedIn
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-indigo-800 text-center">
					<p>&copy; 2023 IELTS Speak Pro. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
