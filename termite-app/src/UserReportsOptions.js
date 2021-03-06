import React, {useState, useEffect} from 'react';
import * as d3 from "d3";
import * as nv from "nvd3";
import "./UserReportsOptions.css";
import {getUserAgreementsFrontend} from "./utils/ApiCalls.js"

function UserReportsOptions(props) {
	nv = require('nvd3')
	const [userdata, setUserData] = useState([]);
	useEffect(() => {
		getUserAgreementsFrontend(props.userID)
		.then(data => {
			setUserData(data);
		});
	}, [props.userID, setUserData]);
	function generateSubScores() {
		var all_agg_scores = {};
		userdata.forEach(row => {
	var avg_scores = [];
	const score_tuples = Object.entries(row);
	["sub1", "sub2", "sub3", "sub4", "sub5", "sub6"].forEach(sub_str => {
	var topic_score = 0;
	var subtopic_count = 0;
	score_tuples.forEach(tuple=>{
		if (sub_str === tuple[0].slice(0,4)){
			if(tuple[0].slice(-5) === "score"){
				topic_score += tuple[1];
				subtopic_count += 1;
			}
		}
	});
	avg_scores.push(topic_score/subtopic_count);
all_agg_scores[row.website_id] = avg_scores});
});
console.log(all_agg_scores);};
console.log(userdata)
	useEffect(() => {
		var scoreJSON = [{
			key: "Your Websites' Average Score Over Time",
			values: [{"x": 1,"y": 0.4}, {"x": 2,"y": 0.44}, {"x": 3,"y": 0.5}, {"x": 4,"y": 0.54}, {"x": 5,"y": 0.5}]}];
		var ratingJSON = [{
			key: "weeks",
			values: [{"label":"A","value":.45},{"label":"B","value":.13},{"label":"C","value":.05},{"label":"D","value":.14},{"label":"F","value":.23}]}];
//
//
//
//
//
//
//
// var scoreJSON =
//
// var ratingJSON =
		nv.addGraph(function () {
				var chart = nv.models.lineChart()
						.useInteractiveGuideline(true).margin({
							 top: 30,
							 right: 20,
							 bottom: 50,
							 left: 40
					 })
				;
				var yScale = d3.scaleLinear()
											.domain([-2, 3])
											;    // values between 0 and 100
										 // .range([500 - 20, 20]);   // map these to the chart height, less padding.
														 // REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.
				chart.xAxis
						.axisLabel('Week')
				;
				chart.yAxis
						.axisLabel('Score')
						.tickFormat(d3.format('.02f'))
						// .scale(yScale)
				;
				chart.yDomain([-2, 3]);
				d3.select('#scoreLineChart svg')
						.datum(scoreJSON)
						.call(chart)
						// .forceY([0,100])
				;
				nv.utils.windowResize(chart.update);
				return chart;
		});
		nv.addGraph(function () {
				var chart = nv.models.discreteBarChart()
				.x(function (d) {
								return d.label;
						})
						.y(function (d) {
								return d.value;
						})
				chart.xAxis
						.axisLabel('Score');
				chart.yAxis
						.tickFormat(d3.format('.02f'));
				d3.select('#distrBarChart svg')
						.datum(ratingJSON)
						.call(chart);
				nv.utils.windowResize(chart.update);
				return chart;
		});
		nv.addGraph(function () {
				var chart = nv.models.discreteBarChart().x(function (d) {
								return d.label;
						})
						.y(function (d) {
								return d.value;
						})
				chart.xAxis
						.axisLabel('Grade');
				chart.yAxis
						.tickFormat(d3.format('.02f'));
				d3.select('#distrBarChart2 svg')
						.datum(ratingJSON)
						.call(chart);
				nv.utils.windowResize(chart.update);
				return chart;
		});
	});

	return (
		
		
		<div className="UserReportsOptions">
			<div className="UserReportsOptions-Header">
				<h2 className="optionsh2">Internet Hygiene Reports</h2>
			</div>
			<div className="UserReportsOptions-Content">
			<div class="dashboard-flex-container">
			        <div
							id="scoreLineChart"
							class="with-3d-shadow with-transitions scoreLineChart">
			        <h2> Your Websites' Average Score by Week</h2>
							<svg>
							</svg>
			    </div>
			    <div
					id="distrBarChart"
					class="with-3d-shadow with-transitions distrBarChart">
			        <h2>Distribution of Your Websites' Scores</h2>
							<svg>
							</svg>
			    </div>
					<div
					id="distrBarChart2"
					class="with-3d-shadow with-transitions distrBarChart2">
			        <h2 className="optionsh2"> Global Distribution of Websites' Scores</h2>
							<svg>
							</svg>
			    </div>
			</div>
			{generateSubScores()}
		</div>
		</div>
		

)
};
export default UserReportsOptions;