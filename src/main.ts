// Write your code here

const baseUrl = 'https://api.openbrewerydb.org/breweries'
const selectStateForm = document.querySelector("#select-state-form")

let state = {
   selectedState: '',
    breweries: []
  }


  function getBreweriesToDisplay() {
    let breweriesToDisplay = state.breweries
    
  }

  function getBreweries() {
    return fetch(baseUrl). then(resp => resp.json())
  }


  function getBreweriesByState(state: string) {
    return fetch(`${baseUrl}?by_state=${state}`).then(resp => resp.json())

  }

  function listenToSelectStateForm() {
    selectStateForm?.addEventListener("submit", function(event) {
        event.preventDefault()
        // @ts-ignore
       state.selectedState = selectStateForm['select-state'].value
        getBreweriesByState(state.selectedState)
        .then(function(breweries) {
            state.breweries = breweries

        })
        

    })
  }

  listenToSelectStateForm()