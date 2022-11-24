<script lang="ts">
  import { fade } from "svelte/transition";
  import Day00 from "./lib/day00/Day00.svelte";
  import Day01 from "./lib/day01/Day01.svelte";

  const components = [Day00, Day01]

  let componentIndex = -1
  let currentComponent = null

  const switchComponent = (i:number) => { 
    componentIndex = i
    updateComponent()
  }

  const updateComponent = () => {
    currentComponent = components[componentIndex]
  }
</script>

<main>
  <h2><a href="https://adventofvue.com">Advent of <span style="text-decoration:line-through">Vue</span></a> Svelte 2022</h2>
  <div class="line">
    <div><a href="" on:click|preventDefault={() => switchComponent(0)} ><h4>Day 00</h4></a></div>
    <div style="padding-left: 7px; padding-right: 7px"><h4>|</h4></div>
    <div><a href="" on:click|preventDefault={() => switchComponent(1)} ><h4>Day 01</h4></a></div>
  </div>
  {#if componentIndex >= 0 && currentComponent == components[componentIndex]}
  <div id="viewport" on:outroend={switchComponent(componentIndex)} transition:fade>
    <svelte:component this={currentComponent}></svelte:component>
  </div>
  {/if}
</main>

<style>
  .line {
		width: 100%;
		margin: auto;
		text-align: center;
		display: flex;
		justify-content: center;
		font-size: x-large;
	}
</style>