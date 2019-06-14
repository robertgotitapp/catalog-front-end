export async function post(endpoint, accessToken, data) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (accessToken !== null) { headers.append('Authorization', `JWT ${accessToken}`); }

  const options = {
    method: 'POST',
    mode: 'cors',
    headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(endpoint, options);
  const { status } = response;

  if (!(status === 200 || status === 201)) { throw response.json(); }
  return response.json();
}

export async function get(endpoint) {
  const options = {
    method: 'GET',
    mode: 'cors',
  };

  const response = await fetch(endpoint, options);
  const { status } = response;

  if (status !== 200) { throw response.json(); }
  return response.json();
}

export async function update(endpoint, accessToken, data) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (accessToken !== null) { headers.append('Authorization', `JWT ${accessToken}`); }

  const options = {
    method: 'PUT',
    mode: 'cors',
    headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(endpoint, options);
  const { status } = response;

  if (status !== 200) { throw response.json(); }
  return response.json();
}

export async function remove(endpoint, accessToken) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (accessToken !== null) { headers.append('Authorization', `JWT ${accessToken}`); }

  const options = {
    method: 'DELETE',
    mode: 'cors',
    headers,
    body: JSON.stringify(data),
  };

  const response = await fetch(endpoint, options);
  const { status } = response;

  if (status !== 200) { throw response.json(); }
  return response.json();
}
