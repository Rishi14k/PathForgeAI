import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// Lucide Icons
import {
  Code2,
  Cpu,
  Database,
  Cloud,
  Palette,
  Server,
  Brain,
  Layout,
} from "lucide-react";

/* -------------------------------- */
/* Skill → Icon Mapping */
/* -------------------------------- */

const ICON_MAP = {
  JavaScript: Code2,
  React: Cpu,
  "Node.js": Server,
  Python: Code2,
  AI: Brain,
  Design: Palette,
  DevOps: Server,
  "Data Science": Database,
  "UI/UX": Layout,
  Cloud: Cloud,
};

function SkillNode({ name, radius, offset, speed }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const Icon = useMemo(() => {
    return ICON_MAP[name] || Code2;
  }, [name]);

  const scaleVector = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;

    const angle = t * speed + offset;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(t * 0.5 + offset) * 0.15;

    meshRef.current.position.set(x, y, z);

    const targetScale = hovered ? 1.5 : 1;
    scaleVector.set(targetScale, targetScale, targetScale);

    meshRef.current.scale.lerp(scaleVector, 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Invisible interaction sphere */}
      <sphereGeometry args={[0.35, 16, 16]} />
      <meshBasicMaterial transparent opacity={0} />

      {/* ICON UI */}
      <Html center distanceFactor={8}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.3s ease",
            transform: `scale(${hovered ? 1.2 : 1})`,
          }}
        >
          <div
            style={{
              padding: "10px",
              borderRadius: "12px",
              background: hovered
                ? "rgba(255,255,255,0.12)"
                : "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              border: hovered
                ? "1px solid rgba(255,255,255,0.4)"
                : "1px solid rgba(255,255,255,0.1)",
              boxShadow: hovered
                ? "0 0 25px rgba(255,255,255,0.25)"
                : "none",
            }}
          >
            <Icon size={22} color="white" />
          </div>

          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "11px",
              color: hovered
                ? "#ffffff"
                : "rgba(255,255,255,0.7)",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
        </div>
      </Html>
    </mesh>
  );
}

export default SkillNode