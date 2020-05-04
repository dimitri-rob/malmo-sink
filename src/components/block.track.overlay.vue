<template>
  <transition name="fade">
    <section class="trackOverlay" v-if="overlay">
      <div class="container">
        <div class="trackOverlay__infos">
          <h1 class="trackOverlay__track">{{ track }}</h1>
          <h2 class="trackOverlay__place">{{ place }}</h2>
          <div class="trackOverlay__loader">
            <div
              class="trackOverlay__loader__progress"
              :style="'width:' + (loading * 100) / nbrPhotos + '%;'"
            ></div>
          </div>
        </div>
        <div class="trackOverlay__message">
          loading, please wait
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  props: ["track", "place", "loading", "nbrPhotos"],
  data() {
    return {
      overlay: true
    };
  }
};
</script>

<style lang="scss">
@import "../css/_variables.scss";
@import "../css/block.track.overlay.scss";
</style>
