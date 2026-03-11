// src/data/coches.ts
export type TipoCoche = 'Gasolina' | 'Diésel' | 'Eléctrico' | 'Híbrido';
export type EtiquetaAmbiental = 'C' | 'ECO' | 'CERO';

export type Traccion = 'RWD' | 'FWD' | 'AWD';

export interface Coche {
  id: string;
  nombre: string;
  marca: string;
  potencia: number;          // CV
  tipo: TipoCoche;
  precioDesde: number;       // €
  etiquetaAmbiental: EtiquetaAmbiental;
  pesoKg: number;            // kg
  ceroCien: number;          // 0–100 km/h en segundos
  traccion: Traccion;        // RWD / FWD / AWD
  consumo: number;           // l/100 km o kWh/100 km según tipo
  imagen: string;
}

export const cochesDestacados: Coche[] = [
  // GASOLINA
  {
    id: 'bmw-m3-competition',
    nombre: 'M3 Competition',
    marca: 'BMW',
    potencia: 510,
    tipo: 'Gasolina',
    precioDesde: 95000,
    etiquetaAmbiental: 'C',
    pesoKg: 1730,
    ceroCien: 3.9,
    traccion: 'RWD',
    consumo: 10.0,
    imagen: 'https://imgs.search.brave.com/dXAXHUVVp8KfebXssV0oYMVKv7tHFJbXv0HNLtxrICg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibXcu/c2NlbmU3LmNvbS9p/cy9pbWFnZS9CTVcv/ZzgwX2NvbXBldGl0/aW9uX2R5bmFtaWNz/X2ZiX2RlP3dpZD0z/ODQwJmhlaT0yMTYw',
  },
  {
    id: 'porsche-911-gt3',
    nombre: '911 GT3',
    marca: 'Porsche',
    potencia: 510,
    tipo: 'Gasolina',
    precioDesde: 190000,
    etiquetaAmbiental: 'C',
    pesoKg: 1435,
    ceroCien: 3.4,
    traccion: 'RWD',
    consumo: 12.0,
    imagen: 'https://imgs.search.brave.com/sTUdkFgAfblzdWLgtHK8gHO2zEOrWPtxYXSkAjKy7ds/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEzMjcx/OTc3LmpwZw',
  },
  {
    id: 'mercedes-amg-gt',
    nombre: 'AMG GT',
    marca: 'Mercedes-AMG',
    potencia: 585,
    tipo: 'Gasolina',
    precioDesde: 160000,
    etiquetaAmbiental: 'C',
    pesoKg: 1645,
    ceroCien: 3.8,
    traccion: 'RWD',
    consumo: 11.5,
    imagen: 'https://imgs.search.brave.com/ZNljUEkj6bjnCiUR1TyT3ECMLd5x3JTHNGkjpYRp0ZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC9hLzMv/NC8xNjc2ODcyLTM4/NDB4MjE2MC1kZXNr/dG9wLTRrLW1lcmNl/ZGVzLWJlbnotYW1n/LWd0LXdhbGxwYXBl/ci1waG90by5qcGc',
  },
  {
    id: 'nissan-gt-r',
    nombre: 'GT-R',
    marca: 'Nissan',
    potencia: 570,
    tipo: 'Gasolina',
    precioDesde: 120000,
    etiquetaAmbiental: 'C',
    pesoKg: 1750,
    ceroCien: 2.9,
    traccion: 'AWD',
    consumo: 11.8,
    imagen: 'https://imgs.search.brave.com/y2Ym_FTS2iHbMJ159ZullxHQldsMpbx_rYaxgzpoTNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC9jLzYv/Ni8xNjU5NzIyLTE5/MjB4MTA4MC1kZXNr/dG9wLWZ1bGwtaGQt/bmlzc2FuLWd0LXIt/d2FsbHBhcGVyLmpw/Zw',
  },
  {
    id: 'toyota-gr-supra',
    nombre: 'GR Supra',
    marca: 'Toyota',
    potencia: 340,
    tipo: 'Gasolina',
    precioDesde: 65000,
    etiquetaAmbiental: 'C',
    pesoKg: 1520,
    ceroCien: 4.3,
    traccion: 'RWD',
    consumo: 8.5,
    imagen: 'https://imgs.search.brave.com/a58xWQtbLRCJvT18OMeJp1khPwqK46uEowCKpH3NTFc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGlhcmlvbW90b3Iu/Y29tL2ltYWdlbmVz/LzIwMjIvMDYvdG95/b3RhLWdyLXN1cHJh/LWNhbWJpby1tYW51/YWwtcHJ1ZWJhLTA4/LTYyOWQxODAwMTQw/YTIuanBnP2NsYXNz/PVhM',
  },

  // HÍBRIDOS
  {
    id: 'audi-rs6-avant',
    nombre: 'RS6 Avant',
    marca: 'Audi',
    potencia: 630,
    tipo: 'Híbrido',
    precioDesde: 135000,
    etiquetaAmbiental: 'ECO',
    pesoKg: 2150,
    ceroCien: 3.6,
    traccion: 'AWD',
    consumo: 9.5,
    imagen: 'https://imgs.search.brave.com/f2Hdbirg3AhkzF1B83ss6ZnehhuA9B5fPhCY-Ey0nE4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy8yMDI2/LWF1ZGktcnM2LWF2/YW50LXBlcmZvcm1h/bmNlLTEzNC02OTJm/MWRjNmQwZWViLmpw/Zz9jcm9wPTAuODk4/eHc6MC43NTd4aDsw/LjA1MzN4dywwLjE1/NXhoJnJlc2l6ZT05/ODA6Kg',
  },
  {
    id: 'lexus-lc-500h',
    nombre: 'LC 500h',
    marca: 'Lexus',
    potencia: 359,
    tipo: 'Híbrido',
    precioDesde: 115000,
    etiquetaAmbiental: 'ECO',
    pesoKg: 1970,
    ceroCien: 5.0,
    traccion: 'RWD',
    consumo: 7.0,
    imagen: 'https://imgs.search.brave.com/wVSBXhGkhVbIVxGsY2eIoiJNc4Zdj4MkaTcxnWDDLfE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMxLmF1dG9jYXNp/b24uY29tL2FjdHVh/bGlkYWQvd3AtY29u/dGVudC91cGxvYWRz/LzIwMTkvMTIvUHJ1/ZWJhLWRlbC1MZXh1/cy1MQy01MDBoLTIw/MTktUnViJUMzJUE5/bi1GaWRhbGdvLTEx/LmpwZw',
  },
  {
    id: 'bmw-330e-msport',
    nombre: '330e M Sport',
    marca: 'BMW',
    potencia: 292,
    tipo: 'Híbrido',
    precioDesde: 55000,
    etiquetaAmbiental: 'ECO',
    pesoKg: 1825,
    ceroCien: 5.9,
    traccion: 'RWD',
    consumo: 4.0,
    imagen: 'https://imgs.search.brave.com/Yv1z1HMIUHwKpuJcSveXfHDs35kvGLAMsDrzj7Mhbjo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY2RuLmF1dG9j/YXIuY28udWsvc2l0/ZXMvYXV0b2Nhci5j/by51ay9maWxlcy9z/dHlsZXMvZ2FsbGVy/eV9zbGlkZS9wdWJs/aWMvYm13LTMzMGUt/cmV2aWV3LTIwMjQt/MDguanBnP2l0b2s9/ZHYwLVN5VXY',
  },

  // ELÉCTRICOS
  {
    id: 'tesla-model-s-plaid',
    nombre: 'Model S Plaid',
    marca: 'Tesla',
    potencia: 1020,
    tipo: 'Eléctrico',
    precioDesde: 130000,
    etiquetaAmbiental: 'CERO',
    pesoKg: 2162,
    ceroCien: 2.1,
    traccion: 'AWD',
    consumo: 20.0, // kWh/100 km
    imagen: 'https://imgs.search.brave.com/WR1JIPyXdIdDgXxSK1HORnvRN9OWKb7V7khpvkFLM0A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvNzc4/MDEyMy5qcGc',
  },
  {
    id: 'porsche-taycan-turbo-s',
    nombre: 'Taycan Turbo S',
    marca: 'Porsche',
    potencia: 761,
    tipo: 'Eléctrico',
    precioDesde: 190000,
    etiquetaAmbiental: 'CERO',
    pesoKg: 2295,
    ceroCien: 2.8,
    traccion: 'AWD',
    consumo: 21.0,
    imagen: 'https://imgs.search.brave.com/BHquL8Q7Qdsr1h34HPvdRjI1OChxWIA-KLrTTtF9iQQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3VwZXJjYXJzLm5l/dC9ibG9nL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzA3LzIw/MjBfcG9yc2NoZV90/YXljYW5fdHVyYm9f/c180a180LUhELXNj/YWxlZC5qcGc',
  },
  {
    id: 'audi-e-tron-gt',
    nombre: 'e-tron GT',
    marca: 'Audi',
    potencia: 646,
    tipo: 'Eléctrico',
    precioDesde: 130000,
    etiquetaAmbiental: 'CERO',
    pesoKg: 2350,
    ceroCien: 3.3,
    traccion: 'AWD',
    consumo: 22.5,
    imagen: 'https://imgs.search.brave.com/1duLj3wPmhY18fxBmXmjAw_hJ0c7mha9HnU9vOuKlg8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWRzLmF1ZGktbWVk/aWFjZW50ZXIuY29t/L3N5c3RlbS9wcm9k/dWN0aW9uL21lZGlh/Lzk4NDc5L2ltYWdl/cy83NWJiZWUzMmM1/MWQyMjkzNzJhMjM4/MDA0MWYyMjQxZDdl/ZGE2MWEyL0EyMTAy/ODhfd2ViXzI4ODAu/anBnPzE2OTg0NTcx/NzQ',
  },

  // DIÉSEL
  {
    id: 'bmw-m340d-xdrive',
    nombre: 'M340d xDrive',
    marca: 'BMW',
    potencia: 340,
    tipo: 'Diésel',
    precioDesde: 70000,
    etiquetaAmbiental: 'C',
    pesoKg: 1820,
    ceroCien: 4.6,
    traccion: 'AWD',
    consumo: 6.0,
    imagen: 'https://imgs.search.brave.com/xRVYjmb-OhqZgtWgSrqKzR7ANKuXRU7P4Mr0rHYlk1c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aW1hZ2VzLm1vdG9y/LmVzL2ltYWdlL3Mv/MTMyMHcvZ2FsZXJp/YXMvY29jaGVzLW51/ZXZvcy9ibXctbTM0/MGQtdG91cmluZy14/ZHJpdmUvYm13LW0z/NDBkLXRvdXJpbmct/eGRyaXZlLTM5MTUy/LTE2OTE1MTI4OThf/Mi5qcGc',
  },
  {
    id: 'audi-s4-tdi',
    nombre: 'S4 TDI',
    marca: 'Audi',
    potencia: 347,
    tipo: 'Diésel',
    precioDesde: 72000,
    etiquetaAmbiental: 'C',
    pesoKg: 1805,
    ceroCien: 4.8,
    traccion: 'AWD',
    consumo: 6.3,
    imagen: 'https://imgs.search.brave.com/DEEqDW2pajTtGmN9MTx1oJlA1dwQM6F-bLsDtu8nAN4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a203Ny5jb20vbWVk/aWEvZm90b3MvYXVk/aV9hNF8yMDIwX3M0/X3RkaV83MjM5XzEu/anBn',
  },
];
