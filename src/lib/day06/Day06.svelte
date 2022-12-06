<script lang="ts">
  import { onMount } from "svelte";
  import type { Product } from "../day06/types";
  import Problem from "../Problem.svelte";

  let first: Product;
  let second: Product;

  let items: Product[] = [];
  function message(f: Product, s: Product): string {
    if (f && s) {
      if (f.id == s.id) return 'These are the same items'
      else {
        if (f.price == s.price) return 'Both items coust the same price'
        else {
        const cheap = f.price < s.price ? f : s
        const exp = f.price > s.price ? f : s
        const nb = Math.floor(exp.price / cheap.price)
        return `You can buy <b>${nb}</b> <i>${cheap.title}</i> for about the same price as a single <i>${exp.title}</i>`
        }
      }
    } else {
      return "Select two values"
    }
  }

  onMount(async () => {
		const response = await fetch(`https://dummyjson.com/products`);
		if (response.ok) {
        const data = await response.json();
        items = data.products.map(e => { return {id: e.id, title: e.title, price: e.price}});
      } else {
        throw new Error("Error while loading data");
      }
	});
</script>

<div class="wrapper">
  <div class="title">
    <Problem title="Day 6">
      You're tasked with building an app that will compare how many X items one
      can obtain for roughly the same price as a single item Y.
      <ul>
        <li>
          Obtain products from <a href="https://dummyjson.com/docs/products"
            >DummyJSON's Prodcuts API (Get All Products endpoint)</a
          > and display all entries along with their names and price tags inside
          a select input
        </li>
        <li>
          Show a comparison sentence in the `ComparisonSummray` component if two
          items have been chosen (eg. <i
            >You can buy 10 cheaper items for about the same price as a single
            expensive item</i
          >)
        </li>
        <li>
          If two items have the same `id`s, display <i
            >These are the same items</i
          > message
        </li>
      </ul>
    </Problem>
  </div>
  <div class="content">
    <div class="line"><h4>Select items to compare</h4></div>
    <div class="form">
      <select class="input" bind:value={first}>
        {#each items as item}
        <option value="{item}">{item.title} - ${item.price}</option>
        {/each}
      </select>
      <select class="input" bind:value={second} width="100%">
        {#each items as item}
          <option value="{item}">{item.title} - ${item.price}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="title">
   {@html message(first, second)}
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
    width: 50%;
    height: 100%;
    text-align: left;
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
    margin: 0.5rem;
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
