<script lang="ts">
  import Problem from "../Problem.svelte";
  import ChristmasTree from "./ChristmasTree.svelte";
</script>

<div class="wrapper">
  <div class="title">
    <Problem title="Day 4">
      Time to make a tree! 🎄      
      <ul>
        <li>
          You'll need to update the `ChristmasTree` component so that it renders, well, a Christmas tree.
        </li>
        <li>
          To get you started in the right direction — you'll need to use recursion to make this happen.
        </li>
      </ul>
    </Problem>
  </div>
  <div class="content">
    {#each Array(7) as _, index (index) }
      <ChristmasTree size= {index + 1} />
    {/each}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    width: 100%;
  }

  .title {
    flex: 100%;
    font-size: x-large;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
