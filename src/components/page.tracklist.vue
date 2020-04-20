<template>
	<section class="page">
		<div class="hero is-fullheight page__container chose__container">
			<div class="columns is-centered is-vcentered">
				<div class="column is-10">
					<h1 class="chose__title">{{ title }}</h1>

					<nav class="tracklist">
						<ul>
							<li v-for="track in tracks" :key="track.id" class="tracklist__item">
								<router-link
									:to="{ name: 'Track', params: { id: track.id } }"
									class="tracklist__link"
									@mouseover.native="fly(track.gps)"
								>
									<sup>{{ track.nbr }}</sup>
									<span>{{ track.title }}</span>
									<span class="tracklist__place">{{ track.place }}</span>
								</router-link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
		<section id="map" class="trackmap" ref="map"></section>
	</section>
</template>

<script>
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

export default {
	data() {
		return {
			title: "Chose track",
			map: "",
			tracks: [
				{
					nbr: "01",
					title: "Sink",
					id: "sink",
					place: "Morro Strand State Beach",
					gps: [-120.8840508, 35.3926984]
				},
				{
					nbr: "02",
					title: "Wander",
					id: "wander",
					place: "Sequoia National Park",
					gps: [-118.8632025, 36.4852393]
				},
				{
					nbr: "03",
					title: "Boreal",
					id: "boreal",
					place: "Death Valley",
					gps: [-118.1709797, 36.4799698]
				},
				{
					nbr: "04",
					title: "Atlas",
					id: "atlas",
					place: "Grand Canyon",
					gps: [-113.9149751, 35.9837891]
				}
			]
		};
	},
	mounted() {
		let self = this;

		mapboxgl.accessToken =
			"pk.eyJ1IjoiZGltaWMwMCIsImEiOiJjanVsbW1sa2QyMHExM3lwZzlkZHZncTVnIn0.3dx95W4qxNeZyeIcO4uixA";
		this.map = new mapboxgl.Map({
			container: "map",
			style: "mapbox://styles/dimic00/ck9786gib1fib1io31suqdg6i",
			center: [12.8758884, 55.5702828]
		});
		this.map.scrollZoom.disable();

		var bounds = new mapboxgl.LngLatBounds();
		this.tracks.forEach(function(track) {
			bounds.extend(track.gps);
		});

		this.map.fitBounds(bounds);
	},
	methods: {
		fly: function(gps) {
			this.map.flyTo({
				center: gps,
				zoom: 7,
				bearing: 0,
				speed: 0.3,
				curve: 0.8
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../css/_variables.scss";
@import "../css/page.scss";
@import "../css/page.tracklist.scss";
</style>
