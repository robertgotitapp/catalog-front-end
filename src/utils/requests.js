import { HeadersType, RequestType } from './const';

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

  console.log(options);

  // Adding data to the body if any of them is required
  if (data !== null) { options.body = JSON.stringify(data); }

  const response = await fetch(endpoint, options);
  const { status } = response;
  if (!(status === 200 || status === 201)) { throw response.json(); }
  return response.json();
}

export const get = endpoint => request(RequestType.GET, endpoint);
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
