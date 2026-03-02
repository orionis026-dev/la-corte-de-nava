import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Nebula() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, 'rgba(212, 175, 55, 0.3)');
    gradient.addColorStop(0.5, 'rgba(30, 58, 95, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.005;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, -20]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial map={texture} transparent opacity={0.5} depthWrite={false} />
    </mesh>
  );
}
