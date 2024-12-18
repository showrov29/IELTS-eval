import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = React.forwardRef((props, ref) => {
	return (
		<header ref={ref} className="bg-white shadow-md">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<Link to="/" className="text-2xl font-bold text-indigo-900">
					IELTS Pro
				</Link>
				<nav>
					<ul className="flex space-x-4">
						{[
							{ to: "/", label: "Home" },
							{ to: "/about", label: "About" },
							{ to: "/test", label: "Speaking Test" },
							{ to: "/writing", label: "Writing Practice" },
							{ to: "/listening", label: "Listening Test" },
							{ to: "/reading", label: "Reading Test" },
							{ to: "/contact", label: "Contact" },
							{ to: "/faq", label: "FAQ" },
						].map((item) => (
							<li key={item.to}>
								<Link
									to={item.to}
									className="text-indigo-600 hover:text-indigo-800 relative group">
									{item.label}
									<span className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
					Sign Up
				</Button>
			</div>
		</header>
	);
});

Header.displayName = "Header";
