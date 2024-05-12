import {CurrentUnit} from "../types/response";

const BASEURL = 'http://api.weatherstack.com/current';
const APIKEY = '98d68bdf25165de43301b44738de045d';

interface UrlParams {
  query: string;
}

/**
 * Function to make HTTP requests (GET, POST, etc.) using Fetch API
 * @param method HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE')
 * @param url API endpoint URL (relative or absolute)
 * @param data Data to send in the request body (for POST, PUT, etc.)
 * @param params Query parameters to append to the URL (for GET, etc.)
 * @returns Promise resolving to the API response data or rejecting with an error
 */
export const fetchData = async <R = unknown>(
  method: string,
  units: CurrentUnit,
  params: UrlParams,
): Promise<R> => {

  const url = new URL(BASEURL);
  url.searchParams.append('access_key', APIKEY);

  if (params) {
    url.searchParams.append('query', params.query);
  }

  url.searchParams.append('units', units)

  const requestConfig: RequestInit = {
    method,
  };

  try {
    const response = await fetch(url, requestConfig);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseType = response.headers.get('Content-Type')?.includes('json')
      ? 'json'
      : 'text';

    const data = await response[responseType]();
    return data as R;
  } 
  catch (error) {
    //@ts-expect-error Unkown Error type
    throw new Error('API request failed:', error);
  }
};
