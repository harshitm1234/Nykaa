import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card.js";
import logo from "./nykaa_logo.svg";
import arrow from "./arrow-up-thin.svg";

function App() {
	const [apiResponse, setApiResponse] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [filterResult, setFilterResult] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	/**
	 * Input change handler to filter results
	 * @param {} event
	 */
	const handleInputChange = (event) => {
		const query = event.target.value;
		let filter = apiResponse;
		if (query.length) {
			filter = apiResponse.filter((res) => {
				return res.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
			});
		}
		setFilterResult(filter);
		setSearchValue(query);
	};

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		document.addEventListener("scroll", function (e) {
			toggleVisibility();
		});

		fetch("http://localhost:9000/testAPI")
			.then((res) => res.text())
			.then((resJson) => {
				const ParsedData = JSON.parse(resJson);
				setApiResponse(ParsedData);
				setFilterResult(ParsedData);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="App">
			<div className="App-header">
				<img src={logo} alt="" />
				<hr />
				<div className="App-search">
					<input placeholder="Search Here" value={searchValue} onChange={handleInputChange} />
				</div>
			</div>
			<div className="App-container">
				<div className="card-grid">
					{!isLoading ? (
						filterResult.length ? (
							filterResult.map((element) => <Card key={element.sku} data={element} />)
						) : (
							<p>No data</p>
						)
					) : (
						<p>Loading</p>
					)}
				</div>
				{isVisible && (
					<button className="scroll-to-top" onClick={scrollToTop}>
						<img src={arrow} alt="" />
					</button>
				)}
			</div>
		</div>
	);
}

export default App;
