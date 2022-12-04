<script lang="ts">
  import { fly } from "svelte/transition";

  export let key: number;

  const distance = 50;
  const duration = 700;

  const commun = { duration, opacity: 1 };
</script>

{#key key}
  <dd
    in:fly|local={{ y: -1 * distance, ...commun }}
    out:fly|local={{ y: distance, ...commun }}
  >
    <slot />
  </dd>
{/key}

<style>
  dd {
    grid-area: var(--area);
    overflow: hidden;
    display: block;
    color: rgb(66 184 131);
    font-size: larger;
    font-weight: bolder;
    text-align: center;
    margin: auto;
    padding-top: 10px;
  }
</style>
