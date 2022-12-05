<script lang="ts">
  export let from: string = "";
  export let to: string = "";
</script>

<div class="container">
    <div class="gift">
      <div class="border">
        <img src="/src/assets/santa.svg" class="img" alt=""/>
        <div class="text">
          <h1 class="title">Happy Holidays!</h1>
          <div class="label">TO: {to}</div>
          <div class="label">FROM: {from}</div>
        </div>
      </div>
    </div>
</div>

<style>
  .text {
    margin: 0.25rem;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .img {
    max-width: 12em;
  }

  .gift {
    padding: 1rem;
    display: flex;
    background-color: #f87171;
    color: #ffffff;
    width: 100%;
    max-width: 42rem;
    border-radius: 0.25rem;
  }

  .border {
    display: flex;
    background-color: #f87171;
    color: #ffffff;
    width: 100%;
    border-style: solid;
    border: 0.15rem solid #ffffff;
    border-radius: 0.25rem;
    align-items: center;
  }

  .title {
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
    font-size: 2.25rem;
    line-height: 2.5rem;
    padding-left: 0.25rem;
  }

  .label {
    padding: 0.5rem;
    margin-top: 1rem;
    text-align: left;
    background-color: #ffffff;
    color: #000000;
  }
</style>
