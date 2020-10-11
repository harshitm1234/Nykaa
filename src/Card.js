import React from "react";
import "./Card.css";
import logo from "./nykaa_logo.svg";

function Card({ data }) {
	const variationArray = data.sizeVariation.map((data) => data.title);
	return (
		<div className="card-container">
			<img
				src={data.imageUrl}
				alt={data.title}
				onError={(e) => {
					e.target.src = logo;
				}}
			/>
			<div className="title-container">
				<h3>{data.title}</h3>
				<p>{data.subTitle}</p>
				<p>{variationArray.join(", ")}</p>
			</div>
		</div>
	);
}

export default Card;
