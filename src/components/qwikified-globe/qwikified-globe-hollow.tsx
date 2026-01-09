// src/components/react/r3f-cube.tsx
/** @jsxImportSource react */
import { qwikify$ } from "@qwik.dev/react";
import React, { createElement, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import R3fGlobe from "r3f-globe";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
// @ts-expect-error - topojson-client is a module
import * as topojson from "https://esm.sh/topojson-client";

export const Hollow = (props: any) => {
  const [landPolygons, setLandPolygons] = useState([]);

  useEffect(() => {
    // load data
    fetch("//unpkg.com/world-atlas/land-110m.json")
      .then((res) => res.json())
      .then((landTopo) => {
        setLandPolygons(
          topojson.feature(landTopo, landTopo.objects.land).features
        );
      });
  }, []);

  const polygonsMaterial = useMemo(
    () =>
      new THREE.MeshLambertMaterial({
        color: "darkslategrey",
        side: THREE.DoubleSide,
      }),
    []
  );

  return createElement(R3fGlobe, {
    ...props,
    backgroundColor: "rgba(0,0,0,0)",
    showGlobe: false,
    showAtmosphere: false,
    polygonsData: landPolygons,
    polygonCapMaterial: polygonsMaterial,
    polygonSideColor: () => "rgba(0, 0, 0, 0)",
  });
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
          <Hollow />
        </Canvas>
      </div>
    );
  },
  { eagerness: "visible" }
);
