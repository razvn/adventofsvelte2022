<script lang="ts">
  let isVisible = false;
  export let title = ""
</script>

  <button on:click={() => isVisible = !isVisible}>{title}</button>
  {#if isVisible}
    <div class="line">
      <slot />
    </div>
  {/if}

<style>
  .line {
    background-color:rgba(211, 211, 211, 0.608);
    margin: 5px;
    padding: 10px;
    text-align: left;
    width: 100%;
  }
</style>
