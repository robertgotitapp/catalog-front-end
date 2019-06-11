export async function post(endpoint, data) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const options = {
        method: 'POST',
        mode: 'cors',
        headers,
        body: JSON.stringify(data)
    }
    
    const response = await fetch(endpoint, options)
    const status = response.status

    if (!(status === 200 || status === 201))
        throw response.json()
    return response.json()
}