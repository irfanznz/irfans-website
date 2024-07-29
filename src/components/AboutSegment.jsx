function AboutSegment(props) {
	return (
		<div className="about-segment">
			{props.type === "spacer" ? (
				<div className="spacer"></div>
			) : (
				<>
					<div
						className={
							props.type === "connector" ? "connector" : "content"
						}
					>
						{props.type === "content" ? props.text : ""}
						{props.type === "connector" ? (
							<div className="connector-line"></div>
						) : (
							""
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default AboutSegment;
