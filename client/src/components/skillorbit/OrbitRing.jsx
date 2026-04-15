import { useMemo } from "react";
import * as THREE from "three";

function OrbitRing({ radius, color }) {
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.35,
      roughness: 0.3,
      metalness: 0.8,
    });
  }, [color]);

  return (
    <group>
      {/* Main orbit */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.015, 16, 200]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Soft glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.05, 16, 200]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}

export default OrbitRing