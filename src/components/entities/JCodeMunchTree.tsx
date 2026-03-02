import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

interface JCodeMunchTreeProps {
  isHovered?: boolean;
  onClick?: () => void;
}

export function JCodeMunchTree({ isHovered, onClick }: JCodeMunchTreeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Group>(null);

  // Generar nodos y conexiones del árbol
  const { nodes, connections } = useMemo(() => {
    const nodeList: { position: [number, number, number]; size: number }[] = [];
    const connectionList: [number, number][] = [];

    // Nodo raíz
    nodeList.push({ position: [0, -2, 0], size: 0.4 });

    // Nodos nivel 1
    const level1Positions: [number, number, number][] = [
      [-1.5, -0.5, 1],
      [1.5, -0.5, 1],
      [0, -0.5, -1.5],
      [-1, -0.5, -0.5],
      [1, -0.5, -0.5],
    ];
    level1Positions.forEach((pos) => {
      connectionList.push([0, nodeList.length]);
      nodeList.push({ position: pos, size: 0.3 });
    });

    // Nodos nivel 2
    const level2Positions: [number, number, number][] = [
      [-2.5, 1, 1.5],
      [-0.5, 1, 2],
      [2.5, 1, 1.5],
      [0.5, 1, 2],
      [2, 1, -1],
      [-2, 1, -1],
      [0, 1, -2.5],
    ];
    level2Positions.forEach((pos, i) => {
      const parentIndex = 1 + (i % level1Positions.length);
      connectionList.push([parentIndex, nodeList.length]);
      nodeList.push({ position: pos, size: 0.25 });
    });

    // Nodos nivel 3 (hojas)
    const level3Positions: [number, number, number][] = [
      [-3, 2.5, 2],
      [-1.5, 2.5, 2.5],
      [3, 2.5, 2],
      [1.5, 2.5, 2.5],
      [2.5, 2.5, -1.5],
      [-2.5, 2.5, -1.5],
      [0, 2.5, -3],
      [0.5, 2.5, 0],
      [-0.5, 2.5, 0],
    ];
    level3Positions.forEach((pos, i) => {
      const parentIndex = 6 + (i % level2Positions.length);
      connectionList.push([parentIndex, nodeList.length]);
      nodeList.push({ position: pos, size: 0.2 });
    });

    return { nodes: nodeList, connections: connectionList };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (pulseRef.current) {
      pulseRef.current.children.forEach((child, i) => {
        const time = state.clock.elapsedTime;
        const scale = 1 + Math.sin(time * 3 + i * 0.5) * 0.3;
        child.scale.set(scale, scale, scale);
      });
    }
  });

  const emissiveIntensity = isHovered ? 1.5 : 0.6;

  return (
    <group ref={groupRef} onClick={onClick} scale={isHovered ? 1.1 : 1}>
      {/* Conexiones (líneas) */}
      {connections.map(([start, end], i) => (
        <Line
          key={`conn-${i}`}
          points={[nodes[start].position, nodes[end].position]}
          color="#8A2BE2"
          lineWidth={isHovered ? 3 : 2}
          transparent
          opacity={0.8}
        />
      ))}

      {/* Nodos */}
      <group ref={pulseRef}>
        {nodes.map((node, i) => (
          <Sphere key={`node-${i}`} args={[node.size, 16, 16]} position={node.position}>
            <meshStandardMaterial
              color="#50C878"
              emissive="#50C878"
              emissiveIntensity={emissiveIntensity}
            />
          </Sphere>
        ))}
      </group>

      {/* Pulso de datos viajando */}
      {connections.map(([start, end], i) => {
        const midPoint: [number, number, number] = [
          (nodes[start].position[0] + nodes[end].position[0]) / 2,
          (nodes[start].position[1] + nodes[end].position[1]) / 2,
          (nodes[start].position[2] + nodes[end].position[2]) / 2,
        ];
        return (
          <Sphere key={`pulse-${i}`} args={[0.08, 8, 8]} position={midPoint}>
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#50C878"
              emissiveIntensity={2}
              transparent
              opacity={0.9}
            />
          </Sphere>
        );
      })}

      {/* Aura */}
      <Sphere args={[4, 32, 32]}>
        <meshBasicMaterial
          color="#50C878"
          transparent
          opacity={0.05}
        />
      </Sphere>

      {/* Luz */}
      <pointLight
        color="#50C878"
        intensity={isHovered ? 2 : 0.8}
        distance={8}
        position={[0, 1, 0]}
      />
    </group>
  );
}
