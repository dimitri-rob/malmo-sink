<template>
	<div>
		<section class="track">
			<Viewer
				v-if="ready"
				:track="track"
				:path="trackPath"
				:nbrPhotos="nbrPhotos"
				:duration="duration"
			></Viewer>
			<h1>track</h1>
			<div>{{ $route.params.id }}</div>
			<div>{{ seconds }}</div>

			<div>
				volume :
				<input type="range" name id min="0" max="100" v-model="volume" @change="volumeChange" />
			</div>
			<div>{{ volume }}</div>

			<div class="track__oscillo">
				<canvas class="track__oscillo__canvas" ref="canvas"></canvas>
			</div>

			<div class="duration">
				<div class="duration__progress" :style="{ width: progressBar + '%' }"></div>
			</div>

			<router-link :to="{ name: 'Homepage' }">Homepage</router-link>
		</section>
	</div>
</template>

<script>
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import { Howl, Howler } from "howler";
import Oscilloscope from "oscilloscope";
import Viewer from "./_viewer";

export default {
	components: { Viewer },
	data() {
		return {
			trackPath: "/static/",
			track: this.$route.params.id,
			sound: "",
			seconds: 1,
			progressBar: 0,
			volume: 100,
			pulse: "",
			audioSource: "",
			audioContext: "",
			scope: "",
			oscContext: "",
			ready: false
		};
	},
	beforeMount() {
		this.sound = new Howl({
			src: [this.trackPath + this.$route.params.id + ".mp3"],
			autoplay: false,
			html5: true
		});
		Howler.autoSuspend = false;

		if (this.track === "sink") {
			this.nbrPhotos = 12;
			this.duration = 631.4;
		} else if (this.track === "wander") {
			this.nbrPhotos = 8;
			this.duration = 441.8;
		} else if (this.track === "boreal") {
			this.nbrPhotos = 5;
			this.duration = 126;
		} else if (this.track === "atlas") {
			this.nbrPhotos = 10;
			this.duration = 572.4;
		}
	},
	mounted() {
		let self = this;

		this.sound.on("load", function() {
			this.play();
		});

		this.sound.on("play", function() {
			console.log("Start!");
			self.ready = true;

			self.audioContext = Howler.ctx;
			self.audioSource = self.audioContext.createMediaElementSource(
				this._sounds[0]._node
			);
			self.audioSource.connect(Howler.ctx.destination);

			self.scope = new Oscilloscope(self.audioSource);
			self.oscContext = self.$refs.canvas.getContext("2d");
			self.oscContext.imageSmoothingQuality = "high";
			self.oscContext.lineWidth = 0.4;
			self.oscContext.canvas.width = screen.width;
			self.oscContext.canvas.height = screen.height;
			self.oscContext.strokeStyle = "#ffffff";
			self.oscContext.fillStyle = "#ffffff";
			self.scope.animate(self.oscContext);

			self.progress();

			this.$interval = setInterval(function() {
				self.count();
				self.progress();
			}, 1000);
		});

		this.sound.on("end", function() {
			console.log("Finished!");
			self.progressBar = 100;
			clearInterval(this.$interval);
			this.unload();
		});
	},
	beforeDestroy() {
		this.sound.stop();
		clearInterval(this.sound.$interval);
	},
	methods: {
		count: function() {
			return this.seconds++;
		},
		progress: function() {
			return (this.progressBar = (this.seconds * 100) / this.duration);
		},
		volumeChange: function() {
			return Howler.volume(this.volume / 100);
		},
		testouille: function() {
			return (this.test = true);
		}
	}
};
</script>

<style lang="scss">
.track {
	width: 100%;
	height: 100vh;
	color: #000;
	position: relative;

	&__oscillo {
		position: fixed;
		left: 0;
		top: 0px;
		width: 100%;
		height: 100%;
		z-index: 20;
		opacity: 0.6;
		display: flex;
		justify-content: center;
		align-items: center;

		&__canvas {
			width: 100%;
			height: 100%;
		}
	}
}

.duration {
	width: 100%;
	background: transparent;
	height: 2px;
	position: absolute;
	bottom: 0px;
	left: 0px;

	&__progress {
		position: absolute;
		top: 0px;
		left: 0px;
		background: rgba($color: #fff, $alpha: 0.7);
		height: 100%;
		transition: width 1s linear;
	}
}

.photo {
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100vh;
	z-index: -1;
	filter: grayscale(1);
}

.photo img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

.pulse {
	width: 50px;
	height: 50px;
	background: blue;
	display: none;
}

.pulse.beat {
	background: red;
}

.canvas {
	width: 100%;
	height: 100vh;
}
</style>
