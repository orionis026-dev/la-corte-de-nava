import { Court } from './components/Court';
import { AgentPanel } from './components/ui/AgentPanel';
import { TemplePyramidLanding } from './components/ui/TemplePyramidLanding';
import { useAgentPolling } from './hooks/useAgentPolling';
import { useAgentStore } from './store/agentStore';

function App() {
  // Polling de agentes cada 5 segundos
  useAgentPolling(5000);
  
  const { isZoomed } = useAgentStore();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-ptah-obsidian">
      {/* Canvas 3D */}
      <Court />

      {/* UI Overlays */}
      <AgentPanel />

      {/* Título de la Corte */}
      {!isZoomed && (
        <div className="fixed top-4 left-4 z-50">
          <h1 className="text-3xl font-bold text-nava-gold holographic-text">
            La Corte de Nava
          </h1>
          <p className="text-white/60 text-sm mt-1">
            Dashboard 3D - Egipto Futurista
          </p>
        </div>
      )}

      {!isZoomed && <TemplePyramidLanding />}

      {/* Instrucciones */}
      {!isZoomed && (
        <div className="fixed bottom-4 left-4 z-50 text-white/40 text-sm">
          <p>🖱️ Arrastra para rotar • 🖱️ Scroll para zoom • 👆 Click en entidades</p>
        </div>
      )}

      {/* Leyenda de agentes */}
      {!isZoomed && (
        <div className="fixed bottom-4 right-4 z-50 bg-ptah-obsidian/80 backdrop-blur-md p-4 rounded-lg border border-nava-gold/30">
          <h3 className="text-nava-gold text-sm font-semibold mb-2">Agentes</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FFD700]" />
              <span className="text-white">Nava (Centro)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#40E0D0]" />
              <span className="text-white">Seshat (Este)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B87333]" />
              <span className="text-white">Ptah (Sur)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FFBF00]" />
              <span className="text-white">Tavily (Oeste)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#50C878]" />
              <span className="text-white">jCodeMunch (Norte)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
