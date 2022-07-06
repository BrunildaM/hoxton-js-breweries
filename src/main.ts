// Write your code here

const baseUrl = 'https://api.openbrewerydb.org/breweries'
const selectStateForm = document.querySelector("#select-state-form")
const filterSectionEl = document.querySelector('.filters-section')


 type Breweries = [
  {
    address_2: null,
    address_3: null,
    brewery_type: string,
    city: string,
    country: string,
    county_province: null,
    //created_at: '2018-07-24T00:00:00.000Z',
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    //obdb_id: '10-barrel-brewing-co-san-diego',
    phone: number,
    //postal_code: '92101-6618',
    state: string,
    //street: '1501 E St',
    //updated_at: '2018-08-23T00:00:00.000Z',
    website_url: string
  }
]


 


let state = {
   selectedState: '',
    breweries: [],
    breweryTypes: ['micro', 'regional', 'brewpub']
  }




  function getBreweriesToDisplay() {
    let breweriesToDisplay = state.breweries
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


  function renderFilterSection() {
    const asideEl = document.createElement('aside')
    asideEl.className = "filters-section"
    
  }

function renderBreweryList() {

}


  function render() {
    renderFilterSection()
    renderBreweryList()

  }
  

  function listenToSelectStateForm() {
    selectStateForm?.addEventListener("submit", function(event) {
        event.preventDefault()
        // @ts-ignore
       state.selectedState = selectStateForm['select-state'].value
        readBreweriesByState(state.selectedState)
        .then(function(breweries) {
            state.breweries = breweries
            render()
        })   
    })
  }

  listenToSelectStateForm()

render()