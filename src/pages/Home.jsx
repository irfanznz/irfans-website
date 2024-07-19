import Skillbox from "../components/Skillbox";
import "../styles/home.scss";
import { ReactLenis, useLenis } from "lenis/react";

function Home() {
	const lenis = useLenis(({ scroll }) => {
		// called every scroll
	});

	return (
		<ReactLenis root>
			{/* Intro section */}
			<div className="section intro">
				<p>hi! i'm</p>
				<p>irfan</p>
			</div>

			{/* About section */}
			<div className="section"></div>

			{/* Skills section */}
			<div className="section skills">
				<div className="description">
					<h1>Skills</h1>
					<p>
						Here are some of the skills I have acquired over the
						years.
					</p>
				</div>
				<Skillbox />
			</div>

			{/* Projects section */}
			<div className="section projects"></div>

			{/* Media section */}
			<div className="section"></div>

			{/* Concluding section */}
			<div className="section conclusion">
				<div className="thanks">
					<p>Thank you for visiting!</p>
					<div className="contacts">
						<a href="">m</a>
						<a href="">l</a>
						<a href="">g</a>
					</div>
				</div>
			</div>
		</ReactLenis>
	);
}

export default Home;
