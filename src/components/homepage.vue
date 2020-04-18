<template>
  <section class="homepage">
    <h1>homepage</h1>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'Chose' }">Start</router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../css/homepage.scss";
</style>
