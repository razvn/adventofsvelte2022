<script lang="ts">
  import { fade } from "svelte/transition";
  import Day00 from "./lib/day00/Day00.svelte";
  import Day01 from "./lib/day01/Day01.svelte";
  import Day02 from "./lib/day02/Day02.svelte";
  import Day03 from "./lib/day03/Day03.svelte";
  import Day04 from "./lib/day04/Day04.svelte";
  import Day05 from "./lib/day05/Day05.svelte";

  const components = [
    { name: "Day 00", component: Day00 },
    { name: "Day 01", component: Day01 },
    { name: "Day 02", component: Day02 },
    { name: "Day 03", component: Day03 },
    { name: "Day 04", component: Day04 },
    { name: "Day 05", component: Day05 },
  ];

  let componentIndex = -1;
  let currentComponent = null;

  const switchComponent = (i: number) => {
    componentIndex = i;
    updateComponent();
  };
  const updateComponent = () => {
    currentComponent = components[componentIndex];
  };
</script>

<main>
  <h2>
    <a href="https://adventofvue.com" title="Advent of vue">Advent of <span style="text-decoration:line-through">Vue</span></a> Svelte 2022
  </h2>
  <div class="line">
    {#each components as component, i}
      <div>
        {#if i === componentIndex}
          <h4>{component.name}</h4>
        {:else}
          <a href="/" on:click|preventDefault={() => switchComponent(i)}
            ><h4>{component.name}</h4></a
          >
        {/if}
      </div>
      <div style="padding-left: 7px; padding-right: 7px"><h4>|</h4></div>
    {/each}
  </div>
  {#if componentIndex >= 0 && currentComponent == components[componentIndex]}
    <div
      class="line"
      id="viewport"
      on:outroend={() => switchComponent(componentIndex)}
      transition:fade
    >
      <svelte:component this={currentComponent.component} />
    </div>
  {/if}
</main>

<style>
  main {
    width: 100%;
  }
  .line {
    width: 100%;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: x-large;
  }
</style>
