<template>
  <section class="page container ending" :class="show">
    <div class="columns">
      <div class="column">
        <div class="hero is-fullheight page__container">
          <div class="columns is-centered">
            <div class="column is-two-thirds ending__column fadeIn">
              <div class="ending__artwork">
                <img src="../assets/sink-artwork.jpg" alt="Malmö Sink EP" />
              </div>
              <div class="ending__content">
                <h3 class="ending__content__title">{{ epLabel }}</h3>
                <div class="ending__links">
                  <a
                    v-for="link in epLinks"
                    :href="link.href"
                    :key="link.service"
                    target="_blank"
                  >
                    <img
                      :src="link.logo"
                      :srcset="link.logo2x + ' 2x'"
                      :alt="link.service"
                    />
                  </a>
                </div>
              </div>
              <div class="ending__btn">
                <router-link :to="{ name: 'Tracklist' }" class="btn">{{
                  button
                }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-5 credits fadeIn">
        <div class="hero is-fullheight page__container">
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
      show: "",
      button: "chose another track",
      epLabel: "Sink EP available on",
      epLinks: [
        {
          service: "Bandcamp",
          logo: require("../assets/logo-bandcamp-1x.png"),
          logo2x: require("../assets/logo-bandcamp-2x.png"),
          href: "https://hej-malmo.bandcamp.com/album/sink-ep"
        },
        {
          service: "Spotify",
          logo: require("../assets/logo-spotify-1x.png"),
          logo2x: require("../assets/logo-spotify-2x.png"),
          href: "#"
        },
        {
          service: "Soundcloud",
          logo: require("../assets/logo-soundcloud-1x.png"),
          logo2x: require("../assets/logo-soundcloud-2x.png"),
          href: "https://soundcloud.com/hej-malmo/sets/sink-ep"
        },
        {
          service: "Apple Music",
          logo: require("../assets/logo-applemusic-1x.png"),
          logo2x: require("../assets/logo-applemusic-2x.png"),
          href: "#"
        },
        {
          service: "Deezer",
          logo: require("../assets/logo-deezer-1x.png"),
          logo2x: require("../assets/logo-deezer-2x.png"),
          href: "#"
        }
      ],
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
          title: "Photos : Arthur Redler",
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
        },
        {
          title: "Artwork : Gloriakitsune",
          key: "artwork",
          links: [
            {
              label: "instagram",
              href: "https://www.instagram.com/gloriakitsune/"
            },
            {
              label: "twitter",
              href: "https://twitter.com/gloriakiitsune"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.show = "show";
  }
};
</script>

<style lang="scss">
@import "../css/_variables.scss";
@import "../css/page.scss";
@import "../css/page.ending.scss";
</style>
