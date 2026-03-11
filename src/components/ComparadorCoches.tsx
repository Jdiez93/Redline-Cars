// src/components/ComparadorCoches.tsx
import type { FC, ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import type { Coche, TipoCoche } from '../data/coches';

interface ComparadorCochesProps {
  coches: Coche[];
}

const MAX_COLS = 3;
type FiltroTipo = 'Todos' | TipoCoche;

const ComparadorCoches: FC<ComparadorCochesProps> = ({ coches }) => {
  const idsIniciales = useMemo(
    () => coches.slice(0, MAX_COLS).map((coche) => coche.id),
    [coches]
  );

  const [seleccion, setSeleccion] = useState<string[]>(idsIniciales);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('Todos');

  const handleSelectorChange =
    (index: number) => (event: ChangeEvent<HTMLSelectElement>) => {
      const nuevoId = event.target.value;
      setSeleccion((prev) => {
        const copia = [...prev];
        copia[index] = nuevoId;
        return copia;
      });
    };

  const handleLimpiarSlot = (index: number) => {
    setSeleccion((prev) => {
      const copia = [...prev];
      copia[index] = '';
      return copia;
    });
  };

  const handleLimpiarTodo = () => {
    setSeleccion(['', '', '']);
  };

  const cochesFiltrados = useMemo(() => {
    const texto = filtroTexto.trim().toLowerCase();
    return coches.filter((coche) => {
      const coincideTexto =
        !texto ||
        coche.marca.toLowerCase().includes(texto) ||
        coche.nombre.toLowerCase().includes(texto);
      const coincideTipo =
        filtroTipo === 'Todos' ? true : coche.tipo === filtroTipo;
      return coincideTexto && coincideTipo;
    });
  }, [coches, filtroTexto, filtroTipo]);

  const cochesSeleccionados = seleccion.map((id) =>
    coches.find((coche) => coche.id === id) ?? null
  );

  const seleccionNoNula = cochesSeleccionados.filter(
    (coche): coche is Coche => coche !== null
  );

  const maxPotencia =
    seleccionNoNula.length > 0
      ? Math.max(...seleccionNoNula.map((c) => c.potencia))
      : null;

  const minPrecio =
    seleccionNoNula.length > 0
      ? Math.min(...seleccionNoNula.map((c) => c.precioDesde))
      : null;

  const minCeroCien =
    seleccionNoNula.length > 0
      ? Math.min(...seleccionNoNula.map((c) => c.ceroCien))
      : null;

  const minConsumo =
    seleccionNoNula.length > 0
      ? Math.min(...seleccionNoNula.map((c) => c.consumo))
      : null;

  const formatoPrecio = (precio: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(precio);

  const tipos: FiltroTipo[] = ['Todos', 'Gasolina', 'Híbrido', 'Eléctrico', 'Diésel'];

  const formatoConsumo = (coche: Coche) => {
    const unidad = coche.tipo === 'Eléctrico' ? 'kWh/100 km' : 'l/100 km';
    return `${coche.consumo.toFixed(1)} ${unidad}`;
  };

  return (
    <div className="space-y-7">
      {/* Filtros superiores */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2 w-full md:max-w-sm">
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
            Buscar modelo o marca
          </label>
          <div className="relative">
            <input
              type="text"
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
              placeholder="Ej. M3, RS6, Model S..."
              className="w-full rounded-xl border border-slate-700 bg-neutral-950/80 px-3 py-2 text-sm text-slate-100 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              {cochesFiltrados.length}/{coches.length}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            El buscador afecta a las listas desplegables de cada columna.
          </p>
        </div>

        <div className="space-y-2 w-full md:w-auto">
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
            Filtrar por tipo de motor
          </label>
          <div className="flex flex-wrap gap-2">
            {tipos.map((tipo) => (
              <button
                key={tipo}
                type="button"
                onClick={() => setFiltroTipo(tipo)}
                className={[
                  'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition',
                  filtroTipo === tipo
                    ? 'border-red-500 bg-red-600 text-white'
                    : 'border-slate-700 bg-neutral-950/80 text-slate-100 hover:border-red-500 hover:text-red-300',
                ].join(' ')}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selectores de columnas */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: MAX_COLS }).map((_, index) => {
          const cocheSeleccionado = cochesSeleccionados[index];
          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-700 bg-neutral-950/80 p-4 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Columna {index + 1}
                  </p>
                  <p className="text-xs text-slate-300">
                    {cocheSeleccionado
                      ? `${cocheSeleccionado.marca} ${cocheSeleccionado.nombre}`
                      : 'Sin selección'}
                  </p>
                </div>
                {cocheSeleccionado && (
                  <button
                    type="button"
                    onClick={() => handleLimpiarSlot(index)}
                    className="rounded-full border border-slate-600 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-200 hover:border-red-500 hover:text-red-300"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              <select
                value={seleccion[index] ?? ''}
                onChange={handleSelectorChange(index)}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-neutral-950/80 px-3 py-2 text-sm text-slate-100 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              >
                <option value="">Selecciona un modelo</option>
                {cochesFiltrados.map((coche) => {
                  const yaSeleccionado =
                    seleccion.includes(coche.id) && seleccion[index] !== coche.id;
                  return (
                    <option key={coche.id} value={coche.id} disabled={yaSeleccionado}>
                      {coche.marca} {coche.nombre} · {coche.potencia} CV
                    </option>
                  );
                })}
              </select>

              <p className="text-[11px] text-slate-500">
                No puedes repetir el mismo modelo en varias columnas.
              </p>
            </div>
          );
        })}
      </div>

      {/* Resumen rápido */}
      <div className="grid gap-4 md:grid-cols-3">
        {cochesSeleccionados.map((coche, index) => {
          if (!coche) {
            return (
              <div
                key={index}
                className="rounded-2xl border border-dashed border-slate-700 bg-neutral-950/40 p-4 text-sm text-slate-400"
              >
                Elige un modelo en la parte superior para empezar a compararlo.
              </div>
            );
          }

          const esMasPotente =
            maxPotencia !== null &&
            coche.potencia === maxPotencia &&
            seleccionNoNula.length > 1;

          const esMasBarato =
            minPrecio !== null &&
            coche.precioDesde === minPrecio &&
            seleccionNoNula.length > 1;

          const esMasRapido =
            minCeroCien !== null &&
            coche.ceroCien === minCeroCien &&
            seleccionNoNula.length > 1;

          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-700 bg-neutral-950/80 p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] text-slate-400">{coche.marca}</p>
                  <h3 className="text-base font-semibold text-white">
                    {coche.nombre}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {coche.potencia} CV · {coche.tipo}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {coche.ceroCien.toFixed(1)} s 0–100 km/h · {coche.traccion}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {esMasPotente && (
                    <span className="rounded-full bg-red-600/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-300">
                      Más potente
                    </span>
                  )}
                  {esMasBarato && (
                    <span className="rounded-full bg-emerald-600/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                      Más económico
                    </span>
                  )}
                  {esMasRapido && (
                    <span className="rounded-full bg-sky-600/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-300">
                      0–100 más rápido
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-200">
                Desde{' '}
                <span className="font-semibold text-red-400">
                  {formatoPrecio(coche.precioDesde)}
                </span>
              </p>
              <p className="text-[11px] text-slate-400">
                Consumo mixto aprox.: {formatoConsumo(coche)} · Etiqueta{' '}
                <span className="font-semibold text-slate-200">
                  {coche.etiquetaAmbiental}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Botón limpiar todo */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleLimpiarTodo}
          className="rounded-full border border-slate-700 bg-neutral-950/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-200 hover:border-red-500 hover:text-red-300"
        >
          Limpiar comparador
        </button>
      </div>

      {/* Tabla comparación */}
      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-neutral-950/90">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-black/60">
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Especificación
              </th>
              {cochesSeleccionados.map((coche, index) => (
                <th
                  key={index}
                  className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                >
                  {coche ? (
                    <>
                      <span className="block text-[11px] text-slate-500">
                        {coche.marca}
                      </span>
                      <span className="text-slate-100">{coche.nombre}</span>
                    </>
                  ) : (
                    <span className="text-slate-600">Sin selección</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Tipo motor */}
            <tr className="border-b border-slate-800/70">
              <td className="px-3 py-3 align-top text-xs text-slate-400">Tipo de motor</td>
              {cochesSeleccionados.map((coche, index) => (
                <td key={index} className="px-3 py-3 align-top text-sm text-slate-100">
                  {coche ? coche.tipo : '—'}
                </td>
              ))}
            </tr>

            {/* Potencia */}
            <tr className="border-b border-slate-800/70">
              <td className="px-3 py-3 align-top text-xs text-slate-400">Potencia</td>
              {cochesSeleccionados.map((coche, index) => {
                const esMax =
                  coche &&
                  maxPotencia !== null &&
                  coche.potencia === maxPotencia &&
                  seleccionNoNula.length > 1;
                return (
                  <td
                    key={index}
                    className={[
                      'px-3 py-3 align-top text-sm',
                      coche ? 'text-slate-100' : 'text-slate-500',
                    ].join(' ')}
                  >
                    {coche ? (
                      <span className={esMax ? 'font-semibold text-red-300' : ''}>
                        {coche.potencia} CV
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 0–100 */}
            <tr className="border-b border-slate-800/70">
              <td className="px-3 py-3 align-top text-xs text-slate-400">0–100 km/h</td>
              {cochesSeleccionados.map((coche, index) => {
                const esMin =
                  coche &&
                  minCeroCien !== null &&
                  coche.ceroCien === minCeroCien &&
                  seleccionNoNula.length > 1;
                return (
                  <td
                    key={index}
                    className={[
                      'px-3 py-3 align-top text-sm',
                      coche ? 'text-slate-100' : 'text-slate-500',
                    ].join(' ')}
                  >
                    {coche ? (
                      <span className={esMin ? 'font-semibold text-sky-300' : ''}>
                        {coche.ceroCien.toFixed(1)} s
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Peso */}
            <tr className="border-b border-slate-800/70">
              <td className="px-3 py-3 align-top text-xs text-slate-400">Peso</td>
              {cochesSeleccionados.map((coche, index) => (
                <td
                  key={index}
                  className="px-3 py-3 align-top text-sm text-slate-100"
                >
                  {coche ? `${coche.pesoKg.toLocaleString('es-ES')} kg` : '—'}
                </td>
              ))}
            </tr>

            {/* Tracción */}
            <tr className="border-b border-slate-800/70">
              <td className="px-3 py-3 align-top text-xs text-slate-400">Tipo de tracción</td>
              {cochesSeleccionados.map((coche, index) => (
                <td
                  key={index}
                  className="px-3 py-3 align-top text-sm text-slate-100"
                >
                  {coche ? coche.traccion : '—'}
                </td>
              ))}
            </tr>

            {/* Consumo */}
            <tr className="border-b border-slate-800/70">
              <td className="px-3 py-3 align-top text-xs text-slate-400">Consumo mixto aprox.</td>
              {cochesSeleccionados.map((coche, index) => {
                const esMin =
                  coche &&
                  minConsumo !== null &&
                  coche.consumo === minConsumo &&
                  seleccionNoNula.length > 1;
                return (
                  <td
                    key={index}
                    className={[
                      'px-3 py-3 align-top text-sm',
                      coche ? 'text-slate-100' : 'text-slate-500',
                    ].join(' ')}
                  >
                    {coche ? (
                      <span className={esMin ? 'font-semibold text-emerald-300' : ''}>
                        {formatoConsumo(coche)}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Etiqueta ambiental */}
            <tr className="border-b border-slate-800/70">
              <td className="px-3 py-3 align-top text-xs text-slate-400">
                Etiqueta ambiental
              </td>
              {cochesSeleccionados.map((coche, index) => (
                <td
                  key={index}
                  className="px-3 py-3 align-top text-sm text-slate-100"
                >
                  {coche ? coche.etiquetaAmbiental : '—'}
                </td>
              ))}
            </tr>

            {/* Comentario rápido */}
            <tr>
              <td className="px-3 py-3 align-top text-xs text-slate-400">
                Comentario rápido
              </td>
              {cochesSeleccionados.map((coche, index) => (
                <td
                  key={index}
                  className="px-3 py-3 align-top text-xs text-slate-300 leading-snug"
                >
                  {coche
                    ? 'Resumen orientativo: modelo pensado para quien valora prestaciones, imagen y un uso razonable en el día a día.'
                    : 'Selecciona un modelo para ver un resumen.'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-slate-500">
        Los datos mostrados son orientativos y pueden variar según mercado y configuración. Úsalos
        como referencia rápida antes de profundizar en cada modelo.
      </p>
    </div>
  );
};

export default ComparadorCoches;
