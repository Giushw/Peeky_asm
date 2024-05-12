export type CurrentUnit = 'm' | 'f' | 's';
type RequestType = 'City' | 'LatLon' | 'IP' | 'Zipcode';

interface Request {
  type: RequestType,
  query: string,
  language: 'en',
  unit: CurrentUnit
}

interface Location {
  name: string,
  country: string,
  region: string,
  lat: string,
  lon: string,
  timezone_id: string,
  localtime: string,
  localtime_epoch: number,
  utc_offset: string
}

interface Current {
  observation_time: string,
  temperature: number,
  weather_code: number,
  weather_icons: string[],
  weather_descriptions: string[],
  wind_speed: number,
  wind_degree: number,
  wind_dir: string,
  pressure: number,
  precip: number,
  humidity: number,
  cloudcover: number,
  feelslike: number,
  uv_index: number,
  visibility: number,
  is_day: string
}

export interface CurrentResponse {
  request: Request,
  location: Location,
  current: Current
}