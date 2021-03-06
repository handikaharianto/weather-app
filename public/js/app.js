const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const fetchData = (address) => {
  messageOne.textContent = 'loading...'
  messageTwo.textContent = ''

  fetch(`/weather?address=${address}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error)
      }

      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    })
    .catch((error) => {
      messageOne.textContent = error.message
      messageTwo.textContent = ''
    })
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  if (location === '') {
    console.log('you must provide an address')
    return
  }

  fetchData(location)
})
