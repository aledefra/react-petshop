import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRouter";
import { Header } from "./modules/layout/Header";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<AppRoutes />
			</BrowserRouter>
		</div>
	);
}

export default App;
