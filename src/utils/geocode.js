const axios = require('axios')

const geocode = async (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/`

  const params = new URLSearchParams({
    access_token:
      'pk.eyJ1IjoiaGFuZGlrYWhhcmlhbnRvIiwiYSI6ImNreXV3bGN4MzBmeWYzMm1sZXhxZWx6anMifQ.KxDO3Ee8gq8yTconl5_Wmg',
    limit: '1',
  })

  try {
    const response = await axios.get(`${url}${address}.json`, {
      params,
    })

    if (response.data.features.length === 0)
      throw new Error('Unable to find specified location')

    const [
      {
        center: [longitude, latitude],
        place_name: location,
      },
    ] = response.data.features

    callback(undefined, {
      longitude,
      latitude,
      location,
    })
  } catch (e) {
    callback(e.message, undefined)
  }
}

module.exports = geocode
