export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
  .then(response => checkForError(response))
}

const checkForError = (response) => {
  if(response.ok) {
    return response.json()
  } else if (response.status === 404) {
    throw new Error('404')
  } else if (response.status === 500) {
    throw new Error('500')
  } else {
    throw new Error('Something went wrong')
  }

}