import { HeadersType } from './const';

// A template request to make a call to the api to retrieve data
export async function request(methodType, endpoint, headerTypes, data) {
  // Configuring options of the request
  const options = {
    method: methodType,
    mode: 'cors',
  };

  // Adding headers if there is any of them required
  if (headerTypes !== []) {
    const headers = new Headers();
    if (headerTypes.includes(HeadersType.CONTENTTYPE)) {
      headers.append('Content-Type', 'application/json');
    }
    if (headerTypes.includes(HeadersType.AUTHORIZATION)) {
      headers.append(Authorization, `JWT ${localStorage.getItem('accessToken')}`);
    }
    options.headers = headers;
  }

  // Adding data to the body if any of them is required
  if (data !== {}) { options.body = JSON.stringify(data); }

  const response = await fetch(endpoint, options);
  const { status } = response;
  if (!(status === 200 || status === 201)) { throw response.json(); }
  return response.json();
}

export const get = endpoint => request('GET', endpoint, [], {});
export const post = (endpoint, headerTypes, data) => request('POST', endpoint, headerTypes, data);
export const update = (endpoint, headerTypes, data) => request('UPDATE', endpoint, headerTypes, data);
export const remove = (endpoint, headerTypes) => request('DELETE', endpoint, headerTypes, {});

// export async function post(endpoint, data) {
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   if (accessToken !== null) { headers.append('Authorization', `JWT ${accessToken}`); }

//   const options = {
//     method: 'POST',
//     mode: 'cors',
//     headers,
//     body: JSON.stringify(data),
//   };

//   const response = await fetch(endpoint, options);
//   const { status } = response;

//   if (!(status === 200 || status === 201)) { throw response.json(); }
//   return response.json();
// }

// export async function get(endpoint) {
//   const options = {
//     method: 'GET',
//     mode: 'cors',
//   };

//   const response = await fetch(endpoint, options);
//   const { status } = response;

//   if (status !== 200) { throw response.json(); }
//   return response.json();
// }

// export async function update(endpoint, data) {
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   if (accessToken !== null) { headers.append('Authorization', `JWT ${accessToken}`); }

//   const options = {
//     method: 'PUT',
//     mode: 'cors',
//     headers,
//     body: JSON.stringify(data),
//   };

//   const response = await fetch(endpoint, options);
//   const { status } = response;

//   if (status !== 200) { throw response.json(); }
//   return response.json();
// }

// export async function remove(endpoint) {
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   if (accessToken !== null) { headers.append('Authorization', `JWT ${accessToken}`); }

//   const options = {
//     method: 'DELETE',
//     mode: 'cors',
//     headers,
//   };

//   const response = await fetch(endpoint, options);
//   const { status } = response;

//   if (status !== 200) { throw response.json(); }
//   return response.json();
// }
