<template>
  <section class="track">
    <Overlay
      v-if="!ready"
      :track="track"
      :place="place"
      :nbrPhotos="nbrPhotos"
      :loading="imgLoad"
    ></Overlay>

    <Viewer
      v-if="ready"
      :track="track"
      :path="trackPath"
      :nbrPhotos="nbrPhotos"
      :duration="duration"
    ></Viewer>

    <section class="viewerLoader">
      <clazy-load
        v-for="photo in nbrPhotos"
        :key="photo"
        :src="trackPath + track + '/' + photo + '.jpg'"
        @load="imgLoading"
      >
        <img :src="trackPath + track + '/' + photo + '.jpg'" preload="true" />
      </clazy-load>
    </section>

    <Control></Control>

    <div class="track__oscillo" :style="'opacity:' + (level + 0.05)">
      <canvas class="track__oscillo__canvas" ref="canvas"></canvas>
    </div>

    <Progress :progressBar="progressBar"></Progress>
  </section>
</template>

<script>
import Meyda from "meyda";
import { Howl, Howler } from "howler";
import Oscilloscope from "oscilloscope";
import iOS from "is-ios";

import Viewer from "./block.viewer";
import ViewerLoader from "./block.viewer.loader.vue";
import Progress from "./block.progress";
import Control from "./block.control";
import Overlay from "./block.track.overlay";

export default {
  components: { Viewer, Progress, Control, iOS, Overlay },
  data() {
    return {
      trackPath: "/static/",
      track: this.$route.params.id,
      place: "",
      sound: "",
      seconds: 1,
      progressBar: 0,
      pulse: "",
      audioSource: "",
      audioContext: "",
      scope: "",
      oscContext: "",
      ready: false,
      level: "",
      imgLoad: 0
    };
  },
  beforeMount() {
    if (this.track === "sink") {
      this.nbrPhotos = 13;
      this.duration = 631.4;
      this.place = "Morro Strand State Beach";
    } else if (this.track === "wander") {
      this.nbrPhotos = 9;
      this.duration = 441.8;
      this.place = "Death Valley";
    } else if (this.track === "boreal") {
      this.nbrPhotos = 4;
      this.duration = 126;
      this.place = "Sequoia National Park";
    } else if (this.track === "atlas") {
      this.nbrPhotos = 10;
      this.duration = 572.4;
      this.place = "Grand Canyon";
    }
  },
  mounted() {
    let self = this;
    this.sound = new Howl({
      src: [this.trackPath + this.$route.params.id + ".mp3"],
      autoplay: false,
      html5: true
    });
    Howler.autoSuspend = false;

    this.sound.on("play", function() {
      console.log("Start!");

      if (!iOS) {
        self.audioContext = Howler.ctx;
        self.audioSource = self.audioContext.createMediaElementSource(
          this._sounds[0]._node
        );
        self.audioSource.connect(Howler.ctx.destination);

        const analyzer = Meyda.createMeydaAnalyzer({
          audioContext: self.audioContext,
          source: self.audioSource,
          bufferSize: 512,
          featureExtractors: ["rms"],
          callback: features => {
            self.level = features.rms;
          }
        });
        analyzer.start();

        self.scope = new Oscilloscope(self.audioSource);
        self.oscContext = self.$refs.canvas.getContext("2d");
        self.oscContext.imageSmoothingQuality = "high";
        self.oscContext.lineWidth = 0.4;
        self.oscContext.canvas.width = screen.width;
        self.oscContext.canvas.height = 130;
        self.oscContext.strokeStyle = "#ffffff";
        self.oscContext.fillStyle = "#ffffff";
        self.scope.animate(self.oscContext);
      }

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
      self.goToEnding();
    });
  },
  beforeDestroy() {
    this.sound.stop();
    clearInterval(this.sound.$interval);
  },
  methods: {
    imgLoading: function() {
      this.imgLoad++;
      if (this.imgLoad === this.nbrPhotos) {
        this.ready = true;
        this.startMusic();
      }
      return;
    },
    startMusic: function() {
      return this.sound.play();
    },
    count: function() {
      return this.seconds++;
    },
    progress: function() {
      return (this.progressBar = (this.seconds * 100) / this.duration);
    },
    goToEnding: function() {
      return this.$router.push({ name: "Ending" });
    }
  }
};
</script>

<style lang="scss">
@import "../css/page.track.scss";
</style>
