import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Concesionario = {
  id: number;
  nombre: string;
  marca: string;
  lat: number;
  lon: number;
  direccion: string;
};

const marcas = [
  "Todas",
  "BMW",
  "Audi",
  "Porsche",
  "Mercedes",
  "Tesla",
  "Toyota",
  "Nissan",
  "Lexus",
];

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapaConcesionarios() {
  const [concesionarios, setConcesionarios] = useState<Concesionario[]>([]);
  const [marcaFiltro, setMarcaFiltro] = useState("Todas");
  const [miUbicacion, setMiUbicacion] = useState<[number, number] | null>(null);

  useEffect(() => {
    const cargar = async () => {
      const query = `
      [out:json];
      area["name"="España"]->.searchArea;

      (
        node["shop"="car"]["brand"~"BMW|Audi|Porsche|Mercedes|Tesla|Toyota|Nissan|Lexus"](area.searchArea);
        way["shop"="car"]["brand"~"BMW|Audi|Porsche|Mercedes|Tesla|Toyota|Nissan|Lexus"](area.searchArea);
      );

      out center;
      `;

      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      const data = await res.json();

      const lista = data.elements
        .map((item: any) => ({
          id: item.id,
          nombre: item.tags?.name || "Concesionario",
          marca: item.tags?.brand || "Marca",
          lat: item.lat || item.center?.lat,
          lon: item.lon || item.center?.lon,
          direccion:
            item.tags?.["addr:street"] ||
            item.tags?.["addr:city"] ||
            "Dirección no disponible",
        }))
        .filter((c: Concesionario) => c.lat && c.lon);

      setConcesionarios(lista);
    };

    cargar();
  }, []);

  const concesionariosFiltrados =
    marcaFiltro === "Todas"
      ? concesionarios
      : concesionarios.filter((c) =>
          c.marca.toLowerCase().includes(marcaFiltro.toLowerCase())
        );

  const usarMiUbicacion = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setMiUbicacion([pos.coords.latitude, pos.coords.longitude]);
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      {/* FILTROS */}
      <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700 space-y-4">

        <h2 className="text-lg font-semibold text-white">
          Buscar concesionarios
        </h2>

        <div>
          <label className="text-sm text-gray-300">Marca</label>
          <select
            value={marcaFiltro}
            onChange={(e) => setMarcaFiltro(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-black border border-gray-700"
          >
            {marcas.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <button
          onClick={usarMiUbicacion}
          className="w-full bg-red-600 hover:bg-red-500 p-2 rounded text-white font-semibold"
        >
          Usar mi ubicación
        </button>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {concesionariosFiltrados.slice(0, 20).map((c) => (
            <div
              key={c.id}
              className="p-3 border border-neutral-700 rounded-lg bg-black"
            >
              <p className="font-semibold text-white">{c.nombre}</p>
              <p className="text-xs text-gray-400">{c.marca}</p>
              <p className="text-xs text-gray-400">{c.direccion}</p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lon}`}
                target="_blank"
                className="text-red-400 text-xs"
              >
                Abrir en Google Maps
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* MAPA */}
      <div className="lg:col-span-2 h-[650px] rounded-xl overflow-hidden border border-neutral-700">
        <MapContainer
          center={[40.4168, -3.7038]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {concesionariosFiltrados.map((c) => (
            <Marker key={c.id} position={[c.lat, c.lon]} icon={icon}>
              <Popup>
                <strong>{c.nombre}</strong>
                <br />
                {c.marca}
                <br />
                {c.direccion}
                <br />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lon}`}
                  target="_blank"
                >
                  Ver en Google Maps
                </a>
              </Popup>
            </Marker>
          ))}

          {miUbicacion && (
            <Marker position={miUbicacion}>
              <Popup>Tu ubicación</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}