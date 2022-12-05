<script lang="ts">
  import { text } from "svelte/internal";
  import Problem from "../Problem.svelte";
  import GiftLabel from "./GiftLabel.svelte";

  let from: string = "Tom";
  let to: string = "Jerry";
</script>

<div class="wrapper">
  <div class="title">
    <Problem title="Day 5">
      It's time to gift presents! And every present needs a label. So let's
      create our own gift label!
      <ul>
        <li>
          Make the static TO and FROM fields dynamic so we can enter custom
          names.
        </li>
        <li>
          Below the label, add two input fields with two-way binding for the TO
          and FROM fields.
        </li>
        <li>
          When entering data into the input fields, the TO and FROM fields
          should dynamically update.
        </li>
      </ul>
    </Problem>
  </div>
  <div class="content">
    <GiftLabel bind:from bind:to />
    <div class="form">
      <label class="item">
        To:
        <input class="input" type="text" bind:value={to} />
      </label>

      <label class="item">
        From:
        <input class="input" type="text" bind:value={from} />
      </label>
    </div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    width: 100%;
  }

  .form {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: left;
    width: 30%;
    height: 100%;
    text-align: left;
  }
  .item {
    padding: 0.25rem;
    display: block;
    width: 100%;
  }

  .input {
    display: block;
    padding: 0.5rem;
    background-color: #f9fafb;
    color: #111827;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 100%;
    border-radius: 0.5rem;
    border-width: 1px;
    border-color: #d1d5db;
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
