import { component$ } from "@qwik.dev/core";
import AllUiComponents from "~/components/all-ui-components/all-ui-components";
import OnVisibleQwikifiedGlobe from "~/components/qwikified-globe/on-visible-qwikified-globe";

export default component$(() => {
  return (
    <>
      <AllUiComponents />
      <div style={{ height: "100vh", width: "100vw" }} />
      <OnVisibleQwikifiedGlobe />
    </>
  );
});
