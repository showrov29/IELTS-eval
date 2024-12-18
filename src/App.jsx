import React from "react";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MockTest from "./Test/MockTest";
import Speaking from "./Test/Speaking";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mock-test" element={<MockTest />} />
				<Route path="/speaking" element={<Speaking />} />
			</Routes>
		</Router>
	);
}
