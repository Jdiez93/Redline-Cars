import { useEffect, useState } from "react";
import { cochesDestacados } from "../data/coches";

type RankingCar = {
  marca: string;
  modelo: string;
  potencia: number;
  imagen: string;
};

const rankingsPorMes: Record<number, RankingCar[]> = {
  0: [
    { marca: "Porsche", modelo: "911 GT3", potencia: 510, imagen: "https://imgs.search.brave.com/sTUdkFgAfblzdWLgtHK8gHO2zEOrWPtxYXSkAjKy7ds/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEzMjcx/OTc3LmpwZw" },
    { marca: "BMW", modelo: "M3 Competition", potencia: 510, imagen: "https://imgs.search.brave.com/dXAXHUVVp8KfebXssV0oYMVKv7tHFJbXv0HNLtxrICg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibXcu/c2NlbmU3LmNvbS9p/cy9pbWFnZS9CTVcv/ZzgwX2NvbXBldGl0/aW9uX2R5bmFtaWNz/X2ZiX2RlP3dpZD0z/ODQwJmhlaT0yMTYw" },
    { marca: "Audi", modelo: "RS6 Avant", potencia: 630, imagen: "https://imgs.search.brave.com/1duLj3wPmhY18fxBmXmjAw_hJ0c7mha9HnU9vOuKlg8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWRzLmF1ZGktbWVk/aWFjZW50ZXIuY29t/L3N5c3RlbS9wcm9k/dWN0aW9uL21lZGlh/Lzk4NDc5L2ltYWdl/cy83NWJiZWUzMmM1/MWQyMjkzNzJhMjM4/MDA0MWYyMjQxZDdl/ZGE2MWEyL0EyMTAy/ODhfd2ViXzI4ODAu/anBnPzE2OTg0NTcx/NzQ" }
  ],
  1: [
    { marca: "Tesla", modelo: "Model S Plaid", potencia: 1020, imagen: "https://imgs.search.brave.com/WR1JIPyXdIdDgXxSK1HORnvRN9OWKb7V7khpvkFLM0A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvNzc4/MDEyMy5qcGc" },
    { marca: "Porsche", modelo: "Taycan Turbo S", potencia: 761, imagen: "https://imgs.search.brave.com/BHquL8Q7Qdsr1h34HPvdRjI1OChxWIA-KLrTTtF9iQQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3VwZXJjYXJzLm5l/dC9ibG9nL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzA3LzIw/MjBfcG9yc2NoZV90/YXljYW5fdHVyYm9f/c180a180LUhELXNj/YWxlZC5qcGc" },
    { marca: "Audi", modelo: "e-tron GT", potencia: 646, imagen: "https://imgs.search.brave.com/1duLj3wPmhY18fxBmXmjAw_hJ0c7mha9HnU9vOuKlg8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWRzLmF1ZGktbWVk/aWFjZW50ZXIuY29t/L3N5c3RlbS9wcm9k/dWN0aW9uL21lZGlh/Lzk4NDc5L2ltYWdl/cy83NWJiZWUzMmM1/MWQyMjkzNzJhMjM4/MDA0MWYyMjQxZDdl/ZGE2MWEyL0EyMTAy/ODhfd2ViXzI4ODAu/anBnPzE2OTg0NTcx/NzQ" }
  ],
  2: [
    { marca: "Nissan", modelo: "GT-R", potencia: 570, imagen: "https://imgs.search.brave.com/y2Ym_FTS2iHbMJ159ZullxHQldsMpbx_rYaxgzpoTNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC9jLzYv/Ni8xNjU5NzIyLTE5/MjB4MTA4MC1kZXNr/dG9wLWZ1bGwtaGQt/bmlzc2FuLWd0LXIt/d2FsbHBhcGVyLmpw/Zw" },
    { marca: "Toyota", modelo: "GR Supra", potencia: 340, imagen: "https://imgs.search.brave.com/a58xWQtbLRCJvT18OMeJp1khPwqK46uEowCKpH3NTFc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGlhcmlvbW90b3Iu/Y29tL2ltYWdlbmVz/LzIwMjIvMDYvdG95/b3RhLWdyLXN1cHJh/LWNhbWJpby1tYW51/YWwtcHJ1ZWJhLTA4/LTYyOWQxODAwMTQw/YTIuanBnP2NsYXNz/PVhM" },
    { marca: "Mercedes", modelo: "AMG GT", potencia: 585, imagen: "https://imgs.search.brave.com/ZNljUEkj6bjnCiUR1TyT3ECMLd5x3JTHNGkjpYRp0ZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC9hLzMv/NC8xNjc2ODcyLTM4/NDB4MjE2MC1kZXNr/dG9wLTRrLW1lcmNl/ZGVzLWJlbnotYW1n/LWd0LXdhbGxwYXBl/ci1waG90by5qcGc" }
  ]
};

