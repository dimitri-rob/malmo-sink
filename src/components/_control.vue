<template>
	<div class="control">
		<router-link class="control__back" :to="{ name: 'Tracklist' }">
			<font-awesome-icon icon="angle-left" />
			{{ back }}
		</router-link>
		<div>
			<div class="control__volume" v-if="volume === 1">
				<label for="volumeControlOn" class="control__volume__icon">
					<font-awesome-icon icon="volume-up" />
				</label>
				<input
					class="control__volume__input"
					type="checkbox"
					name="volumeControlOn"
					id="volumeControlOn"
					@change="volumeChange(0)"
				/>
			</div>

			<div class="control__volume" v-if="volume === 0">
				<label for="volumeControlOff" class="control__volume__icon">
					<font-awesome-icon icon="slash" />
				</label>
				<input
					class="control__volume__input"
					type="checkbox"
					name="volumeControlOff"
					id="volumeControlOff"
					@change="volumeChange(1)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			back: "back",
			volume: 1
		};
	},
	methods: {
		volumeChange: function(level) {
			Howler.volume(level);
			this.volume = level;
		}
	}
};
</script>

<style lang="scss">
@import "../css/control.scss";
</style>