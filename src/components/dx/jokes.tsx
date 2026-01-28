import { component$, useSignal, useTask$ } from "@qwik.dev/core";
import { routeLoader$ } from "@qwik.dev/router";
import "./jokes.css";

const getJoke = async () => {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  return (await res.json()) as { setup: string; punchline: string };
};

export const useJokeLoader = routeLoader$(async () => await getJoke());

export default component$(() => {
  const initialJoke = useJokeLoader(); // fetch data without waterfalls and built-in browser caching

  const joke = useSignal(initialJoke.value); // store data in a signal that reacts to changes

  useTask$(({ track }) => {
    track(() => joke.value);
    console.log(joke.value.setup, "->", joke.value.punchline); // first logged server side with the initial joke and then client side every time joke.value changes
  });

  return (
    <>
      <div class="jokeApp">
        <h1>Jokes</h1>
        <p>{joke.value.setup}</p>
        <p>{joke.value.punchline}</p>

        <button
          onClick$={async () => {
            joke.value = await getJoke(); // assign a new joke to the signal
          }}
        >
          Get another joke
        </button>
      </div>
    </>
  );
});
