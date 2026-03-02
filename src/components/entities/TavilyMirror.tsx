import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Circle, Line } from '@react-three/drei';
import * as THREE from 'three';

interface TavilyMirrorProps {
  isHovered?: boolean;
  onClick?: () => void;
}

export function TavilyMirror({ isHovered, onClick }: TavilyMirrorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const raysRef = useRef<THREE.Group>(null);

  const rayCount = 12;
  const rays = useMemo(() => {
    return Array.from({ length: rayCount }, (_, i) => ({
      angle: (i / rayCount) * Math.PI * 2,
      length: 2 + Math.random() * 1.5,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (raysRef.current) {
      const time = state.clock.elapsedTime;
      raysRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(time * 2 + i * 0.5) * 0.2;
        child.scale.set(scale, scale, 1);
      });
    }
  });

  const emissiveIntensity = isHovered ? 2 : 0.8;

  return (
    <group ref={groupRef} onClick={onClick} scale={isHovered ? 1.15 : 1}>
      {/* Espejo cóncavo principal */}
      <Circle args={[2, 64]} rotation={[0, 0, 0]}>
        <meshStandardMaterial
          color="#FFBF00"
          emissive="#FFBF00"
          emissiveIntensity={emissiveIntensity}
          metalness={1}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </Circle>

      {/* Borde decorativo */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[2, 2.3, 64]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFBF00"
          emissiveIntensity={emissiveIntensity * 0.5}
        />
      </mesh>

      {/* Rayos de escaneo */}
      <group ref={raysRef}>
        {rays.map((ray, i) => {
          const points = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(
              Math.cos(ray.angle) * ray.length,
              Math.sin(ray.angle) * ray.length,
              0
            ),
          ];
          return (
            <Line
              key={i}
              points={points}
              color="#FFFFFF"
              lineWidth={2}
              transparent
              opacity={0.6}
            />
          );
        })}
      </group>

      {/* Datos flotantes alrededor */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
        const radius = 3.5;
        return (
          <group
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0.1]}
          >
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.05]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.7} />
            </mesh>
          </group>
        );
      })}

      {/* Luz intensa */}
      <pointLight
        color="#FFBF00"
        intensity={isHovered ? 4 : 1.5}
        distance={10}
        position={[0, 0, 0.5]}
      />
      <spotLight
        color="#FFFFFF"
        intensity={isHovered ? 2 : 0.5}
        position={[0, 0, 3]}
        target-position={[0, 0, 0]}
        angle={Math.PI / 4}
        penumbra={0.5}
      />
    </group>
  );
}
