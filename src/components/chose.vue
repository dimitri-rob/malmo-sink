<template>
  <section class="chose">
    <div class="hero is-fullheight homepage__container">
      <div class="columns is-vcentered">
        <div class="columns">
          <h1>Chose</h1>
          <nav>
            <ul>
              <li>
                <router-link :to="{ name: 'Track', params: { id: 'sink' } }"
                  >sink</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'Track', params: { id: 'wander' } }"
                  >wander</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'Track', params: { id: 'boreal' } }"
                  >boreal</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'Track', params: { id: 'atlas' } }"
                  >atlas</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'Track', params: { id: 'short' } }"
                  >short</router-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../css/_variables.scss";

.chose {
  position: relative;
  z-index: 10;
}
</style>
