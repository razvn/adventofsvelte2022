<script lang="ts">
  import Problem from "../Problem.svelte";
  
  let timer;
  const msToWait = 300;

  const getResult = async (param: string) => {
    if (param) {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${param}`
      );
      if (response.ok) {
        const data = await response.json();
        return data.products;
      } else {
		throw new Error("Error while loading data")
	  }
    } else {
		return Promise.resolve([])
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
      <a href="https://dummyjson.com/docs/products">DummyJSON's product API</a>. In case you're not familiar with the concept of
      debouncing, it's a technique that allows one to delay a function's
      execution until a specific amount of time has elapsed since the last call.
      <br />For this challenge, you'll need to add a 300-millisecond delay to
      the findProducts function. You can make use of readily available debounce
      implementations, or try writing one yourself.
      <br />You'll also need to display a generic loading spinner/message, and
      if the function executes successfully, place suggested products' names and
      price tags inside an unordered list. Otherwise, use native alert() to show
      a generic error message.
      <br />If the search term gets reset back to an empty string, clear the
      search suggestions too.
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
        {#each responses as resp}
          <li>{resp.title} - ${resp.price}</li>
        {/each}
      </ul>
	  {:catch error}
	  <p style="color: red">{error.message }</p>
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
    border: 1px solid grey;
    float: left;
    width: 300px;
    background: #f1f1f1;
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
