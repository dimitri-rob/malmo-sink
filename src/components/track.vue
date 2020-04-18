<template>
  <div>
    <section class="track">
      <h1>track</h1>
      <div>{{ $route.params.id }}</div>
      <div>{{ seconds }}</div>

      <div class="photo">
        <img src="../assets/photo.jpg" alt />
      </div>

      <div>
        volume :
        <input
          type="range"
          name
          id
          min="0"
          max="100"
          v-model="volume"
          @change="volumeChange"
        />
      </div>
      <div>{{ volume }}</div>

      <div>
        <div class="pulse" :class="pulse"></div>
      </div>

      <div>
        <div>
          <input
            ref="level"
            type="range"
            id="levelRange"
            name="level"
            min="0.0"
            max="1.0"
            step="0.001"
            v-model="level"
          />
        </div>
        <div>
          <input
            ref="spectral"
            type="range"
            id="spectralRange"
            name="spectral"
            min="0.0"
            max="1.0"
            step="0.001"
            v-model="spectral"
          />
        </div>
        <div>
          <input
            ref="kurto"
            type="range"
            id="kurtoRange"
            name="kurto"
            min="0.0"
            max="1.0"
            step="0.001"
            v-model="kurto"
          />
        </div>
        <div>
          <input
            ref="Sharpness"
            type="range"
            id="SharpnessRange"
            name="Sharpness"
            min="0.0"
            max="1.0"
            step="0.001"
            v-model="Sharpness"
          />
        </div>
      </div>

      <div>
        <canvas class="canvas" ref="canvas"></canvas>
      </div>

      <div>
        <div class="barre">
          <div class="duration" :style="{ width: progressBar + '%' }"></div>
        </div>
      </div>
      <router-link :to="{ name: 'Homepage' }">Homepage</router-link>
    </section>
  </div>
</template>

<script>
import { Howl, Howler } from "howler";
import Meyda from "meyda";
import Oscilloscope from "oscilloscope";

export default {
  data() {
    return {
      trackPath: "/static/",
      sound: "",
      seconds: 1,
      progressBar: 0,
      volume: 100,
      pulse: "",
      bpm: 117,
      audioSource: "",
      audioContext: "",
      level: "",
      spectral: "",
      kurto: "",
      Sharpness: "",
      scope: "",
      oscContext: ""
    };
  },
  mounted() {
    let self = this;
    Howler.autoSuspend = false;

    this.sound = new Howl({
      src: [this.trackPath + this.$route.params.id + ".mp3"],
      autoplay: true,
      html5: true
    });

    this.sound.on("play", function() {
      console.log("Start!");

      self.audioContext = Howler.ctx;
      self.audioSource = self.audioContext.createMediaElementSource(
        this._sounds[0]._node
      );
      self.audioSource.connect(Howler.ctx.destination);

      /*const analyzer = Meyda.createMeydaAnalyzer({
        audioContext: self.audioContext,
        source: self.audioSource,
        bufferSize: 512,
        featureExtractors: [
          "rms",
          "spectralFlatness",
          "spectralKurtosis",
          "perceptualSharpness"
        ],
        callback: features => {
          self.level = features.rms;
          self.spectral = features.spectralFlatness;
          self.kurto = features.spectralKurtosis;
          self.Sharpness = features.perceptualSharpness;
        }
      });
      analyzer.start();*/

      self.scope = new Oscilloscope(self.audioSource);
      self.oscContext = self.$refs.canvas.getContext("2d");
      self.oscContext.imageSmoothingQuality = "high";
      self.oscContext.lineWidth = 0.4;
      self.oscContext.canvas.width = screen.width / 1.5;
      self.oscContext.canvas.height = screen.height / 1.5;
      self.oscContext.strokeStyle = "#ffffff";
      self.oscContext.fillStyle = "#ffffff";
      self.scope.animate(self.oscContext);

      self.progress();

      let interval = (60 / self.bpm) * 1000;

      this.$bpm = setInterval(function() {
        if (self.pulse === "beat") {
          self.pulse = "";
        } else {
          self.pulse = "beat";
        }
      }, interval);

      this.$interval = setInterval(function() {
        self.count();
        self.progress();
      }, 1000);
    });

    this.sound.on("end", function() {
      console.log("Finished!");
      self.progressBar = 100;
      clearInterval(this.$bpm);
      clearInterval(this.$interval);
      this.unload();
    });
  },
  beforeDestroy() {
    this.sound.stop();
    clearInterval(this.sound.$interval);
  },
  updated() {
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
      console.log(this.oscContext);
    }
    console.log(this.audioContext.state);
  },
  methods: {
    count: function() {
      return this.seconds++;
    },
    progress: function() {
      return (this.progressBar = (this.seconds * 100) / this.sound._duration);
    },
    volumeChange: function() {
      return Howler.volume(this.volume / 100);
    }
  }
};
</script>

<style>
.track {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  color: #fff;
}

.track a {
  color: #fff;
}

.barre {
  width: 100%;
  background: transparent;
  height: 8px;
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.duration {
  position: absolute;
  top: 0px;
  left: 0px;
  background: #fff;
  height: 100%;
  transition: width 1s linear;
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
