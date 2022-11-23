<script lang="ts">
	import { createEventDispatcher } from "svelte";


     const dispatch = createEventDispatcher()
    
    const restart = () => dispatch('restart')
    const reset = () => dispatch('reset')

</script>

<div>
        <button on:click={restart}>Play again</button><br>
        <button on:click={reset}>Restart</button>
</div>

<style>
    button {
		margin: 2px;
		padding: 5px;
		width: 150px;
		padding: 10px;
        margin: 10px;
		font-size: large;
	}
</style>