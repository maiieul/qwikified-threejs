import { Slider } from "@qds.dev/ui";
import { component$ } from "@qwik.dev/core";

export default component$(() => {
  return (
    <Slider.Root class="slider-root">
      <Slider.Track class="slider-track">
        <Slider.Range class="slider-range" />
        <Slider.Thumb class="slider-thumb" />
      </Slider.Track>
    </Slider.Root>
  );
});
