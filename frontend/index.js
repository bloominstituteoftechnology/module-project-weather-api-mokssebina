async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here

  //Task 1
  const weatherWidget = document.querySelector('#weatherWidget')
  console.log("weather widget: ", weatherWidget)
  weatherWidget.style.display = 'none'

  //Task 2
  const dropdown = document.querySelector('#citySelect')

  dropdown.addEventListener('change', event => {
    console.log("dropdown value: ", event.target.value)

  //Task 3
    weatherWidget.style.display = 'none'
    dropdown.disabled = true
    const loading = document.querySelector('.info')
    loading.textContent = `Fetching weather data...`
    

  //Task 4
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const matchWeatherEmoji = (weather) => {

      let weatherItem = descriptions.filter(item => item.includes(weather))
      console.log("weather item: ",weatherItem.join())
      
      let weatherString = weatherItem.join()
      let emoji = weatherString.substring(weatherString.length - 2)
      
      return emoji

    }

    axios.get(`http://localhost:3003/api/weather?city=${event.target.value}`)
    .then((res) => {
       let data = res.data
      console.log("response: ",data)
      if(data){
        dropdown.disabled = false
        loading.textContent = ''
        weatherWidget.style.display = 'block'

        currentTemp = document.querySelector('#apparentTemp').children
        console.log("current: ",currentTemp)
        currentTemp[1].textContent = `${data.current.apparent_temperature}°`

        todaysDescription = document.querySelector('#todayDescription')
        todaysDescription.textContent = descriptions.find(item => item[0] === data.current.weather_description)[1]

        todayStats = document.querySelector('#todayStats').children
        todayStats[0].textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`
        todayStats[1].textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`
        todayStats[2].textContent = `Humidity: ${data.current.humidity}%`
        todayStats[3].textContent = `Wind: ${data.current.wind_speed}m/s`

        nextDayCard = document.querySelectorAll('.next-day')
        console.log("day card: ",nextDayCard)

        for(let i = 0; i < nextDayCard.length; i++){

          let cardItem = nextDayCard[i].children
          let dailyItem = data.forecast.daily[i]

          console.log("card item: ",cardItem)
          console.log("daily item: ",dailyItem)

          cardItem[0].textContent = weekday[new Date(dailyItem.date).getUTCDay()]
          cardItem[1].textContent = descriptions.find(item => item[0] === dailyItem.weather_description)[1]
          cardItem[2].textContent = `${dailyItem.temperature_min}°/${dailyItem.temperature_max}°`
          cardItem[3].textContent = `Precipitation: ${dailyItem.precipitation_probability * 100}%`

        }

        locationHolder = document.querySelector('#location').children
        locationHolder[0].textContent = `${data.location.city}`
        locationHolder[1].textContent = `${data.location.country}`

      } else {
        dropdown.disabled = false
        loading.textContent = ''
      }

    })
    .catch((error) => {
      dropdown.disabled = false
      loading.textContent = ''
      console.log("error: ",error.message)
    })

    
  })


  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
