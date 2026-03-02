import { useAgentStore } from '../store/agentStore';

export function AgentPanel() {
  const { selectedAgent, isZoomed, setZoomed, setSelectedAgent } = useAgentStore();

  if (!selectedAgent || !isZoomed) return null;

  return (
    <div className="fixed top-4 right-4 w-80 agent-panel z-50">
      <div className="flex justify-between items-start mb-4">
        <h2
          className="text-2xl font-bold holographic-text"
          style={{ color: selectedAgent.color }}
        >
          {selectedAgent.name}
        </h2>
        <button
          onClick={() => {
            setZoomed(false);
            setTimeout(() => setSelectedAgent(null), 500);
          }}
          className="text-white/70 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-white/60">Rol</p>
          <p className="text-white">{selectedAgent.role}</p>
        </div>

        <div>
          <p className="text-sm text-white/60">Símbolo</p>
          <p className="text-white">{selectedAgent.symbol}</p>
        </div>

        <div>
          <p className="text-sm text-white/60">Estado</p>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                selectedAgent.status === 'working'
                  ? 'bg-yellow-400 animate-pulse'
                  : selectedAgent.status === 'error'
                  ? 'bg-red-500'
                  : selectedAgent.status === 'completed'
                  ? 'bg-green-400'
                  : 'bg-blue-400'
              }`}
            />
            <span className="text-white capitalize">{selectedAgent.status}</span>
          </div>
        </div>

        {selectedAgent.currentTask && (
          <div>
            <p className="text-sm text-white/60">Tarea Actual</p>
            <p className="text-white">{selectedAgent.currentTask}</p>
          </div>
        )}

        <div>
          <p className="text-sm text-white/60">Última Actividad</p>
          <p className="text-white text-sm">
            {new Date(selectedAgent.lastActivity).toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Botón volver a vista general */}
      <button
        onClick={() => {
          setZoomed(false);
          setTimeout(() => setSelectedAgent(null), 500);
        }}
        className="mt-6 w-full py-2 px-4 rounded-lg transition-all duration-300"
        style={{
          backgroundColor: `${selectedAgent.color}20`,
          borderColor: selectedAgent.color,
          border: '1px solid',
        }}
      >
        <span style={{ color: selectedAgent.color }}>Volver a la Corte</span>
      </button>
    </div>
  );
}
