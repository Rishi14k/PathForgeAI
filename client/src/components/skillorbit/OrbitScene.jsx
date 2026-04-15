import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CoreSphere from "./CoreSphere";
import OrbitRing from "./OrbitRing";
import SkillNode from "./SkillNode";

const ORBITS = [
  {
    radius: 2.2,
    speed: 0.3,
    tilt: 0.2,
    skills: [
      { name: "JavaScript", offset: 0 },
      { name: "React", offset: Math.PI },
    ],
    color: "#00d4ff",
  },
  {
    radius: 3.2,
    speed: 0.2,
    tilt: -0.3,
    skills: [
      { name: "Node.js", offset: 0.5 },
      { name: "Python", offset: Math.PI + 0.5 },
      { name: "AI", offset: (Math.PI * 2) / 3 + 0.5 },
    ],
    color: "#8b5cf6",
  },
  {
    radius: 4.4,
    speed: 0.15,
    tilt: 0.15,
    skills: [
      { name: "Design", offset: 1 },
      { name: "DevOps", offset: Math.PI + 1 },
      { name: "Data Science", offset: (Math.PI * 2) / 3 + 1 },
    ],
    color: "#10b981",
  },
  {
    radius: 5.5,
    speed: 0.1,
    tilt: -0.1,
    skills: [
      { name: "UI/UX", offset: 0.3 },
      { name: "Cloud", offset: Math.PI + 0.3 },
    ],
    color: "#06b6d4",
  },
];

function OrbitScene() {
  const groupRef = useRef();

  return (
    <group ref={groupRef}>
      <CoreSphere />

      {ORBITS.map((orbit, i) => (
        <OrbitGroup key={i} orbit={orbit} />
      ))}
    </group>
  );
}

function OrbitGroup({ orbit }) {
  const groupRef = useRef();
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta * orbit.speed;
  });

  const tiltQuat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromEuler(
      new THREE.Euler(orbit.tilt, 0, orbit.tilt * 0.5)
    );
    return q;
  }, [orbit.tilt]);

  return (
    <group ref={groupRef} quaternion={tiltQuat}>
      <OrbitRing radius={orbit.radius} color={orbit.color} />

      {orbit.skills.map((skill) => (
        <SkillNode
          key={skill.name}
          name={skill.name}
          radius={orbit.radius}
          offset={skill.offset}
          speed={orbit.speed}
          color={orbit.color}
        />
      ))}
    </group>
  );
}

export default OrbitScene