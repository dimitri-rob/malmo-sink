<template>
  <transition name="fade">
    <div>
      <section class="trackLoader" v-if="overlay">
        <div class="container">
          <div class="trackLoader__infos">
            <h1 class="trackLoader__track">{{ track }}</h1>
            <h2 class="trackLoader__place">{{ place }}</h2>
            <div class="trackLoader__loading">
              <div
                class="trackLoader__loading__progress"
                :style="'width:' + (imgLoad * 100) / nbrPhotos + '%;'"
              ></div>
            </div>
          </div>
          <div class="trackLoader__message">
            loading, please wait
          </div>
        </div>
      </section>

      <section class="trackLoader__content">
        <clazy-load
          v-for="photo in nbrPhotos"
          :key="photo"
          :src="path + track + '/' + photo + '.jpg'"
          @load="imgLoading"
        >
          <img :src="path + track + '/' + photo + '.jpg'" preload="true" />
        </clazy-load>
      </section>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["track", "place", "loading", "nbrPhotos", "path"],
  data() {
    return {
      overlay: true,
      imgLoad: 0
    };
  },
  methods: {
    imgLoading: function() {
      this.imgLoad++;
      if (this.imgLoad === this.nbrPhotos) {
        this.$parent.ready = true;
        this.$parent.startMusic();
      }
      return;
    }
  }
};
</script>

<style lang="scss">
@import "../css/_variables.scss";
@import "../css/block.track.loader.scss";
</style>
