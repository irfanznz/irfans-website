import React, { useRef } from "react";
import Skillbox from "../components/Skillbox";
import "../styles/home.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AboutSegment from "../components/AboutSegment";
import aboutWriteup from "../data/aboutWriteup.json";

gsap.registerPlugin(useGSAP, gsap, ScrollTrigger);

function Home() {
	const home = useRef();

	useGSAP(
		(context, contextSafe) => {
			// About section background animation
			gsap.to("#about", {
				scrollTrigger: {
					trigger: "#about",
					start: "top bottom",
					end: "bottom top",
					scrub: 1.5,
				},
				"background-position": "10vw 10vh",
			});

			// Thanks section background animation
			gsap.to("#skills", {
				scrollTrigger: {
					trigger: "#skills",
					start: "top bottom",
					end: "bottom top",
					scrub: 1,
				},
				"background-position": "2vw 0, -4vw -11.1vh",
			});

			return () => {
				// cleanup
			};
		},
		{ scope: home },
	);

	return (
		<div ref={home}>
			{/* Intro section */}
			<div className="section" id="intro">
				<p>hi! i'm</p>
				<p>irfan</p>
			</div>

			{/* About section */}
			<div className="section" id="about">
				<div id="about-media"></div>
				<div id="about-desc">
					<AboutSegment type="spacer" />
					<AboutSegment type="content" text={aboutWriteup[0]} />
					<AboutSegment type="connector" />
					<AboutSegment type="content" text={aboutWriteup[1]} />
					<AboutSegment type="connector" />
					<AboutSegment type="content" text={aboutWriteup[2]} />
					<AboutSegment type="connector" />
					<AboutSegment type="content" text={aboutWriteup[3]} />
					<AboutSegment type="spacer" />
				</div>
			</div>

			{/* Skills section */}
			<div className="section" id="skills">
				<Skillbox />
				<div className="description">
					<h1>My Skills</h1>
					<p>
						Here are some of the skills I have acquired over the
						years.
					</p>
				</div>
			</div>

			{/* Projects section */}
			<div className="section" id="projects">
				s
			</div>

			{/* Media section */}
			<div className="section">s</div>

			{/* Concluding section */}
			<div className="section" id="conclusion">
				<div className="thanks">
					<p>Thank you for visiting!</p>
					<div className="contacts">
						<a href="">m</a>
						<a href="">l</a>
						<a href="">g</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
