import React, { useEffect, useState, useRef, useContext } from "react";
import Skillbox from "../components/Skillbox";
import "../styles/home.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AboutSegment from "../components/AboutSegment";
import { SkillContext } from "../components/SkillContext";
import aboutWriteup from "../data/aboutWriteup.json";
import skills from "../data/skills.js";
import icon_gh from "../assets/images/icons/gh.png";
import icon_li from "../assets/images/icons/li.png";
import icon_mail from "../assets/images/icons/mail.png";

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

	const { skillDesc } = useContext(SkillContext);

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
				<div className="description">
					<h1>My Skills</h1>
					<p>Click on any skill to learn more!</p>
					<hr />
					<h2>
						{(() => {
							const skill = skills.find(
								(skill) => skill.name === skillDesc,
							);
							if (!skill) return "";
							return skill.name;
						})()}
					</h2>
					<div id="skill-blurb">
						<div>
							<p>
								{(() => {
									const skill = skills.find(
										(skill) => skill.name === skillDesc,
									);
									if (!skill) return "";
									return skill.desc;
								})()}
							</p>
						</div>
					</div>
				</div>
				<Skillbox />
			</div>

			{/* Projects section */}
			<div className="section" id="projects"></div>

			{/* Media section */}
			<div className="section" id="media">
				<div id="transition"></div>
			</div>

			{/* Concluding section */}
			<div className="section" id="conclusion">
				<div className="thanks">
					<p>Thank you for visiting!</p>
					<p id="small">Let's be in touch!</p>
					<div className="contacts">
						<a href="&#109;&#097;&#105;&#108;&#116;&#111;:&#105;&#098;&#050;&#054;&#050;&#064;&#099;&#111;&#114;&#110;&#101;&#108;&#108;&#046;&#101;&#100;&#117;">
							<img src={icon_mail} alt="" />
						</a>
						<a
							href="https://www.linkedin.com/in/irfan-azidan/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src={icon_li} alt="" />
						</a>
						<a
							href="https://github.com/irfanznz"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src={icon_gh} alt="" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
