// Helpers function for post, get request
// Could use axios instead 
// Potentially set up params and headers for every request

export async function post(endpoint, data) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }

    const request = new Request(endpoint, options)
    const response = await fetch(request)
    const status = await response.status

    console.log(response)
    console.log(status)

    if (status == 200 || status == 201)
        this.fetchAll()
}

export async function get(endpoint, params) {
    const options = {
        method: 'GET',
        params
    }

    const request = new Request(endpoint, options)
    const response = await fetch(request)
    const status = await response.status
    
    if (status == 200)
        this.fetchAll()
}