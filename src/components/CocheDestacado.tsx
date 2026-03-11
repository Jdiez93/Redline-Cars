import type { FC } from 'react';
import type { TipoCoche, EtiquetaAmbiental } from '../data/coches';

interface CocheDestacadoProps {
  nombre: string;
  marca: string;
  potencia: number;
  tipo: TipoCoche;
  precioDesde: number;
  imagen: string;
  etiquetaAmbiental: EtiquetaAmbiental;
  href?: string; // enlace opcional a la ficha del coche
}

const etiquetaStyles: Record<EtiquetaAmbiental, string> = {
  C: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  ECO: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  CERO: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
};

const CocheDestacado: FC<CocheDestacadoProps> = ({
  nombre,
  marca,
  potencia,
  tipo,
  precioDesde,
  imagen,
  etiquetaAmbiental,
  href,
}) => {
  const precioFormateado = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(precioDesde);

  const etiquetaClass = etiquetaStyles[etiquetaAmbiental];

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-neutral-950/90 shadow-lg transition hover:-translate-y-1 hover:border-red-500/70 hover:shadow-2xl"
    >
      {/* Borde glow en hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent group-hover:border-red-500/40 group-hover:shadow-[0_0_35px_rgba(248,113,113,0.35)] transition" />

      {/* Imagen */}
      <div className="relative h-40 w-full overflow-hidden sm:h-44">
        <img
          src={imagen}
          alt={`${marca} ${nombre}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Degradado inferior */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Badge potencia */}
        <div className="absolute left-3 bottom-2 flex items-center gap-1.5">
          <span className="rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-200">
            {potencia} CV
          </span>
          <span className="rounded-full bg-red-600/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white">
            {tipo}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="relative flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {/* Etiquetas ambientales y tipo */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[11px] uppercase tracking-[0.22em] text-slate-400">
              {marca}
            </p>
            <h2 className="truncate text-base font-semibold text-white sm:text-lg">
              {nombre}
            </h2>
          </div>

          <div
            className={
              'flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ' +
              etiquetaClass
            }
            title={`Etiqueta ambiental ${etiquetaAmbiental}`}
          >
            {etiquetaAmbiental}
          </div>
        </div>

        {/* Info secundaria */}
        <p className="text-[11px] text-slate-400">
          Enfocado a quien busca un equilibrio entre sensaciones, imagen y usabilidad en el día a día.
        </p>

        {/* Precio + botón */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="text-xs text-slate-300">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Desde
            </p>
            <p className="text-sm font-semibold text-red-400 sm:text-base">
              {precioFormateado}
            </p>
          </div>

          {href ? (
            <a
              href={href}
              className="inline-flex items-center gap-1 rounded-full border border-slate-600 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-100 transition group-hover:border-red-500 group-hover:text-red-300"
            >
              <span>Ver ficha</span>
              <span className="translate-y-[1px] transition group-hover:translate-x-0.5">
                ▸
              </span>
            </a>
          ) : (
            <span className="inline-flex items-center rounded-full border border-slate-800 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Próximamente ficha
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default CocheDestacado;
