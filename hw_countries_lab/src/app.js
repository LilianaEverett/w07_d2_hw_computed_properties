import Vue from 'vue';

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      countries: [],
      selectedCountry: null,
      worldPopulation: 0,
      selectedCountryIndex: 0
    },
    mounted(){
      this.getCountries()
    },
    computed: {
      calculateWorldPopulation: function(){
        this.worldPopulation = this.countries.reduce((runningTotal, country) => {
          return runningTotal + country.population
        }, 0)
      }
    },
    methods: {
      getCountries: function(){
        fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(countries => {
          this.countries = countries
          this.calculateWorldPopulation()
          this.updateSelectedCountry()
        })
      },
      updateSelectedCountry: function(){
        this.selectedCountry = this.countries[this.selectedCountryIndex]
      },
    }
  })
})
