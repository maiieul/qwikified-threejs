/** @jsxImportSource react */
import { qwikify$ } from "@qwik.dev/react";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Model component that loads and animates the soldier using GLTFLoader
function SoldierModel({ url }: { url: string }) {
  const { scene, animations } = useGLTF(url);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Set up the model and animations
  useEffect(() => {
    if (!scene) return;

    if (animations && animations.length > 0) {
      // Create animation mixer
      const mixer = new THREE.AnimationMixer(scene);
      mixerRef.current = mixer;

      // Play the first animation
      mixer.clipAction(animations[0]).play();
    }

    // Cleanup
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current.uncacheRoot(scene);
      }
    };
  }, [scene, animations]);

  // Update mixer in animation loop
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  if (!scene) return null;

  return <primitive object={scene} ref={groupRef} />;
}

// Main scene component
const SoldierScene = () => {
  const modelUrl = "/silly-dancing.compressed.glb";

  return (
    <>
      {/* Lighting - matching vanilla Three.js setup */}
      <ambientLight args={[0xffffff, 1]} />
      <directionalLight args={[0xffffff, 5]} position={[1.5, 5, -1.5]} />
      {/* Soldier model */}
      <SoldierModel url={modelUrl} />
    </>
  );
};

export const QwikifiedSoldier = qwikify$(
  () => {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Canvas
          camera={{
            fov: 25,
            position: [10, 5, -10],
            near: 1,
            far: 1000,
          }}
          gl={{ antialias: true }}
        >
          <OrbitControls
            screenSpacePanning={true}
            enableZoom={false}
            target={[0, 2, 0]}
          />
          <SoldierScene />
        </Canvas>
      </div>
    );
  },
  { eagerness: "visible" }
);
