import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cone, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface NavaPyramidProps {
  isHovered?: boolean;
  onClick?: () => void;
}

export function NavaPyramid({ isHovered, onClick }: NavaPyramidProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Geometría de partículas doradas
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.random() * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      // Flotación suave
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.002;
    }
  });

  const emissiveIntensity = isHovered ? 2 : 0.8;
  const scale = isHovered ? 1.2 : 1;

  return (
    <group ref={groupRef} scale={scale} onClick={onClick}>
      {/* Pirámide dorada */}
      <Cone
        args={[2, 3, 4]}
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={emissiveIntensity}
          metalness={0.9}
          roughness={0.1}
        />
      </Cone>

      {/* Ojo de Horus en la cúspide */}
      <Sphere args={[0.4, 32, 32]} position={[0, 1.8, 0]}>
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={emissiveIntensity * 1.5}
        />
      </Sphere>

      {/* Aura dorada */}
      <Sphere args={[2.5, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Partículas flotantes */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FFD700"
          size={0.05}
          transparent
          opacity={0.8}
        />
      </points>

      {/* Luz puntual */}
      <pointLight
        color="#FFD700"
        intensity={isHovered ? 3 : 1}
        distance={10}
        position={[0, 2, 0]}
      />
    </group>
  );
}
