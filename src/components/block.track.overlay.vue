<template>
  <transition name="fade">
    <section class="trackOverlay" v-if="overlay">
      <div class="container">
        <div class="trackOverlay__infos">
          <h1 class="trackOverlay__track">{{ track }}</h1>
          <h2 class="trackOverlay__place">{{ place }}</h2>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  props: ["track", "place"],
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
