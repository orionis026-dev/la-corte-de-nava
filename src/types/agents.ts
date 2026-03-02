export interface Agent {
  id: string;
  name: string;
  role: string;
  symbol: string;
  color: string;
  secondaryColor: string;
  position: [number, number, number];
  status: 'idle' | 'working' | 'error' | 'completed';
  lastActivity: string;
  currentTask?: string;
  direction: 'center' | 'east' | 'south' | 'west' | 'north';
}

export interface AgentState {
  agents: Agent[];
  selectedAgent: Agent | null;
  isZoomed: boolean;
  setSelectedAgent: (agent: Agent | null) => void;
  setZoomed: (zoomed: boolean) => void;
  updateAgentStatus: (id: string, status: Agent['status'], task?: string) => void;
}

export interface CourtCamera {
  position: [number, number, number];
  target: [number, number, number];
  zoom: number;
}
