import { useEffect } from 'react';
import { useAgentStore } from '../store/agentStore';

export function useAgentPolling(intervalMs = 5000) {
  const { agents, updateAgentStatus } = useAgentStore();

  useEffect(() => {
    const interval = setInterval(() => {
      // Simular actualización de estado - aquí conectaríamos con datos reales
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      if (randomAgent && Math.random() > 0.7) {
        const statuses = ['idle', 'working', 'completed'] as const;
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const tasks = [
          'Procesando solicitud...',
          'Indexando archivos...',
          'Buscando información...',
          'Generando documentación...',
          'Compilando código...',
        ];
        const randomTask = randomStatus === 'working' 
          ? tasks[Math.floor(Math.random() * tasks.length)]
          : undefined;
        
        updateAgentStatus(randomAgent.id, randomStatus, randomTask);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [agents, intervalMs, updateAgentStatus]);
}
