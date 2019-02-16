import React, { Component } from "react";
import * as topojson from "topojson";
import * as d3 from "d3";
import $ from "jquery";

import data from "../assets/world-110m.v1.json";
import data2 from "../assets/world_id.json";

class WorldMap extends Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		this.drawChart();
	}

	drawChart = () => {
		var width = window.innerWidth * 0.66,
			height = window.innerHeight * 0.7,
			centered,
			world_id;

		window.addEventListener("resize", function() {
			width = window.innerWidth * 0.66;
			height = window.innerHeight * 0.7;
		});

		var tooltip = d3
			.select("#container")
			.append("div")
			.attr("class", "tooltip hidden");

		var projection = d3
			.geoMercator()
			.scale(100)
			.translate([width / 2, height / 1.5]);

		var path = d3.geoPath().projection(projection);

		var zoom = d3
			.zoom()
		//	.translate(projection.translate())
		//	.scale(projection.scale())
			.scaleExtent([height * 0.197, 3 * height])
			.on("zoom", zoomed);

		var svg = d3
			.select("#container")
			.append("svg")
			.attr("width", width)
			.attr("class", "map card shadow")
			.attr("height", height);

		var g = svg.append("g").call(zoom);

		g.append("rect")
			.attr("class", "background")
			.attr("width", width)
			.attr("height", height);

		var world_id = data2;
		var world = data;
		console.log(world);

		var rawCountries = topojson.feature(world, world.objects.countries)
				.features,
			neighbors = topojson.neighbors(world.objects.countries.geometries);

		console.log(rawCountries);
		console.log(neighbors);
		var countries = [];

		// Splice(remove) random pieces
		rawCountries.splice(145, 1);
		rawCountries.splice(38, 1);

		rawCountries.map(country => {
			//console.log(parseInt(country.id) !== 010)
			// Filter out Antartica and Kosovo
			if (parseInt(country.id) !== parseInt("010")) {
				countries.push(country);
			} else {
				console.log(country.id);
			}
		});

		console.log(countries);

		g.append("g")
			.attr("id", "countries")
			.selectAll(".country")
			.data(countries)
			.enter()
			.insert("path", ".graticule")
			.attr("class", "country")
			.attr("d", path)
			.attr("data-name", function(d) {
				return d.id;
			})
			.on("click", clicked)
			.on("mousemove", function(d, i) {
				var mouse = d3.mouse(svg.node()).map(function(d) {
					return parseInt(d);
				});

				tooltip
					.classed("hidden", false)
					.attr(
						"style",
						"left:" + mouse[0] + "px;top:" + (mouse[1] - 50) + "px"
					)
					.html(getCountryName(d.id));
			})
			.on("mouseout", function(d, i) {
				tooltip.classed("hidden", true);
			});

		function getCountryName(id) {
			var country = world_id.filter(
				country => parseInt(country.iso_n3) == parseInt(id)
			);
			console.log(country[0].name);
			console.log(id);
			return country[0].name;
		}

		function updateCountry(d) {
			console.log(world_id);

			var country = world_id.filter(
				country => parseInt(country.iso_n3) == parseInt(d.id)
			);
			console.log(country[0].name);
			var iso_a2;
			if (country[0].name === "Kosovo") {
				iso_a2 = "xk";
			} else {
				iso_a2 = country[0].iso_a2.toLowerCase();
			}

			// Remove any current data
			$("#countryName").empty();
			$("#countryFlag").empty();

			$("#countryName").text(country[0].name);

			var src = require('../assets/svg/' + iso_a2 + '.svg');
			var img = "<img id='flag' class='flag' src=" + src + " />";
			$("#countryFlag").append(img);
		}

		// Remove country when deselected
		function removeCountry() {
			$("#countryName").empty();
			$("#countryFlag").empty();
		}

		// When clicked on a country
		function clicked(d) {
			if (d && centered !== d) {
				centered = d;

				updateCountry(d);
			} else {
				centered = null;
				removeCountry();
			}

			g.selectAll("path").classed(
				"active",
				centered &&
					function(d) {
						return d === centered;
					}
			);

			console.log("Clicked");
			console.log(d);
			console.log(d);

			var centroid = path.centroid(d),
				translate = projection.translate();

			console.log(translate);
			console.log(centroid);

			projection.translate([
				translate[0] - centroid[0] + width / 2,
				translate[1] - centroid[1] + height / 2
			]);

			//zoom.translate(projection.translate());

			g.selectAll("path")
				.transition()
				.duration(700)
				.attr("d", path);
		}

		// D3 zoomed
		function zoomed() {
			console.log("zoomed");
			projection.translate(d3.event.translate).scale(d3.event.scale);
			g.selectAll("path").attr("d", path);
		}
	};

	render() {
		return (
			<div className="container-fluid bg">
				<div class="row">
					<div className="col-12">
						<h2 className="header text-center p-3 mb-5">
							Project 2 - World value survey
						</h2>
					</div>
				</div>
				<div className="row mx-auto">
					<div className="col-md-8">
						<div id="container" class="mx-auto" />
					</div>
					<div className="col-md-4">
						<div id="countryInfo" className="card">
							<h2 id="countryName" className="p-3 text-center" />
							<div id="countryFlag" className="mx-auto" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WorldMap;
