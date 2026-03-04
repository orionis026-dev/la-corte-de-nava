import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

import { NavaPyramid } from './entities/NavaPyramid';
import { SeshatPapyrus } from './entities/SeshatPapyrus';
import { PtahTemple } from './entities/PtahTemple';
import { TavilyMirror } from './entities/TavilyMirror';
import { JCodeMunchTree } from './entities/JCodeMunchTree';
import { EgyptianParticles } from './EgyptianParticles';
import { Nebula } from './Nebula';
import { useAgentStore } from '../store/agentStore';
import type { Agent } from '../types/agents';

// Cámara animada que se mueve al hacer click
function AnimatedCamera() {
  const { camera } = useThree();
  const { selectedAgent, isZoomed } = useAgentStore();
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const positionRef = useRef(new THREE.Vector3(0, 5, 12));

  useFrame(() => {
    if (selectedAgent && isZoomed) {
      const [x, y, z] = selectedAgent.position;
      targetRef.current.set(x, y, z);
      // Posición de la cámara acercada a la entidad
      positionRef.current.set(x, y + 3, z + 6);
    } else {
      targetRef.current.set(0, 0, 0);
      positionRef.current.set(0, 8, 15);
    }

    camera.position.lerp(positionRef.current, 0.05);
    camera.lookAt(targetRef.current);
  });

  return null;
}

// Fondo espacial estilizado egipcio
function EgyptianSpace() {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />
      <color attach="background" args={['#0a0a14']} />
      <fog attach="fog" args={['#0a0a14', 10, 50]} />
    </>
  );
}

// Entidad wrapper con hover y click
function CourtEntity({
  agent,
  children,
}: {
  agent: Agent;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const { setSelectedAgent, setZoomed } = useAgentStore();

  return (
    <group
      position={agent.position}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        setSelectedAgent(agent);
        setZoomed(true);
      }}
    >
      {children}
    </group>
  );
}

export function Court() {
  const { agents } = useAgentStore();
  const nava = agents.find((a: Agent) => a.id === 'nava');
  const seshat = agents.find((a: Agent) => a.id === 'seshat');
  const ptah = agents.find((a: Agent) => a.id === 'ptah');
  const tavily = agents.find((a: Agent) => a.id === 'tavily');
  const jcodemunch = agents.find((a: Agent) => a.id === 'jcodemunch');

  return (
    <Canvas
      camera={{ position: [0, 8, 15], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <EgyptianSpace />
      <Nebula />
      <EgyptianParticles />
      
      {/* Iluminación */}
      <ambientLight intensity={0.3} color="#4a4a6a" />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#FFD700" />

      {/* Controles de cámara */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2 - 0.1}
      />

      {/* Cámara animada */}
      <AnimatedCamera />

      {/* Entidades de la Corte */}
      {nava && (
        <CourtEntity agent={nava}>
          <NavaPyramid />
        </CourtEntity>
      )}

      {seshat && (
        <CourtEntity agent={seshat}>
          <SeshatPapyrus />
        </CourtEntity>
      )}

      {ptah && (
        <CourtEntity agent={ptah}>
          <PtahTemple />
        </CourtEntity>
      )}

      {tavily && (
        <CourtEntity agent={tavily}>
          <TavilyMirror />
        </CourtEntity>
      )}

      {jcodemunch && (
        <CourtEntity agent={jcodemunch}>
          <JCodeMunchTree />
        </CourtEntity>
      )}
    </Canvas>
  );
}
