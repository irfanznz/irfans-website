import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import "./styles/index.scss";
import { SkillProvider } from "./components/SkillContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<SkillProvider>
			<Home />
		</SkillProvider>
	</React.StrictMode>,
);
