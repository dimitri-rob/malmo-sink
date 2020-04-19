<template>
  <section class="page">
    <div class="columns">
      <div class="column">
        <div class="hero is-fullheight page__container">
          <div class="columns">
            <div class="column is-two-thirds ending__column">
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-5">
        <div class="hero is-fullheight page__container ending__credits">
          <div class="columns is-centered">
            <div class="column is-two-thirds ending__column">
              <div>
                <h1 class="credits__title">{{ title }}</h1>

                <div
                  v-for="credit in credits"
                  :key="credit.key"
                  class="credits__item"
                >
                  <h3 class="credits__label">{{ credit.title }}</h3>
                  <div class="is-flex">
                    <a
                      v-for="link in credit.links"
                      :href="link.href"
                      :key="link.label"
                      class="credits__links"
                      target="_blank"
                      >{{ link.label }}</a
                    >
                  </div>
                </div>
              </div>
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
      title: "Crédits",
      credits: [
        {
          title: "Music : Malmö",
          key: "music",
          links: [
            {
              label: "facebook",
              href: "https://www.facebook.com/hejmalmo/"
            },
            {
              label: "instagram",
              href: "https://www.instagram.com/hej_malmo/"
            },
            {
              label: "twitter",
              href: "https://twitter.com/hej_malmo"
            }
          ]
        },
        {
          title: "Photo : Arthur Redler",
          key: "photo",
          links: [
            {
              label: "tumblr",
              href: "https://arthurredler.tumblr.com/"
            },
            {
              label: "instagram",
              href: "https://www.instagram.com/arthurredler/"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "../css/_variables.scss";
@import "../css/page.scss";
@import "../css/ending.scss";
</style>
