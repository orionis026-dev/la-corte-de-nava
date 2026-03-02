import { create } from 'zustand';
import { AgentState } from '../types/agents';

const initialAgents = [
  {
    id: 'nava',
    name: 'Nava',
    role: 'La Faraona - Orquestadora Suprema',
    symbol: 'Ojo de Horus',
    color: '#FFD700',
    secondaryColor: '#00D4FF',
    position: [0, 0, 0] as [number, number, number],
    status: 'idle' as const,
    lastActivity: new Date().toISOString(),
    direction: 'center' as const,
  },
  {
    id: 'seshat',
    name: 'Seshat',
    role: 'La Escribana - Documentalista',
    symbol: 'Pluma de Ave',
    color: '#F5E6C8',
    secondaryColor: '#40E0D0',
    position: [8, 0, 0] as [number, number, number],
    status: 'idle' as const,
    lastActivity: new Date().toISOString(),
    direction: 'east' as const,
  },
  {
    id: 'ptah',
    name: 'Ptah',
    role: 'El Artesano - Constructor de Código',
    symbol: 'Cincel y Martillo',
    color: '#B87333',
    secondaryColor: '#1A1A2E',
    position: [0, 0, 8] as [number, number, number],
    status: 'idle' as const,
    lastActivity: new Date().toISOString(),
    direction: 'south' as const,
  },
  {
    id: 'tavily',
    name: 'Tavily',
    role: 'El Buscador - Explorador Web',
    symbol: 'Disco Solar',
    color: '#FFBF00',
    secondaryColor: '#FFFFFF',
    position: [-8, 0, 0] as [number, number, number],
    status: 'idle' as const,
    lastActivity: new Date().toISOString(),
    direction: 'west' as const,
  },
  {
    id: 'jcodemunch',
    name: 'jCodeMunch',
    role: 'El Indexador - Mapeador de Código',
    symbol: 'Árbol de la Vida',
    color: '#50C878',
    secondaryColor: '#8A2BE2',
    position: [0, 0, -8] as [number, number, number],
    status: 'idle' as const,
    lastActivity: new Date().toISOString(),
    direction: 'north' as const,
  },
];

export const useAgentStore = create<AgentState>((set) => ({
  agents: initialAgents,
  selectedAgent: null,
  isZoomed: false,
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  setZoomed: (zoomed) => set({ isZoomed: zoomed }),
  updateAgentStatus: (id, status, task) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              status,
              currentTask: task ?? agent.currentTask,
              lastActivity: new Date().toISOString(),
            }
          : agent
      ),
    })),
}));
