import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CoreSphere() {
  const meshRef = useRef(null);
  const glowRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.03);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.4 + Math.sin(t * 0.5) * 0.1);
    }
  });

  return (
    <group>
      {/* Inner core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light from core */}
      <pointLight color="#00d4ff" intensity={2} distance={12} decay={2} />
      <pointLight color="#8b5cf6" intensity={0.8} distance={8} decay={2} position={[0, 0.5, 0]} />
    </group>
  );
}

export default CoreSphere