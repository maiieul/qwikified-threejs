import { component$ } from "@qwik.dev/core";
import AllUiComponents from "~/components/all-ui-components/all-ui-components";
import { QwikifiedStormtrooper } from "~/components/qwikified-stormtrooper/qwikified-stormtrooper";

export default component$(() => {
  return (
    <>
      <AllUiComponents />
      <div style={{ height: "100vh", width: "100vw" }} />
      <QwikifiedStormtrooper />
    </>
  );
});
