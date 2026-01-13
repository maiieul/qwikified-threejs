import { Tabs } from "@qds.dev/ui";
import { component$ } from "@qwik.dev/core";

export default component$(() => {
  return (
    <Tabs.Root class="tabs-root">
      <Tabs.List>
        <Tabs.Trigger class="tabs-trigger">Tab 1</Tabs.Trigger>
        <Tabs.Trigger class="tabs-trigger">Tab 2</Tabs.Trigger>
        <Tabs.Trigger class="tabs-trigger">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content>Content 1</Tabs.Content>
      <Tabs.Content>Content 2</Tabs.Content>
      <Tabs.Content>Content 3</Tabs.Content>
    </Tabs.Root>
  );
});
