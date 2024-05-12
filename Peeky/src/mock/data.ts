import type {CurrentResponse} from '../types/response';

export const MOCKDATA: CurrentResponse = {
  request: {
    type: 'City',
    query: 'Milan, Italy',
    language: 'en',
    unit: 'm'
  },
  location: {
    name: 'Milan',
    country: 'Italy',
    region: 'Lombardia',
    lat: '45.467',
    lon: '9.200',
    timezone_id: 'Europe/Rome',
    localtime: '2024-05-09 16:50',
    localtime_epoch: 1715273400,
    utc_offset: '2.0'
  },
  current: {
    observation_time: '02:50 PM',
    weather_code: 116,
    weather_icons: [
      'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png'
    ],
    weather_descriptions: [
      'Partly cloudy'
    ],
    temperature: 23,
    feelslike: 25,
    pressure: 1018,
    precip: 0,
    humidity: 53,
    wind_speed: 9,
    wind_degree: 170,
    wind_dir: 'S',
    cloudcover: 50,
    uv_index: 6,
    visibility: 10,
    is_day: 'yes'
  }
}