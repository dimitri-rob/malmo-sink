<template>
  <section class="page container homepage" :class="show">
    <div class="hero is-fullheight page__container">
      <div class="columns is-centered is-vcentered">
        <div class="column is-4">
          <img
            src="../assets/sink-artwork.jpg"
            alt="Malmö Sink EP"
            class="homepage__artwork homepage__fade"
          />
        </div>
        <div class="column is-2"></div>
        <div class="column is-4">
          <div class="homepage__content">
            <h1 class="homepage__title homepage__fade">{{ title }}</h1>
            <h2 class="homepage__subtitle homepage__fade">{{ subtitle }}</h2>
            <p class="homepage__intro homepage__fade">{{ intro }}</p>
            <div class="homepage__btn homepage__fade">
              <router-link :to="{ name: 'Tracklist' }" class="btn btn--icon">
                {{ button }}
                <font-awesome-icon icon="angle-right" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      title: "Sink",
      subtitle: "a listening experience",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed finibus felis. Aliquam erat volutpat. Donec quis sagittis eros. Pellentesque ullamcorper, libero id egestas feugiat, mauris ante sodales mauris, quis tristique neque lorem ut elit. Quisque turpis nisi, finibus eget eros at, consectetur aliquet justo. Integer auctor ligula purus, sed pretium urna luctus eget. Donec eu placerat felis, id euismod nisl. Maecenas ut ornare ipsum. Duis sed eleifend nunc.",
      button: "start",
      show: ""
    };
  },
  beforeMount() {
    this.loaded = false;
  },
  mounted() {
    this.show = "show";
  }
};
</script>

<style lang="scss" scoped>
@import "../css/_variables.scss";
@import "../css/page.scss";
@import "../css/page.home.scss";
</style>
