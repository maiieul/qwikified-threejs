import { component$, useSignal, useVisibleTask$ } from "@qwik.dev/core";

// Qwik wrapper that dynamically loads the React component only on client
export const Qwikified = component$(() => {
  const loaded = useSignal(false);
  const Component = useSignal<any>(null);

  useVisibleTask$(() => {
    // Only run on client - dynamically import the React component
    import("./qwikified-stormtrooper").then((mod) => {
      Component.value = mod.QwikifiedStormtrooper;
      loaded.value = true;
    });
  });

  if (!loaded.value || !Component.value) {
    return <div>Loading 3D scene...</div>;
  }

  const ReactComponent = Component.value;
  return <ReactComponent />;
});
