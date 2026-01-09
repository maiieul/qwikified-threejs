// src/components/react/r3f-cube.tsx
/** @jsxImportSource react */
import { qwikify$ } from "@qwik.dev/react";
import React, { useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import R3fGlobe from "r3f-globe";
import { OrbitControls } from "@react-three/drei";

const GlobeViz = () => {
  const N = 300;
  const gData = useMemo(
    () =>
      [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() / 3,
        color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
      })),
    [N]
  );

  return (
    <R3fGlobe
      globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
      pointsData={gData}
      pointAltitude="size"
      pointColor="color"
      onHover={useCallback(
        (...args: any[]) => console.log("hover", ...args),
        []
      )}
      onClick={useCallback(
        (...args: any[]) => console.log("click", ...args),
        []
      )}
    />
  );
};

export const QwikifiedGlobe = qwikify$(
  () => {
    return (
      <div style={{ height: window.innerHeight }}>
        <Canvas
          flat
          camera={useMemo(() => ({ fov: 50, position: [0, 0, 350] }), [])}
        >
          <OrbitControls
            minDistance={101}
            maxDistance={1e4}
            dampingFactor={0.1}
            zoomSpeed={0.3}
            rotateSpeed={0.3}
          />
          <color attach="white" args={[0, 0, 0]} />
          <ambientLight color={0xcccccc} intensity={Math.PI} />
          <directionalLight intensity={0.6 * Math.PI} />
          <GlobeViz />
        </Canvas>
      </div>
    );
  },
  { eagerness: "visible" }
);
