<template>
  <div>
    <section class="track">
      <Overlay :track="track" :place="place" v-if="ios"></Overlay>

      <Viewer
        v-if="ready"
        :track="track"
        :path="trackPath"
        :nbrPhotos="nbrPhotos"
        :duration="duration"
      ></Viewer>

      <Control></Control>

      <div class="track__oscillo" :style="'opacity:' + (level + 0.05)">
        <canvas class="track__oscillo__canvas" ref="canvas"></canvas>
      </div>

      <Progress :progressBar="progressBar"></Progress>
    </section>
  </div>
</template>

<script>
import Meyda from "meyda";
import { Howl, Howler } from "howler";
import Oscilloscope from "oscilloscope";
import iOS from "is-ios";

import Viewer from "./_viewer";
import Progress from "./_progress";
import Control from "./_control";
import Overlay from "./_track-overlay";

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
      ios: false
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
      this.place = "Morro Strand State Beach";
    } else if (this.track === "wander") {
      this.nbrPhotos = 8;
      this.duration = 441.8;
      this.place = "Death Valley";
    } else if (this.track === "boreal") {
      this.nbrPhotos = 5;
      this.duration = 126;
      this.place = "Sequoia National Park";
    } else if (this.track === "atlas") {
      this.nbrPhotos = 9;
      this.duration = 572.4;
      this.place = "Grand Canyon";
    }
  },
  mounted() {
    let self = this;

    this.sound.on("load", function() {
      if (iOS) {
        self.ios = iOS;
      } else {
        this.play();
      }
    });

    this.sound.on("play", function() {
      console.log("Start!");
      self.ready = true;

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
