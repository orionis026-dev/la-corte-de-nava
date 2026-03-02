import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import * as THREE from 'three';

interface SeshatPapyrusProps {
  isHovered?: boolean;
  onClick?: () => void;
}

export function SeshatPapyrus({ isHovered, onClick }: SeshatPapyrusProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef<THREE.Group>(null);

  const hieroglyphs = useMemo(() => {
    const chars = ['𓀀', '𓀁', '𓀂', '𓀃', '𓁐', '𓁑', '𓁒', '𓁓', '𓃻', '𓃼'];
    return Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (scrollRef.current) {
      scrollRef.current.position.y = (state.clock.elapsedTime * 0.5) % 2;
    }
  });

  const emissiveIntensity = isHovered ? 1.5 : 0.5;

  return (
    <group ref={groupRef} onClick={onClick} scale={isHovered ? 1.1 : 1}>
      {/* Papiro enrollado - parte superior */}
      <Box args={[3, 0.3, 0.3]} position={[0, 2, 0]}>
        <meshStandardMaterial
          color="#F5E6C8"
          emissive="#F5E6C8"
          emissiveIntensity={emissiveIntensity * 0.3}
        />
      </Box>

      {/* Papiro desplegado */}
      <Box args={[2.5, 4, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#F5E6C8"
          emissive="#F5E6C8"
          emissiveIntensity={emissiveIntensity * 0.2}
        />
      </Box>

      {/* Jeroglíficos flotantes */}
      <group ref={scrollRef}>
        {hieroglyphs.map((glyph, i) => (
          <Text
            key={i}
            position={[Math.sin(i * 0.8) * 0.8, (i * 0.4) - 1.5, 0.1]}
            fontSize={0.3}
            color="#40E0D0"
          >
            {glyph}
          </Text>
        ))}
      </group>

      {/* Pluma de ave */}
      <group position={[1.5, 1.5, 0.2]}>
        <Box args={[0.1, 1.5, 0.05]}>
          <meshStandardMaterial
            color="#40E0D0"
            emissive="#40E0D0"
            emissiveIntensity={emissiveIntensity}
          />
        </Box>
      </group>

      {/* Luz */}
      <pointLight
        color="#40E0D0"
        intensity={isHovered ? 2 : 0.8}
        distance={6}
        position={[0, 0, 1]}
      />
    </group>
  );
}
