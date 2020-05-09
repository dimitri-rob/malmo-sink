<template>
  <section class="page container homepage" :class="show">
    <div class="hero is-fullheight page__container">
      <div class="columns is-centered is-vcentered">
        <div class="column is-4">
          <img
            src="../assets/sink-artwork.jpg"
            alt="Malmö Sink EP"
            class="homepage__artwork fadeIn"
          />
        </div>
        <div class="column is-2"></div>
        <div class="column is-4">
          <div class="homepage__content">
            <h1 class="homepage__title slideIn">{{ title }}</h1>
            <h2 class="homepage__subtitle slideIn">{{ subtitle }}</h2>
            <div class="homepage__intro slideIn">
              <p>
                The dreaminess and raw melancholy of Malmö's four musical pieces
                combines with Arthur Redler's deeply naturals monochrome
                photographs for an introspective escape through wilderness
                natural sites of United States west coast.
              </p>
              <p>
                A whole experience that brings the listener closer to the
                original inspiration of the musician and that appeals to several
                senses.
              </p>
            </div>
            <div class="homepage__btn slideIn">
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
      button: "start",
      show: ""
    };
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
