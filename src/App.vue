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
@import "../src/css/main.scss";
@import "../src/css/fonts.scss";
@import "../src/css/transitions.scss";
</style>
