<script lang="ts">
  export let size: number = 1;

  const colors = ["#ff0000", "#eeff00", "#002fff"];

  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
</script>

<div>
  <div class="tree">
    {#each Array(size) as _, index (index)}
      <div class="cercle">
        <div
          class="spot"
          style="--color: {randomColor()}; --height: {Math.random() +
            0.1}rem; --duration: {Math.floor(Math.random() * 5 + 1)}s"
        />
      </div>
    {/each}
  </div>
</div>

<style>
  .tree {
    display: flex;
    flex-flow: row;
    justify-content: center;
  }
  .cercle {
    display: flex;
    position: relative;
    margin: -0.5rem;
    justify-content: center;
    align-items: center;
    width: 4rem;
    background-color: #42b883;
    height: 4rem;
    border-radius: 9999px;
  }
  .spot {
    display: flex;
    position: relative;
    margin: -0.5rem;
    justify-content: center;
    align-items: center;
    width: 0.5rem;
    border-radius: 9999px;
    background-color: var(--color);
    height: var(--height);
    animation: blinker var(--duration) linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
</style>
