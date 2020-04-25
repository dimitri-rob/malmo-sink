<template>
  <section class="page container">
    <backgroundMap></backgroundMap>
    <div class="hero is-fullheight page__container chose__container">
      <div class="columns is-centered is-vcentered">
        <div class="column is-10">
          <h1 class="chose__title">{{ title }}</h1>

          <nav class="tracklist">
            <ul>
              <li
                v-for="track in tracks"
                :key="track.id"
                class="tracklist__item"
              >
                <router-link
                  :to="{ name: 'Track', params: { id: track.id } }"
                  class="tracklist__link"
                  @mouseover.native="fly(track.gps)"
                  @click.native="zoom(track.gps)"
                >
                  <sup>{{ track.nbr }}</sup>
                  <span>{{ track.title }}</span>
                  <span class="tracklist__place">{{ track.place }}</span>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import backgroundMap from "./block.map";

export default {
  components: {
    backgroundMap
  },
  data() {
    return {
      title: "Chose track",
      map: "",
      tracks: [
        {
          nbr: "01",
          title: "Sink",
          id: "sink",
          place: "Morro Strand State Beach",
          gps: [-120.8840508, 35.3926984]
        },
        {
          nbr: "02",
          title: "Wander",
          id: "wander",
          place: "Death Valley",
          gps: [-118.1709797, 36.4799698]
        },
        {
          nbr: "03",
          title: "Boreal",
          id: "boreal",
          place: "Sequoia National Park",
          gps: [-118.8632025, 36.4852393]
        },
        {
          nbr: "04",
          title: "Atlas",
          id: "atlas",
          place: "Grand Canyon",
          gps: [-113.9149751, 35.9837891]
        }
      ]
    };
  },
  mounted() {
    let self = this;
    this.map = this.$children[0].map;
    var bounds = new mapboxgl.LngLatBounds();
    this.tracks.forEach(function(track) {
      bounds.extend(track.gps);
    });

    this.map.fitBounds(bounds);
  },
  methods: {
    fly: function(gps) {
      this.map.flyTo({
        center: gps,
        zoom: 7,
        bearing: 0,
        speed: 0.3,
        curve: 0.8
      });
    },
    zoom: function(gps) {
      this.map.flyTo({
        center: gps,
        zoom: 14,
        bearing: 0,
        speed: 0.4,
        curve: 0.9
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/_variables.scss";
@import "../css/page.scss";
@import "../css/page.tracklist.scss";
</style>
