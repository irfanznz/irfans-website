import { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  Bodies,
  World,
  Runner,
  Body,
  MouseConstraint,
  Mouse,
  Events,
} from "matter-js";
import icon from "../assets/images/a.png";
import skills  from "../data/skills.js";

function Skillbox(props) {
  const scene = useRef(null);
  const engine = useRef(Engine.create());
  const renderRef = useRef();
  const boundaries = useRef([]);

  useEffect(() => {
    const skillIcons = {}

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
          const boundaryThickness = 50;

          Body.setPosition(boundaries.current[0], {
            x: cw / 2,
            y: -boundaryThickness / 2,
          });
          Body.setVertices(boundaries.current[0], [
            { x: 0, y: 0 },
            { x: cw, y: 0 },
            { x: cw, y: boundaryThickness },
            { x: 0, y: boundaryThickness },
          ]);

          Body.setPosition(boundaries.current[1], {
            x: -boundaryThickness / 2,
            y: ch / 2,
          });
          Body.setVertices(boundaries.current[1], [
            { x: 0, y: 0 },
            { x: boundaryThickness, y: 0 },
            { x: boundaryThickness, y: ch },
            { x: 0, y: ch },
          ]);

          Body.setPosition(boundaries.current[2], {
            x: cw / 2,
            y: ch + boundaryThickness / 2,
          });
          Body.setVertices(boundaries.current[2], [
            { x: 0, y: 0 },
            { x: cw, y: 0 },
            { x: cw, y: boundaryThickness },
            { x: 0, y: boundaryThickness },
          ]);

          Body.setPosition(boundaries.current[3], {
            x: cw + boundaryThickness / 2,
            y: ch / 2,
          });
          Body.setVertices(boundaries.current[3], [
            { x: 0, y: 0 },
            { x: boundaryThickness, y: 0 },
            { x: boundaryThickness, y: ch },
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
      const boundaryThickness = 50;
      boundaries.current = [
        Bodies.rectangle(
          cw / 2,
          -boundaryThickness / 2,
          cw,
          boundaryThickness,
          {
            isStatic: true,
            render: { opacity: 0 },
          }
        ), // top
        Bodies.rectangle(
          -boundaryThickness / 2,
          ch / 2,
          boundaryThickness,
          ch,
          {
            isStatic: true,
            render: { opacity: 0 },
          }
        ), // left
        Bodies.rectangle(
          cw / 2,
          ch + boundaryThickness / 2,
          cw,
          boundaryThickness,
          {
            isStatic: true,
            render: { opacity: 0 },
          }
        ), // bottom
        Bodies.rectangle(
          cw + boundaryThickness / 2,
          ch / 2,
          boundaryThickness,
          ch,
          {
            isStatic: true,
            render: { opacity: 0 },
          }
        ), // right
      ];

      World.add(engine.current.world, boundaries.current);

      // Create hexagons
      const hexagons = [];
      for (let i = 0; i < skills.length; i++) {
        const hexagon = Bodies.polygon(100 + 80, 100, 6, 50, {
          restitution: 0.5,
          friction: 0.9,
          render: {
            fillStyle: "#ffffff",
            strokeStyle: "#000000",
            lineWidth: 1,
            sprite: {
              texture: skills[i]["img"], // Replace with the path to your image
              xScale: 0.125,
              yScale: 0.125,
            },
          },
        });

        skillIcons[hexagon.id] = skills[i]["name"]

        // Rotate the hexagon by 90 degrees (π/2 radians)
        Body.rotate(hexagon, Math.PI * 2);
        hexagons.push(hexagon);
      }
      World.add(engine.current.world, hexagons);

      // Add mouse control
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: {
          stiffness: 0.5,
          render: {
            visible: false,
          },
        },
      });
      mouse.current = mouseConstraint;
      console.log(skillIcons);
      Events.on(mouseConstraint, "mousedown", (event) => {
        console.log(`${mouseConstraint.body ? skillIcons[mouseConstraint.body.id] : null} clicked`);
      });
      World.add(engine.current.world, mouseConstraint);

      // Custom rendering to draw outline after sprite is rendered
      Events.on(render, "afterRender", () => {
        const context = render.context;
        hexagons.forEach((hexagon) => {
          const vertices = hexagon.vertices;

          context.beginPath();
          context.moveTo(vertices[0].x, vertices[0].y);

          for (let j = 1; j < vertices.length; j += 1) {
            context.lineTo(vertices[j].x, vertices[j].y);
          }

          context.closePath();
          context.lineWidth = hexagon.render.lineWidth;
          context.strokeStyle = hexagon.render.strokeStyle;
          context.stroke();
        });
      });

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

  return (
    <div className="skillbox" style={{ overflow: "hidden" }}>
      <div ref={scene} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default Skillbox;

// TODO: generate shapes base on skills icons. as these generate, keep track of object IDs and their corresponding skill names, such that when these objects are clicked, the corresponding skill description is displayed.
// engine