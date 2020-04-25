<template>
  <div id="app">
    <transition name="fade">
      <router-view name="background"></router-view>
    </transition>

    <main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../src/css/_variables.scss";
@import "../src/css/_main.scss";
@import "../src/css/_fonts.scss";
@import "../src/css/_transitions.scss";
</style>
