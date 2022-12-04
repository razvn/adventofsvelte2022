<script lang="ts">
  import Problem from "../Problem.svelte";
  import type { Countdown } from "./types";
  import Rolling from "./Rolling.svelte";
  const christmas_day = (date: Date): Date => {
    let year =
      date.getMonth() == 11 && date.getDate() >= 25
        ? date.getFullYear() + 1
        : date.getFullYear();
    return new Date(year, 11, 25);
  };

  const calc_remain = (date: Date): Countdown => {
    let seconds = Math.floor(
      (christmas_day(date).getTime() - date.getTime()) / 1000
    );
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    return { days, hours, minutes, seconds };
  };
  let { days, hours, minutes, seconds } = calc_remain(new Date());

  const reload = () =>
    setTimeout(() => {
      const countdown = calc_remain(new Date());
      days = countdown.days;
      hours = countdown.hours;
      minutes = countdown.minutes;
      seconds = countdown.seconds;
      reload();
    }, 1000);

  reload();
</script>

<div class="wrapper">
  <div class="title">
    <Problem title="Day 3">
      Christmas is coming soon! But how soon? 🤔 Wouldn't it be nice to know
      exactly how many days, hours, minutes, and seconds are left until that
      magical day? In this challenge, you'll create a countdown to tell you
      exactly that.
      <ul>
        <li>
          Use the useNow composable from VueUse (preinstalled) to get a reactive
          version of the current time and then do the math to get days, hours,
          minutes, and seconds until Christmas.
        </li>
        <li>
          If you're up for a bonus challenge use the Vue transition component to
          transition smoothly between each countdown number! 🚀
        </li>
      </ul>
    </Problem>
  </div>
  <div class="line column white">
    <div class="title">
      <h5>Christmas Countdown</h5>
    </div>
    <div class="column">
      <d1>
        <dt>Days</dt>
        <Rolling key={days} --area="days">{days}</Rolling>
        <dt>Hours</dt>
        <Rolling key={hours} --area="hours">{hours}</Rolling>
        <dt>Minutes</dt>
        <Rolling key={minutes} --area="minutes">{minutes}</Rolling>
        <dt>Seconds</dt>
        <Rolling key={seconds} --area="seconds">{seconds}</Rolling>
      </d1>
    </div>
  </div>
</div>

<style>
  d1 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: "days hours minutes seconds";
    text-transform: lowercase;
    gap: 0.5rem;
    overflow: hidden;
    text-align: center;
    background-color: white;
    margin: auto;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding-left: 10px;
    padding-right: 10px;
  }
  dt {
    grid-row: 2;
    z-index: 1;
    margin: auto;
    background: white;
    padding-bottom: 5px;
  }

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
</style>
