// Write your code here

const baseUrl = 'https://api.openbrewerydb.org/breweries'
const selectStateForm = document.querySelector("#select-state-form")




let state = {
   selectedState: '',
    breweries: [],
    breweryTypes: ['micro', 'regional', 'brewpub']
  }


  function getBreweriesToDisplay() {
    let breweriesToDisplay = state.breweries
//@ts-ignore
    breweriesToDisplay = breweriesToDisplay.filter(brewery => 
        //@ts-ignore
        state.breweryTypes.includes(brewery.brewery_type)
    )
    breweriesToDisplay = breweriesToDisplay.slice(0, 10)
    return breweriesToDisplay
  }

  function readBreweries() {
    return fetch(baseUrl). then(resp => resp.json())
  }


  function readBreweriesByState(state: string) {
    return fetch(`${baseUrl}?by_state=${state}`).then(resp => resp.json())

  }

  function listenToSelectStateForm() {
    selectStateForm?.addEventListener("submit", function(event) {
        event.preventDefault()
        // @ts-ignore
       state.selectedState = selectStateForm['select-state'].value
        readBreweriesByState(state.selectedState)
        .then(function(breweries) {
            state.breweries = breweries
            
        })
        

    })
  }

  listenToSelectStateForm()