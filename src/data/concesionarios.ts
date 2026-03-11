export type MarcaConcesionario =
  | 'BMW'
  | 'Audi'
  | 'Porsche'
  | 'Mercedes-AMG'
  | 'Tesla'
  | 'Toyota'
  | 'Nissan'
  | 'Lexus';

export interface Concesionario {
  id: string;
  marca: MarcaConcesionario;
  nombre: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  web: string;
  lat: number;
  lng: number;
}

export const concesionarios: Concesionario[] = [
  {
    id: 'bmw-madrid',
    marca: 'BMW',
    nombre: 'BMW Madrid Centro',
    ciudad: 'Madrid',
    direccion: 'Calle de Alcalá, 120, Madrid',
    telefono: '+34 910 000 001',
    web: 'https://www.bmw.es',
    lat: 40.4367,
    lng: -3.6784,
  },
  {
    id: 'bmw-barcelona',
    marca: 'BMW',
    nombre: 'BMW Barcelona Premium',
    ciudad: 'Barcelona',
    direccion: 'Carrer de la Marina, 250, Barcelona',
    telefono: '+34 930 000 002',
    web: 'https://www.bmw.es',
    lat: 41.4042,
    lng: 2.1841,
  },
  {
    id: 'audi-madrid',
    marca: 'Audi',
    nombre: 'Audi Retail Madrid',
    ciudad: 'Madrid',
    direccion: 'Paseo de la Castellana, 278, Madrid',
    telefono: '+34 910 000 003',
    web: 'https://www.audi.es',
    lat: 40.4766,
    lng: -3.6863,
  },
  {
    id: 'audi-valencia',
    marca: 'Audi',
    nombre: 'Audi Valencia Selection',
    ciudad: 'Valencia',
    direccion: 'Avenida del Cid, 45, Valencia',
    telefono: '+34 960 000 004',
    web: 'https://www.audi.es',
    lat: 39.4692,
    lng: -0.3981,
  },
  {
    id: 'porsche-madrid',
    marca: 'Porsche',
    nombre: 'Centro Porsche Madrid Norte',
    ciudad: 'Madrid',
    direccion: 'Av. de Burgos, 87, Madrid',
    telefono: '+34 910 000 005',
    web: 'https://www.porsche.com/spain/',
    lat: 40.4923,
    lng: -3.6735,
  },
  {
    id: 'porsche-barcelona',
    marca: 'Porsche',
    nombre: 'Centro Porsche Barcelona',
    ciudad: 'Barcelona',
    direccion: 'Carrer de Numància, 99, Barcelona',
    telefono: '+34 930 000 006',
    web: 'https://www.porsche.com/spain/',
    lat: 41.3855,
    lng: 2.1374,
  },
  {
    id: 'mercedes-malaga',
    marca: 'Mercedes-AMG',
    nombre: 'Mercedes-AMG Málaga Performance',
    ciudad: 'Málaga',
    direccion: 'Av. de Velázquez, 210, Málaga',
    telefono: '+34 950 000 007',
    web: 'https://www.mercedes-benz.es',
    lat: 36.6927,
    lng: -4.4598,
  },
  {
    id: 'mercedes-sevilla',
    marca: 'Mercedes-AMG',
    nombre: 'Mercedes-AMG Sevilla',
    ciudad: 'Sevilla',
    direccion: 'Av. de Kansas City, 32, Sevilla',
    telefono: '+34 955 000 008',
    web: 'https://www.mercedes-benz.es',
    lat: 37.3926,
    lng: -5.9711,
  },
  {
    id: 'tesla-madrid',
    marca: 'Tesla',
    nombre: 'Tesla Store Madrid',
    ciudad: 'Madrid',
    direccion: 'Calle Serrano, 3, Madrid',
    telefono: '+34 910 000 009',
    web: 'https://www.tesla.com/es_es',
    lat: 40.4259,
    lng: -3.6877,
  },
  {
    id: 'tesla-barcelona',
    marca: 'Tesla',
    nombre: 'Tesla Store Barcelona',
    ciudad: 'Barcelona',
    direccion: 'Passeig de Gràcia, 55, Barcelona',
    telefono: '+34 930 000 010',
    web: 'https://www.tesla.com/es_es',
    lat: 41.3927,
    lng: 2.1649,
  },
  {
    id: 'toyota-bilbao',
    marca: 'Toyota',
    nombre: 'Toyota Bilbao Motor',
    ciudad: 'Bilbao',
    direccion: 'Gran Vía de Don Diego López de Haro, 60, Bilbao',
    telefono: '+34 944 000 011',
    web: 'https://www.toyota.es',
    lat: 43.2629,
    lng: -2.935,
  },
  {
    id: 'nissan-zaragoza',
    marca: 'Nissan',
    nombre: 'Nissan Zaragoza Drive',
    ciudad: 'Zaragoza',
    direccion: 'Paseo María Agustín, 15, Zaragoza',
    telefono: '+34 976 000 012',
    web: 'https://www.nissan.es',
    lat: 41.6523,
    lng: -0.8897,
  },
  {
    id: 'lexus-valencia',
    marca: 'Lexus',
    nombre: 'Lexus Valencia Select',
    ciudad: 'Valencia',
    direccion: 'Av. del Puerto, 120, Valencia',
    telefono: '+34 960 000 013',
    web: 'https://www.lexusauto.es',
    lat: 39.4617,
    lng: -0.3459,
  },
];