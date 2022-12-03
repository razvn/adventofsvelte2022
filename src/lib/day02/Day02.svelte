<script lang="ts">
  import { onMount } from "svelte";
  import Problem from "../Problem.svelte";
  import type { Joke } from "./types";
  let responseReceived = false;

  const getResult = async (): Promise<Joke> => {
    responseReceived = false;
    showAnswer = false;
    const response = await fetch("https://v2.jokeapi.dev/joke/christmas");
    if (response.ok) {
      const data = await response.json();
      responseReceived = true;
      return {
        question: data.setup,
        answer: data.delivery,
      };
    } else {
      throw new Error("Error while loading data");
    }
  };

  let promise = Promise.resolve(null);
  let showAnswer = false;

  onMount(async () => {
    promise = getResult();
  });
</script>

<div class="wrapper">
  <div class="title">
    <Problem title="Day 2">
      We all can use a little bit more joy in our lives. So it's time to tell
      jokes!
      <ul>
        <li>
          Use the <a href="https://v2.jokeapi.dev/joke/christmas">Joke API</a> endpoint to load a joke.
        </li>
        <li>First, render the setup text.</li>
        <li>
          Then, add a Tell Me! button that we can click to reveal the delivery
          text.
        </li>
        <li>
          After revealing the delivery text, render an Another button which
          loads the next joke.
        </li>
      </ul>
    </Problem>
  </div>
  <div class="title">
    <h5>Christmas Joke</h5>
  </div>
  <div class="line">
    {#await promise}
      <p>... waiting</p>
    {:then response}
      <div class="wrapper">
        <div class="left">
          <div class="question">{response.question}</div>
        </div>
        {#if !showAnswer}
          <div class="line">
            <button
              class="button"
              on:click={() => {
                showAnswer = !showAnswer;
              }}>Tell me!</button
            >
          </div>
        {:else}
          <div class="line-right">
            <div class="right">
              <div class="response">{response.answer}</div>
            </div>
          </div>

          <div class="line">
            <button
              class="button"
              on:click={() => {
                promise = getResult();
              }}>Another</button
            >
          </div>
        {/if}
      </div>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    width: 100%;
  }
  .left {
    justify-content: left;
  }
  .right {
    justify-content: right;
  }
  .button {
    margin: 20px;
    width: 300px;
  }
  .title {
    flex: 100%;
    font-size: x-large;
  }
  .line {
    width: 400px;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: x-large;
  }

  .question {
    border-radius: 15px;
    background: rgb(17 94 89);
    color: white;
    text-align: left;
    margin: auto;
    justify-content: center;
    display: flex;
    padding: 20px;
    width: 250px;
  }

  .response {
    border-radius: 15px;
    background: rgb(153 27 27);
    color: white;
    text-align: left;
    margin: auto;
    margin-top: 10px;
    justify-content: center;
    display: flex;
    padding: 20px;
    width: 250px;
  }

  .line-right {
    width: 100%;
    margin: auto;
    text-align: right;
    display: flex;
    justify-content: right;
    font-size: x-large;
  }
</style>