export default function RankingMensual() {
  const mes = new Date().getMonth();
  const ranking = rankingsPorMes[mes] || rankingsPorMes[0];

  const calcularTiempo = () => {
    const ahora = new Date();
    const siguienteMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 1);
    const diff = siguienteMes.getTime() - ahora.getTime();

    return {
      dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
      horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((diff / (1000 * 60)) % 60),
      segundos: Math.floor((diff / 1000) % 60)
    };
  };

  const [tiempo, setTiempo] = useState(calcularTiempo());

  useEffect(() => {
    const interval = setInterval(() => {
      setTiempo(calcularTiempo());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const first = ranking[0];
  const second = ranking[1];
  const third = ranking[2];

  return (
    <section className="space-y-10">

      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-red-400 font-semibold">
          Ranking Redline
        </p>

        <h2 className="text-3xl font-bold text-white">
          Top coches del mes
        </h2>

        <p className="text-sm text-slate-300 mt-2">
          Los coches más destacados del mes según prestaciones, popularidad y relevancia.
        </p>
      </div>

      {/* PODIO */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-6">

        {/* segundo */}
        <div className="order-2 md:order-1 w-full md:w-56">
          <div className="rounded-3xl overflow-hidden border border-slate-700 bg-neutral-950 hover:border-slate-400 transition">
            <img src={second.imagen} className="h-40 w-full object-cover"/>
            <div className="p-4 text-center">
              <p className="text-xs text-slate-400">🥈 2º puesto</p>
              <h3 className="text-white font-semibold">
                {second.marca} {second.modelo}
              </h3>
              <p className="text-xs text-slate-400">
                {second.potencia} CV
              </p>
            </div>
          </div>
        </div>

        {/* ganador */}
<div className="order-1 md:order-2 w-full md:w-72 scale-105 relative">

  {/* humo */}
  <div className="smoke-effect"></div>

  <div className="rounded-3xl overflow-hidden border border-yellow-500 bg-neutral-950 glow-racing winner-rush-in relative z-10">
    <img
      src={first.imagen}
      alt={`${first.marca} ${first.modelo}`}
      className="h-52 w-full object-cover"
    />

    <div className="p-5 text-center">
      <p className="text-sm text-yellow-400 font-semibold">
        🥇 Coche del mes
      </p>

      <h3 className="text-xl text-white font-bold">
        {first.marca} {first.modelo}
      </h3>

      <p className="text-sm text-slate-300">
        {first.potencia} CV
      </p>
    </div>
  </div>
</div>

        {/* tercero */}
        <div className="order-3 w-full md:w-56">
          <div className="rounded-3xl overflow-hidden border border-slate-700 bg-neutral-950 hover:border-amber-600 transition">
            <img src={third.imagen} className="h-40 w-full object-cover"/>
            <div className="p-4 text-center">
              <p className="text-xs text-slate-400">🥉 3º puesto</p>
              <h3 className="text-white font-semibold">
                {third.marca} {third.modelo}
              </h3>
              <p className="text-xs text-slate-400">
                {third.potencia} CV
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* contador */}
      <div className="text-center text-sm text-slate-400">
        Próximo ranking en{" "}
        <span className="text-red-400 font-semibold">
          {tiempo.dias}d {tiempo.horas}h {tiempo.minutos}m {tiempo.segundos}s
        </span>
      </div>

    </section>
  );
}