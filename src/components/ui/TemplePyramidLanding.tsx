export function TemplePyramidLanding() {
  return (
    <section className="fixed top-4 right-4 z-50 w-[min(92vw,420px)] rounded-xl border border-nava-gold/40 bg-ptah-obsidian/85 p-4 backdrop-blur-md">
      <h2 className="text-lg font-bold text-nava-gold">Templo de Nava</h2>
      <p className="mt-1 text-xs text-white/70">
        Piramide de funciones para orquestar trabajo, construccion y memoria.
      </p>

      <div className="mt-4 space-y-3">
        <div className="rounded-lg border border-[#FFD700]/45 bg-[#FFD700]/10 p-3">
          <p className="text-[11px] uppercase tracking-wide text-[#FFE888]">Cima</p>
          <h3 className="text-sm font-semibold text-white">Nava · Orquestadora</h3>
          <p className="mt-1 text-xs text-white/75">
            Habla con cliente, define plan, aprueba tareas, monitorea checkpoints y decide cuando activar a Seshat.
          </p>
        </div>

        <div className="rounded-lg border border-[#B87333]/50 bg-[#B87333]/10 p-3">
          <p className="text-[11px] uppercase tracking-wide text-[#D6A172]">Nivel de ejecucion</p>
          <h3 className="text-sm font-semibold text-white">Ptah · Master Builder</h3>
          <p className="mt-1 text-xs text-white/75">
            Solo construye: codigo, pruebas, refactor y docs. Trabaja desde task packets de Nava.
          </p>
        </div>

        <div className="rounded-lg border border-[#40E0D0]/50 bg-[#40E0D0]/10 p-3">
          <p className="text-[11px] uppercase tracking-wide text-[#7EF1E6]">Base de memoria</p>
          <h3 className="text-sm font-semibold text-white">Seshat · Scribe</h3>
          <p className="mt-1 text-xs text-white/75">
            Registra arquitectura y cambios en memoria historica. Mantiene la evolucion del proyecto trazable.
          </p>
        </div>
      </div>
    </section>
  );
}
