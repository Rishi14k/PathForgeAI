import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import OrbitScene from "./OrbitScene";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const { pointer } = state;

    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      pointer.x * 0.3,
      0.05,
    );

    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      pointer.y * 0.15,
      0.05,
    );

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.current.x * 2,
      0.05,
    );

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      3 + mouse.current.y,
      0.05,
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SkillOrbitCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 3, 10], fov: 50 }}
        dpr={[1, 1]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          {/* ✅ LIGHTING IMPROVEMENT */}
          <ambientLight intensity={0.25} />

          <directionalLight position={[5, 5, 5]} intensity={1.2} />

          {/* Core glow light */}
          <pointLight position={[0, 0, 0]} intensity={2} color="#00d4ff" />

          {/* Camera Motion */}
          <CameraRig />

          {/* Orbit System */}
          <OrbitScene />

          <EffectComposer>
            <Bloom
              intensity={1.3}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default SkillOrbitCanvas;
