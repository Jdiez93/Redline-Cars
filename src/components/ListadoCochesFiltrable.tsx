// src/components/ListadoCochesFiltrable.tsx
import type { FC, ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import CocheDestacado from './CocheDestacado';
import type { Coche, TipoCoche, EtiquetaAmbiental } from '../data/coches';

interface Props {
  coches: Coche[];
}

type FiltroTipo = 'Todos' | TipoCoche;
type FiltroEtiqueta = 'Todas' | EtiquetaAmbiental;

const tiposOrden: TipoCoche[] = ['Gasolina', 'Híbrido', 'Eléctrico', 'Diésel'];

const ListadoCochesFiltrable: FC<Props> = ({ coches }) => {
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('Todos');
  const [filtroEtiqueta, setFiltroEtiqueta] = useState<FiltroEtiqueta>('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [potenciaMin, setPotenciaMin] = useState<number | ''>('');
  const [precioMax, setPrecioMax] = useState<number | ''>('');

  const { potenciaGlobalMin, potenciaGlobalMax, precioGlobalMax } = useMemo(() => {
    const potencias = coches.map((c) => c.potencia);
    const precios = coches.map((c) => c.precioDesde);
    return {
      potenciaGlobalMin: Math.min(...potencias),
      potenciaGlobalMax: Math.max(...potencias),
      precioGlobalMax: Math.max(...precios),
    };
  }, [coches]);

  const handlePotenciaMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPotenciaMin(value === '' ? '' : Number(value));
  };

  const handlePrecioMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrecioMax(value === '' ? '' : Number(value));
  };

  const cochesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return coches.filter((coche) => {
      if (filtroTipo !== 'Todos' && coche.tipo !== filtroTipo) return false;
      if (filtroEtiqueta !== 'Todas' && coche.etiquetaAmbiental !== filtroEtiqueta) return false;

      if (texto) {
        const campo = `${coche.marca} ${coche.nombre}`.toLowerCase();
        if (!campo.includes(texto)) return false;
      }

      if (potenciaMin !== '' && coche.potencia < potenciaMin) return false;
      if (precioMax !== '' && coche.precioDesde > precioMax) return false;

      return true;
    });
  }, [coches, filtroTipo, filtroEtiqueta, busqueda, potenciaMin, precioMax]);

  const seccionesFiltradas = tiposOrden
    .map((tipo) => ({
      tipo,
      coches: cochesFiltrados.filter((c) => c.tipo === tipo),
    }))
    .filter((sec) => sec.coches.length > 0);

  const formatoPrecio = (valor: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(valor);

  return (
    <div className="space-y-8">
      {/* Filtros */}
      <div
        className="rounded-3xl border border-slate-700 bg-neutral-950/80 p-4 sm:p-5 md:p-6 space-y-4"
        data-animate
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          {/* Búsqueda */}
          <div className="w-full md:max-w-sm space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
              Buscar por marca o modelo
            </label>
            <div className="relative">
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Ej. M3, RS6, Model S..."
                className="w-full rounded-xl border border-slate-700 bg-neutral-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">
                {cochesFiltrados.length}/{coches.length}
              </span>
            </div>
          </div>

          {/* Tipo motor */}
          <div className="space-y-2 w-full md:w-auto">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
              Tipo de motor
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Todos', ...tiposOrden] as FiltroTipo[]).map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => setFiltroTipo(tipo)}
                  className={[
                    'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition',
                    filtroTipo === tipo
                      ? 'border-red-500 bg-red-600 text-white'
                      : 'border-slate-700 bg-neutral-950 text-slate-100 hover:border-red-500 hover:text-red-300',
                  ].join(' ')}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filtros secundarios */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Etiqueta ambiental */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
              Etiqueta ambiental
            </label>
            <select
              value={filtroEtiqueta}
              onChange={(e) => setFiltroEtiqueta(e.target.value as FiltroEtiqueta)}
              className="w-full rounded-xl border border-slate-700 bg-neutral-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            >
              <option value="Todas">Todas</option>
              <option value="C">C</option>
              <option value="ECO">ECO</option>
              <option value="CERO">CERO</option>
            </select>
          </div>

          {/* Potencia mínima */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
              Potencia mínima (CV)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={potenciaGlobalMin}
                max={potenciaGlobalMax}
                step={10}
                value={potenciaMin === '' ? potenciaGlobalMin : potenciaMin}
                onChange={handlePotenciaMinChange}
                className="flex-1"
              />
              <span className="w-16 text-right text-xs text-slate-200">
                {potenciaMin === '' ? potenciaGlobalMin : potenciaMin} CV
              </span>
            </div>
          </div>

          {/* Precio máximo */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
              Precio máximo
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={30000}
                max={precioGlobalMax}
                step={5000}
                value={precioMax === '' ? precioGlobalMax : precioMax}
                onChange={handlePrecioMaxChange}
                className="flex-1"
              />
              <span className="w-20 text-right text-xs text-slate-200">
                {formatoPrecio(precioMax === '' ? precioGlobalMax : precioMax)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultado vacío */}
      {seccionesFiltradas.length === 0 && (
        <p className="text-sm text-slate-400" data-animate>
          No hay coches que coincidan con los filtros actuales. Prueba a relajar algún criterio (por
          ejemplo, bajar la potencia mínima o subir el precio máximo).
        </p>
      )}

      {/* Secciones por tipo */}
      <div className="space-y-12 md:space-y-16">
        {seccionesFiltradas.map((seccion, seccionIndex) => (
          <section
            key={seccion.tipo}
            id={`tipo-${seccion.tipo.toLowerCase()}`}
            className="scroll-mt-24"
          >
            <div
              className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
              data-animate
              data-animate-delay={seccionIndex * 100}
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
                  {seccion.tipo}
                </p>
                <h2 className="text-xl font-semibold text-white md:text-2xl">
                  {seccion.tipo === 'Gasolina' && 'Deportivos y berlinas gasolina'}
                  {seccion.tipo === 'Diésel' && 'Diésel de altas prestaciones'}
                  {seccion.tipo === 'Eléctrico' && 'Deportivos eléctricos'}
                  {seccion.tipo === 'Híbrido' && 'Híbridos y PHEV deportivos'}
                </h2>
                <p className="text-sm text-slate-300 md:text-base">
                  {seccion.tipo === 'Gasolina' &&
                    'Los clásicos deportivos de combustión: sonido, carácter y respuestas instantáneas.'}
                  {seccion.tipo === 'Diésel' &&
                    'Perfectos para hacer muchos kilómetros sin renunciar a empuje y estabilidad.'}
                  {seccion.tipo === 'Eléctrico' &&
                    'Aceleración brutal desde parado, tecnología al máximo nivel y cero emisiones locales.'}
                  {seccion.tipo === 'Híbrido' &&
                    'Equilibrio entre eficiencia y prestaciones, con ventajas en consumo y etiqueta ambiental.'}
                </p>
              </div>

              <div className="text-right text-xs text-slate-400">
                <p>
                  {seccion.coches.length} modelo
                  {seccion.coches.length > 1 ? 's' : ''} en esta categoría
                </p>
              </div>
            </div>

                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {seccion.coches.map((coche, index) => (
                <div
                  key={coche.id}
                  data-animate
                  data-animate-delay={150 + index * 80}
                >
                  <CocheDestacado
                    nombre={coche.nombre}
                    marca={coche.marca}
                    potencia={coche.potencia}
                    tipo={coche.tipo}
                    precioDesde={coche.precioDesde}
                    imagen={coche.imagen}
                    etiquetaAmbiental={coche.etiquetaAmbiental}
                    href={`/coches/${coche.id}`}
                  />
                </div>
              ))}
            </div>

          </section>
        ))}
      </div>
    </div>
  );
};

export default ListadoCochesFiltrable;
