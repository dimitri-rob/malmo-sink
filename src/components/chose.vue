<template>
  <section class="chose">
    <h1>Chose</h1>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'Track', params: { id: 'sink' } }">sink</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Track', params: { id: 'wander' } }">wander</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Track', params: { id: 'boreal' } }">boreal</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Track', params: { id: 'atlas' } }">atlas</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Track', params: { id: 'short' } }">short</router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {};
</script>

<style>
.chose {
  background: red;
}
</style>
