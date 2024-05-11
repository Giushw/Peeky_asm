interface Request {
  type: 'City',
  query: string,
  language: 'en',
  unit: 'm' | 'f'
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
  weather_descriptions: string[], // or Literal[]?
  wind_speed: number,
  wind_degree: number,
  wind_dir: string, // or WindRose literal?
  pressure: number,
  precip: number,
  humidity: number,
  cloudcover: number,
  feelslike: number,
  uv_index: number,
  visibility: number,
  is_day: string  // 'yes' | 'no' 
}

export interface CurrentResponse {
  request: Request,
  location: Location,
  current: Current
}