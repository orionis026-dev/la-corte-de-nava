import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface PtahTempleProps {
  isHovered?: boolean;
  onClick?: () => void;
}

export function PtahTemple({ isHovered, onClick }: PtahTempleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const codeRef = useRef<THREE.Points>(null);

  // Código fluyendo
  const codePositions = useMemo(() => {
    const positions = new Float32Array(30 * 3);
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 1.8;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
    if (codeRef.current) {
      codeRef.current.rotation.y += 0.01;
    }
  });

  const emissiveIntensity = isHovered ? 1.5 : 0.5;

  return (
    <group ref={groupRef} onClick={onClick} scale={isHovered ? 1.1 : 1}>
      {/* Base del templo */}
      <Cylinder args={[2.5, 2.8, 0.5, 8]} position={[0, -2, 0]}>
        <meshStandardMaterial
          color="#1A1A2E"
          emissive="#B87333"
          emissiveIntensity={emissiveIntensity * 0.3}
        />
      </Cylinder>

      {/* Columnas */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 1.8;
        const z = Math.sin(angle) * 1.8;
        return (
          <Cylinder key={i} args={[0.15, 0.2, 4, 8]} position={[x, 0, z]}>
            <meshStandardMaterial
              color="#1A1A2E"
              emissive="#B87333"
              emissiveIntensity={emissiveIntensity * 0.5}
            />
          </Cylinder>
        );
      })}

      {/* Cúpula de cristal */}
      <Sphere args={[1.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, 2, 0]}>
        <meshStandardMaterial
          color="#B87333"
          emissive="#B87333"
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={0.4}
        />
      </Sphere>

      {/* Cincel */}
      <Box args={[0.1, 0.8, 0.1]} position={[-0.3, 2.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <meshStandardMaterial color="#B87333" emissive="#B87333" emissiveIntensity={emissiveIntensity * 1.2} />
      </Box>

      {/* Martillo */}
      <Box args={[0.6, 0.2, 0.3]} position={[0.3, 2.5, 0]}>
        <meshStandardMaterial color="#B87333" emissive="#B87333" emissiveIntensity={emissiveIntensity * 1.2} />
      </Box>
      <Cylinder args={[0.05, 0.05, 0.8]} position={[0.3, 2.1, 0]}>
        <meshStandardMaterial color="#B87333" emissive="#B87333" emissiveIntensity={emissiveIntensity} />
      </Cylinder>

      {/* Código luminoso fluyendo */}
      <points ref={codeRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[codePositions, 3]}
            count={30}
            array={codePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#B87333"
          size={0.08}
          transparent
          opacity={0.9}
        />
      </points>

      {/* Luz */}
      <pointLight
        color="#B87333"
        intensity={isHovered ? 2.5 : 1}
        distance={8}
        position={[0, 2, 0]}
      />
    </group>
  );
}
