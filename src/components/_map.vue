<template>
	<div>
		<section id="map" class="map" ref="map"></section>
	</div>
</template>

<script>
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

export default {
	data() {
		return {
			pouet: "test"
		};
	},
	mounted() {
		const test = "pouet";
		let self = this.$root.$children;

		mapboxgl.accessToken =
			"pk.eyJ1IjoiZGltaWMwMCIsImEiOiJjanVsbW1sa2QyMHExM3lwZzlkZHZncTVnIn0.3dx95W4qxNeZyeIcO4uixA";
		this.map = new mapboxgl.Map({
			container: "map",
			style: "mapbox://styles/dimic00/ck9786gib1fib1io31suqdg6i",
			center: [12.8758884, 55.5702828]
		});
		this.map.scrollZoom.disable();
	}
};
</script>

<style lang="scss">
@import "../css/map.scss";
</style>