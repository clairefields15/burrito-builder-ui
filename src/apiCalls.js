const baseURL = 'http://localhost:3001/api/v1/orders'

export const getOrders = () => {
  return fetch(baseURL)
  .then(response => checkForError(response))
}

const checkForError = (response) => {
  if(response.ok) {
    return response.json()
  } else if (response.status === 404) {
    throw new Error('404: Resource not found')
  } else if (response.status === 500) {
    throw new Error('500: Sorry our server is down')
  } else {
    throw new Error('Something went wrong')
  }
}

export const addOrder = (order) => {

  return fetch(baseURL, {
    "method": 'POST',
    "body": JSON.stringify(order),
    "headers": {
      "Content-type": "application/json"
    }
  })
    .then(response => checkForError(response))
}