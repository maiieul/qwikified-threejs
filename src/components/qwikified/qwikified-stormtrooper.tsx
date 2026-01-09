/** @jsxImportSource react */
import { qwikify$ } from "@qwik.dev/react";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ColladaLoader } from "three/addons/loaders/ColladaLoader.js";
import * as THREE from "three";

// Model component that loads and animates the stormtrooper using ColladaLoader
function StormtrooperModel({ url }: { url: string }) {
  const collada = useLoader(ColladaLoader, url);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Set up the model and animations
  useEffect(() => {
    if (!collada || !collada.scene) return;

    const avatar = collada.scene;
    const animations = avatar.animations;

    if (animations && animations.length > 0) {
      // Create animation mixer
      const mixer = new THREE.AnimationMixer(avatar);
      mixerRef.current = mixer;

      // Play the first animation
      mixer.clipAction(animations[0]).play();
    }

    // Cleanup
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current.uncacheRoot(avatar);
      }
    };
  }, [collada]);

  // Update mixer in animation loop
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  if (!collada || !collada.scene) return null;

  return <primitive object={collada.scene} ref={groupRef} />;
}

// Main scene component
const StormtrooperScene = () => {
  const modelUrl =
    "https://threejs.org/examples/models/collada/stormtrooper/stormtrooper.dae";

  return (
    <>
      {/* Grid Helper - matching vanilla Three.js setup */}
      <gridHelper args={[10, 20, 0xc1c1c1, 0x8d8d8d]} />

      {/* Lighting - matching vanilla Three.js setup */}
      <ambientLight args={[0xffffff, 0.6]} />
      <directionalLight args={[0xffffff, 3]} position={[1.5, 1, -1.5]} />

      {/* Stormtrooper model */}
      <StormtrooperModel url={modelUrl} />
    </>
  );
};

export const QwikifiedStormtrooper = qwikify$(
  () => {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Canvas
          camera={{
            fov: 25,
            position: [15, 10, -15],
            near: 1,
            far: 1000,
          }}
          gl={{ antialias: true }}
        >
          <OrbitControls
            screenSpacePanning={true}
            minDistance={5}
            maxDistance={40}
            target={[0, 2, 0]}
          />
          <StormtrooperScene />
        </Canvas>
      </div>
    );
  },
  { eagerness: "visible" }
);
