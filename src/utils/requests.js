import { HeadersType, RequestType } from './const';
import config from '../configuration';

// A template request to make a call to the api to retrieve data
export async function request(methodType, endpoint, headerTypes = null, data = null) {
  // Configuring options of the request
  const options = {
    method: methodType,
    mode: 'cors',
  };

  // Adding headers if there is any of them required
  if (headerTypes !== null) {
    const headers = new Headers();
    if (headerTypes.includes(HeadersType.CONTENTTYPE)) {
      headers.append('Content-Type', 'application/json');
    }
    if (headerTypes.includes(HeadersType.AUTHORIZATION)) {
      headers.append('Authorization', `JWT ${localStorage.getItem('accessToken')}`);
    }
    options.headers = headers;
  }

  // Adding data to the body if any of them is required
  if (data !== null) { options.body = JSON.stringify(data); }

  // Concatenate Local Prefix with end point and make a fetch request to the API
  const response = await fetch(config.apiUrl.concat(endpoint), options);
  // const response = await fetch(config.ENDPOINT_PREFIX.concat(endpoint), options);

  // Extract the status code from the response and throw errors if it is different from 200 and 201
  const { status } = response;
  const responseJSON = await response.json();
  if (!(status === 200 || status === 201)) {
    throw responseJSON;
  }
  return responseJSON;
}

export const get = (
  endpoint,
  headerTypes = null,
) => request(RequestType.GET, endpoint, headerTypes);
export const post = (
  endpoint,
  headerTypes,
  data,
) => request(RequestType.POST, endpoint, headerTypes, data);
export const update = (
  endpoint,
  headerTypes,
  data,
) => request(RequestType.PUT, endpoint, headerTypes, data);
export const remove = (
  endpoint,
  headerTypes,
) => request(RequestType.DELETE, endpoint, headerTypes);
