<script lang="ts">
  import Problem from "../Problem.svelte";
  import type { Product } from "./types";

  let timer;
  const msToWait = 300;
  let responseReceived = false;
  const getResult = async (param: string): Promise<Product[]> => {
    responseReceived = false;
    if (param) {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${param}`
      );
      if (response.ok) {
        const data = await response.json();
        responseReceived = true;
        return data.products.map(e => { return {title: e.title, price: e.price}});
      } else {
        throw new Error("Error while loading data");
      }
    } else {
      return Promise.resolve([]);
    }
  };

  let promise = Promise.resolve([]);

  const debounce = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      promise = getResult(e.target.value);
    }, msToWait);
  };
</script>

<div class="wrapper">
  <div class="title">
    <Problem title="Day 1">
      You're tasked with building a debounced search bar for products from
      <a href="https://dummyjson.com/docs/products">DummyJSON's product API</a>.
      <ul>
        <li>
          Debouncing, it's a technique that allows one to delay a function's
          execution until a specific amount of time has elapsed since the last
          call.
        </li>
        <li>
          For this challenge, you'll need to add a 300-millisecond delay to the
          findProducts function. You can make use of readily available debounce
          implementations, or try writing one yourself.
        </li>
        <li>
          You'll also need to display a generic loading spinner/message, and if
          the function executes successfully, place suggested products' names
          and price tags inside an unordered list. Otherwise, use native alert()
          to show a generic error message.
        </li>
        <li>
          If the search term gets reset back to an empty string, clear the
          search suggestions too.
        </li>
      </ul>
    </Problem>
  </div>
  <div class="line">
    <h5>Gift Search App</h5>
  </div>
  <div class="line">
    <input type="text" placeholder="Start typing... " on:input={debounce} />
  </div>
  <div class="line-left">
    {#await promise}
      <p>... waiting</p>
    {:then responses}
      <ul>
        {#each responses as {title, price} }
          <li>{title} - <b>${price}</b></li>
        {/each}
      </ul>
      {#if responseReceived && responses.length == 0}
        <p style="color: #ffc107">nothing found matching</p>
      {/if}
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
  input {
    padding: 10px;
    font-size: 17px;
    border: 1px solid rgb(128, 128, 128);
    float: left;
    width: 300px;
  }
  .title {
    flex: 100%;
    font-size: x-large;
  }
  .line {
    width: 100%;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: x-large;
  }

  .line-left {
    width: 100%;
    margin: auto;
    text-align: left;
    display: flex;
    justify-content: center;
    font-size: x-large;
  }
</style>
