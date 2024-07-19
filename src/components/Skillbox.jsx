import { useEffect, useRef } from "react";
import { Engine, Render, Bodies, World, Runner, Body } from "matter-js";

function Skillbox(props) {
	const scene = useRef(null);
	const isPressed = useRef(false);
	const engine = useRef(Engine.create());
	const renderRef = useRef();
	const boundaries = useRef([]);

	useEffect(() => {
		const resizeRenderer = () => {
			if (scene.current) {
				const skillbox = scene.current;
				const cw = skillbox.clientWidth;
				const ch = skillbox.clientHeight;

				if (renderRef.current) {
					renderRef.current.bounds.max.x = cw;
					renderRef.current.bounds.max.y = ch;
					renderRef.current.options.width = cw;
					renderRef.current.options.height = ch;
					renderRef.current.canvas.width = cw;
					renderRef.current.canvas.height = ch;
				}

				// Update boundary positions and sizes
				if (boundaries.current.length === 4) {
					Body.setPosition(boundaries.current[0], {
						x: cw / 2,
						y: -10,
					});
					Body.setVertices(boundaries.current[0], [
						{ x: 0, y: 0 },
						{ x: cw, y: 0 },
						{ x: cw, y: 20 },
						{ x: 0, y: 20 },
					]);

					Body.setPosition(boundaries.current[1], {
						x: -10,
						y: ch / 2,
					});
					Body.setVertices(boundaries.current[1], [
						{ x: 0, y: 0 },
						{ x: 20, y: 0 },
						{ x: 20, y: ch },
						{ x: 0, y: ch },
					]);

					Body.setPosition(boundaries.current[2], {
						x: cw / 2,
						y: ch + 10,
					});
					Body.setVertices(boundaries.current[2], [
						{ x: 0, y: 0 },
						{ x: cw, y: 0 },
						{ x: cw, y: 20 },
						{ x: 0, y: 20 },
					]);

					Body.setPosition(boundaries.current[3], {
						x: cw + 10,
						y: ch / 2,
					});
					Body.setVertices(boundaries.current[3], [
						{ x: 0, y: 0 },
						{ x: 20, y: 0 },
						{ x: 20, y: ch },
						{ x: 0, y: ch },
					]);
				}
			}
		};

		if (scene.current) {
			const skillbox = scene.current;
			const cw = skillbox.clientWidth;
			const ch = skillbox.clientHeight;

			const render = Render.create({
				element: scene.current,
				engine: engine.current,
				options: {
					width: cw,
					height: ch,
					wireframes: false,
					background: "#00000000",
				},
			});

			const runner = Runner.create();

			renderRef.current = render;

			// Create boundary rectangles
			boundaries.current = [
				Bodies.rectangle(cw / 2, -10, cw, 20, {
					isStatic: true,
					render: { opacity: 0 },
				}), // top
				Bodies.rectangle(-10, ch / 2, 20, ch, {
					isStatic: true,
					render: { opacity: 0 },
				}), // left
				Bodies.rectangle(cw / 2, ch + 10, cw, 20, {
					isStatic: true,
					render: { opacity: 0 },
				}), // bottom
				Bodies.rectangle(cw + 10, ch / 2, 20, ch, {
					isStatic: true,
					render: { opacity: 0 },
				}), // right
			];

			World.add(engine.current.world, boundaries.current);

			Runner.run(runner, engine.current);
			Render.run(render);

			// Resize the renderer when the window resizes
			window.addEventListener("resize", resizeRenderer);

			// Initial resize to fit the container
			resizeRenderer();

			return () => {
				Render.stop(render);
				Runner.stop(runner);
				World.clear(engine.current.world);
				Engine.clear(engine.current);
				render.canvas.remove();
				render.canvas = null;
				render.context = null;
				render.textures = {};

				window.removeEventListener("resize", resizeRenderer);
			};
		}
	}, []);

	const handleDown = () => {
		isPressed.current = true;
	};

	const handleUp = () => {
		isPressed.current = false;
	};

	const handleAddCircle = (e) => {
		if (isPressed.current) {
			const rect = scene.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const ball = Bodies.circle(x, y, 10 + Math.random() * 30, {
				mass: 10,
				restitution: 0.9,
				friction: 0.005,
				render: {
					fillStyle: "#000000",
				},
			});
			World.add(engine.current.world, [ball]);
		}
	};

	return (
		<div
			onMouseDown={handleDown}
			onMouseUp={handleUp}
			onMouseMove={handleAddCircle}
			className="skillbox"
		>
			<div ref={scene} style={{ width: "100%", height: "100%" }} />
		</div>
	);
}

export default Skillbox;
