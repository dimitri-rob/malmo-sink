<template>
  <div class="infiniteZoom" :class="state">
    <figure
      class="infiniteZoom__item"
      v-for="photo in nbrPhotos"
      :key="photo"
      v-if="currentImage >= photo"
      v-show="currentImage <= photo + 2"
      :style="'animation-duration:' + timePerScale + 's;'"
    >
      <img
        class="infiniteZoom__img"
        :src="path + track + '/' + photo + '.jpg'"
      />
    </figure>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: 1,
      currentImage: 1,
      timePerImg: "",
      timePerScale: "",
      state: "pause"
    };
  },
  props: {
    track: {
      type: String,
      default: "sink"
    },
    nbrPhotos: {
      type: Number,
      default: 12
    },
    duration: {
      type: Number,
      default: 631.4
    },
    path: {
      type: String,
      default: "/static/"
    }
  },
  mounted() {
    const self = this;
    this.state = "start";
    this.timePerImg = Math.round(this.duration / (this.nbrPhotos + 1));
    this.timePerScale = Math.round(this.timePerImg * 2);

    let zoomInterval = setInterval(function() {
      if (self.currentImage <= self.nbrPhotos) {
        self.currentImage++;
      } else {
        clearInterval(zoomInterval);
      }
    }, this.timePerImg * 1000);
  }
};
</script>

<style lang="scss">
@import "../css/block.viewer.scss";
</style>
