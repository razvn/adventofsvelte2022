<script lang="ts">
  import { fly } from "svelte/transition";
  import Problem from "../Problem.svelte";

  type Countdown = {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
  }

  const one_day = 60 * 60 * 24
  let current_date = new Date()
  const christmas_day = (date: Date): Date => {
    let year = (current_date.getMonth() == 11 && current_date.getDate() >= 25) ? current_date.getFullYear() + 1 : current_date.getFullYear()
    return new Date(year, 11, 25)
  }

  const calc_remain = (date: Date): Countdown => {
    let seconds = Math.floor((christmas_day(current_date).getTime() - current_date.getTime())/1000)
    let minutes = Math.floor(seconds/60)
    let hours = Math.floor(minutes/60)
    let days = Math.floor(hours/24)

    hours = hours - (days * 24)
    minutes = minutes - (days * 24 * 60)-(hours * 60)
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)
    return {days, hours, minutes, seconds}
  }
  let { days, hours, minutes, seconds } = calc_remain(current_date) 
  const reload = () => setTimeout(() => {
    current_date = new Date()
    const countdown = calc_remain(current_date)
    days = countdown.days
    hours = countdown.hours
    minutes = countdown.minutes
    seconds = countdown.seconds
    reload()
  }, 1000)

  reload()
</script>

<div class="wrapper">
  <div class="title">
    <Problem title="Day 3">
      Christmas is coming soon! But how soon? 🤔 
      Wouldn't it be nice to know exactly how many days, hours, minutes, and seconds are left until that magical day? 
      In this challenge, you'll create a countdown to tell you exactly that.
      <ul>
        <li>Use the useNow composable from VueUse (preinstalled) to get a reactive version of the current time and then do the math to get days, hours, minutes, and seconds until Christmas.</li>
        <li>If you're up for a bonus challenge use the Vue transition component to transition smoothly between each countdown number! 🚀</li>
      </ul>
    </Problem>
  </div>
  <div class="line column white">
  <div class="title">
    <h5>Christmas Countdown</h5>
  </div>
  <div class="column">
    <div class="grid-container">
      <div class="grid-item">
        <span class="count">{days}</span><br/>
        <span class="text">days</span>
      </div>
      <div class="grid-item">
        <span class="count">{hours}</span><br/>
        <span class="text">hours</span>
      </div>
      <div class="grid-item">
        <span class="count">{minutes}</span><br/>
        <span class="text">minutes</span>
        </div>
      <div class="grid-item">
        <span class="count">{seconds}</span><br/>
        <span class="text">seconds</span>
      </div>  
    </div>
  </div>
</div>
</div>

<style>
  .white {
    background-color: rgb(240, 242, 244);
    width: 50% !important;
    color: black;
    padding-bottom: 50px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    width: 100%;
  }
  .column {
    flex-direction: column;
    margin: auto;
  }
  .count {
    color: rgb(66 184 131);
    font-size: larger;
    font-weight: bolder;
  }
  .text {
    font-size: smaller;
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

.grid-item {
  background-color: rgb(255, 255, 255);
    color: black;
    padding: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.grid-container {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
}

</style>
