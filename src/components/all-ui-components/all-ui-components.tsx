import { component$ } from "@qwik.dev/core";
import Calendar from "../ui/calendar";
import Checkbox from "../ui/checkbox";
import Toggle from "../ui/toggle";
import Tabs from "../ui/tabs";
import Pagination from "../ui/pagination";
import Popover from "../ui/popover";
import RadioGroup from "../ui/radio-group";
import Slider from "../ui/slider";
import Switch from "../ui/switch";

export default component$(() => {
  return (
    <>
      <Calendar />
      <Checkbox />
      <Pagination />
      <Popover />
      <RadioGroup />
      <Slider />
      <Switch />
      <Tabs />
      <Toggle />
    </>
  );
});
