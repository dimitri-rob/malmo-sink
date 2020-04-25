import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Bulma from "bulma";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faSlash,
  faVolumeUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Homepage from "./components/page.home";
import Tracklist from "./components/page.tracklist";
import Track from "./components/page.track";
import Ending from "./components/page.ending";
import Background from "./components/block.background.vue";

Vue.use(VueRouter);
Vue.use(Bulma);
library.add(faAngleLeft, faAngleRight, faSlash, faVolumeUp);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      components: { default: Homepage, background: Background },
      name: "Homepage"
    },
    {
      path: "/tracklist",
      components: { default: Tracklist },
      name: "Tracklist"
    },
    {
      path: "/track/:id",
      components: { default: Track },
      name: "Track"
    },
    {
      path: "/ending/",
      components: { default: Ending, background: Background },
      name: "Ending"
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
