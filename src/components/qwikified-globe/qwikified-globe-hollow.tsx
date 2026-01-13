// src/components/react/r3f-cube.tsx
/** @jsxImportSource react */
import { qwikify$ } from "@qwik.dev/react";
import React, { createElement, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import R3fGlobe from "r3f-globe";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import * as topojson from "topojson-client";
import type * as GeoJSON from "geojson";
import type { Topology } from "topojson-specification";

export const Hollow = (props: any) => {
  const [landPolygons, setLandPolygons] = useState<GeoJSON.Feature[]>([]);

  useEffect(() => {
    // load data
    fetch("//unpkg.com/world-atlas/land-110m.json")
      .then((res) => res.json())
      .then((landTopo: Topology) => {
        const result = topojson.feature(landTopo, landTopo.objects.land);
        const features: GeoJSON.Feature[] =
          "features" in result ? result.features : [result];
        setLandPolygons(features);
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

export const QwikifiedGlobeHollow = qwikify$(
  () => {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Canvas
          flat
          camera={useMemo(() => ({ fov: 50, position: [0, 0, 350] }), [])}
        >
          <OrbitControls
            minDistance={400}
            maxDistance={500}
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
