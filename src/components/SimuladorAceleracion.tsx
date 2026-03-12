import { useEffect, useMemo, useRef, useState } from "react";
import type { Coche } from "../data/coches";

interface Props {
  coches: Coche[];
}

type EstadoSimulacion = "idle" | "countdown" | "running" | "finished";

const COUNTDOWN_START = 3;
const DISTANCIA_META = 100;

function getTiempoInterpolado(elapsedMs: number, ceroCien: number) {
  const totalMs = ceroCien * 1000;
  const progreso = Math.min(elapsedMs / totalMs, 1);
  const eased = 1 - Math.pow(1 - progreso, 2.2);
  return eased * DISTANCIA_META;
}

export default function SimuladorAceleracion({ coches }: Props) {
  const idsIniciales = useMemo(
    () => [coches[0]?.id ?? "", coches[1]?.id ?? ""],
    [coches]
  );

  const [cocheAId, setCocheAId] = useState(idsIniciales[0]);
  const [cocheBId, setCocheBId] = useState(idsIniciales[1]);
  const [estado, setEstado] = useState<EstadoSimulacion>("idle");
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const [progresoA, setProgresoA] = useState(0);
  const [progresoB, setProgresoB] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [ganador, setGanador] = useState<"A" | "B" | "Empate" | null>(null);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const cocheA = coches.find((c) => c.id === cocheAId) ?? null;
  const cocheB = coches.find((c) => c.id === cocheBId) ?? null;

  const puedeSimular =
    cocheA !== null &&
    cocheB !== null &&
    cocheA.id !== cocheB.id;

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const resetSimulacion = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    startTimeRef.current = null;
    setEstado("idle");
    setCountdown(COUNTDOWN_START);
    setProgresoA(0);
    setProgresoB(0);
    setElapsed(0);
    setGanador(null);
  };

  const iniciarCarrera = () => {
    if (!puedeSimular || !cocheA || !cocheB) return;

    resetSimulacion();
    setEstado("countdown");

    let current = COUNTDOWN_START;

    const interval = window.setInterval(() => {
      current -= 1;

      if (current > 0) {
        setCountdown(current);
        return;
      }

      window.clearInterval(interval);
      setCountdown(0);
      setEstado("running");

      const loop = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const elapsedMs = timestamp - startTimeRef.current;
        setElapsed(elapsedMs);

        const nextA = getTiempoInterpolado(elapsedMs, cocheA.ceroCien);
        const nextB = getTiempoInterpolado(elapsedMs, cocheB.ceroCien);

        setProgresoA(nextA);
        setProgresoB(nextB);

        const aTerminado = nextA >= DISTANCIA_META;
        const bTerminado = nextB >= DISTANCIA_META;

        if (aTerminado || bTerminado) {
          const finalA = Math.min(nextA, DISTANCIA_META);
          const finalB = Math.min(nextB, DISTANCIA_META);

          setProgresoA(finalA);
          setProgresoB(finalB);
          setEstado("finished");

          if (cocheA.ceroCien < cocheB.ceroCien) setGanador("A");
          else if (cocheB.ceroCien < cocheA.ceroCien) setGanador("B");
          else setGanador("Empate");

          return;
        }

        rafRef.current = requestAnimationFrame(loop);
      };

      rafRef.current = requestAnimationFrame(loop);
    }, 1000);
  };

  const porcentajeA = `${progresoA}%`;
  const porcentajeB = `${progresoB}%`;

  const diferenciaTiempo =
    cocheA && cocheB
      ? Math.abs(cocheA.ceroCien - cocheB.ceroCien).toFixed(1)
      : null;

  const metaAnimada =
    estado === "finished"
      ? "shadow-[0_0_20px_rgba(255,255,255,0.45)]"
      : "";

  const glowAnimado =
    estado === "finished"
      ? "animate-pulse"
      : "";

  return (
    <div className="space-y-6">
      {/* Selector coches */}
      <div className="grid gap-4 lg:grid-cols-2">
        {[cocheA, cocheB].map((coche, index) => {
          const setId = index === 0 ? setCocheAId : setCocheBId;
          const id = index === 0 ? cocheAId : cocheBId;

          return (
            <div
              key={index}
              className="rounded-3xl border border-slate-800 bg-black/40 p-5"
            >
              <label className="text-xs font-semibold uppercase tracking-[0.22em] text-red-400">
                Coche {index + 1}
              </label>

              <select
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  resetSimulacion();
                }}
                className="mt-3 w-full rounded-xl border border-slate-700 bg-neutral-950 px-3 py-2 text-sm text-white"
              >
                {coches.map((coche) => (
                  <option key={coche.id} value={coche.id}>
                    {coche.marca} {coche.nombre}
                  </option>
                ))}
              </select>

              {coche && (
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={coche.imagen}
                    alt={`${coche.marca} ${coche.nombre}`}
                    className="h-20 w-28 rounded-xl object-cover"
                  />

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {coche.marca} {coche.nombre}
                    </p>
                    <p className="text-xs text-slate-400">
                      {coche.potencia} CV · {coche.ceroCien}s
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          onClick={iniciarCarrera}
          disabled={!puedeSimular}
          className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500 disabled:opacity-50"
        >
          Iniciar simulación
        </button>

        <button
          onClick={resetSimulacion}
          className="rounded-full border border-slate-700 px-6 py-3 text-white transition hover:border-red-500 hover:text-red-300"
        >
          Reiniciar
        </button>
      </div>

      {/* PISTA */}
      <div className="rounded-3xl border border-red-600/50 bg-black">
        <div className="flex items-center justify-between border-b border-red-600/40 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-red-400">
              Pista de aceleración
            </p>
            <h2 className="text-xl font-semibold text-white">
              Simulación visual 0-100 km/h
            </h2>
          </div>

          {/* SEMAFORO */}
          <div className="flex gap-2 rounded-full border border-slate-800 bg-black/60 px-4 py-2">
            {[1, 2, 3].map((n) => {
              const activa =
                estado === "countdown" &&
                countdown <= COUNTDOWN_START - n + 1;

              const verde =
                estado === "running" || estado === "finished";

              return (
                <span
                  key={n}
                  className={[
                    "h-4 w-4 rounded-full transition",
                    verde
                      ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]"
                      : activa
                        ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                        : "bg-slate-700",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>

        {/* CARRILES */}
        <div className="space-y-6 p-6">
          {[
            { coche: cocheA, pos: porcentajeA },
            { coche: cocheB, pos: porcentajeB },
          ].map((lane, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-red-600/50 bg-neutral-900 p-4"
            >
              {/* Piano lateral */}
              <div className="absolute inset-y-0 left-0 w-3 rounded-l-xl bg-[repeating-linear-gradient(to_bottom,#ef4444_0_16px,#ffffff_16px_32px)]" />
              <div className="absolute inset-y-0 right-0 w-3 rounded-r-xl bg-[repeating-linear-gradient(to_bottom,#ef4444_0_16px,#ffffff_16px_32px)]" />

              <div className="mb-3 pl-4 text-sm font-semibold text-white">
                {lane.coche
                  ? `${lane.coche.marca} ${lane.coche.nombre}`
                  : "Sin coche"}
              </div>

              <div className="relative h-16 overflow-hidden rounded-lg bg-neutral-950">
                {/* Línea de meta */}
                <div
                  className={[
                    "absolute inset-y-0 right-3 z-10 w-4 rounded-sm border border-white/20 bg-[repeating-linear-gradient(to_bottom,#ffffff_0_10px,#111111_10px_20px)] transition-all duration-500",
                    metaAnimada,
                    glowAnimado,
                  ].join(" ")}
                />

                {/* Destello de meta al terminar */}
                {estado === "finished" && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-20 bg-gradient-to-l from-white/15 via-white/5 to-transparent animate-pulse" />
                )}

                <div
                  className="absolute top-1/2 z-20 -translate-y-1/2 transition-[left] duration-75"
                  style={{ left: `calc(${lane.pos} - 32px)` }}
                >
                  <img
                    src={lane.coche?.imagen}
                    alt={
                      lane.coche
                        ? `${lane.coche.marca} ${lane.coche.nombre}`
                        : "Coche"
                    }
                    className="h-10 w-16 rounded object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RESULTADO */}
        <div className="border-t border-red-600/40 p-6 text-center">
          {estado === "idle" && (
            <p className="text-slate-300">
              Selecciona dos coches y pulsa iniciar.
            </p>
          )}

          {estado === "countdown" && (
            <p className="text-white font-semibold">
              Salida en {countdown}...
            </p>
          )}

          {estado === "running" && (
            <p className="font-semibold text-white">
              {(elapsed / 1000).toFixed(2)} s
            </p>
          )}

          {estado === "finished" && (
            <div className="space-y-2">
              {ganador === "A" && cocheA && (
                <p className="text-lg font-semibold text-white">
                  🏆 Gana {cocheA.marca} {cocheA.nombre}
                </p>
              )}

              {ganador === "B" && cocheB && (
                <p className="text-lg font-semibold text-white">
                  🏆 Gana {cocheB.marca} {cocheB.nombre}
                </p>
              )}

              {ganador === "Empate" && (
                <p className="text-lg font-semibold text-white">
                  🤝 Empate técnico
                </p>
              )}

              {diferenciaTiempo && (
                <p className="text-sm text-slate-400">
                  Diferencia: {diferenciaTiempo}s
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}