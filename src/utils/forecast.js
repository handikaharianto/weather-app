const axios = require('axios')

const forecast = async (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/'

  const searchParams = new URLSearchParams({
    access_key: '73f0f7964485f74f4aeb5eb8b56a3714',
    query: `${latitude},${longitude}`,
    units: 'f',
  })

  try {
    const response = await axios.get(`${url}forecast`, {
      params: searchParams,
    })

    if (response.data.success === false)
      throw new Error('unable to connect to weather servies')

    const { temperature, weather_descriptions, precip } = response.data.current

    callback(
      undefined,
      `${weather_descriptions}. it is currently ${temperature} degrees out. There is a ${precip}% chance of rain`
    )
  } catch (e) {
    callback(e.message, undefined)
  }
}

module.exports = forecast
