import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Bulma from "bulma";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Homepage from "./components/homepage";
import Chose from "./components/chose";
import Track from "./components/track";
import Ending from "./components/ending.vue";

Vue.use(VueRouter);
Vue.use(Bulma);
library.add(faAngleRight);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Homepage,
      name: "Homepage"
    },
    {
      path: "/chose",
      component: Chose,
      name: "Chose"
    },
    {
      path: "/track/:id",
      component: Track,
      name: "Track"
    },
    {
      path: "/ending/",
      component: Ending,
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
