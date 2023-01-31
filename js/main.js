import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const DOMAINE = "http://api.openweathermap.org/geo/1.0/direct?q="
const url_data = "https://api.openweathermap.org/data/2.5/weather?lat="
const url_icon = " http://openweathermap.org/img/wn/"
const city_name = ref("")
const country_code = ref("")
const lat = ref([])
const lon = ref([])
const location = ref(null)
const api_key = "74ad8282e67c21ad10af927c6e432b75"


function actualiserMeteo() {
      const url_geo = DOMAINE + city_name.value +  "," + country_code.value + "&appid=" + api_key
      fetch(url_geo).then(resp => resp.json()).then(resultat => {
              const url_meteo = url_data + resultat[0].lat + "&lon=" + resultat[0].lon + "&lang=fr" + "&appid=" + api_key + "&units=metric"
              fetch(url_meteo).then(resp => resp.json()).then(resultat => {
                location.value =  resultat
                console.log(resultat)
            })
          })
      }

      function getDirection(angle) {
        var directions = ['Nord', 'Nord-Est', 'Est', 'Sud-Est', 'Sud', 'Sud-Ouest', 'Ouest', 'Nord-Ouest'];
        var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
        return directions[index];
    }


const root = {
  setup() {
      return {
        city_name,
        country_code,
        lon,
        lat,
        location,
        api_key,
        url_icon, 

        actualiserMeteo,
        getDirection,
      }
  }
}

createApp(root).mount("#app")