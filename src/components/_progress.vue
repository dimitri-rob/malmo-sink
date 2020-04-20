<template>
	<div class="duration">
		<div class="duration__progress" :style="{ width: progressBar + '%' }"></div>
	</div>
</template>

<script>
export default {
	props: ["progressBar"]
};
</script>

<style lang="scss">
@import "../css/progress.scss";
</style>