
const baseUrl = 'https://api.openbrewerydb.org/breweries'
const selectStateForm = document.querySelector('#select-state-form')
const filterSectionEl = document.querySelector('.filters-section')
const filterByCityForm = document.querySelector('#filter-by-city-form')
const breweryList = document.querySelector('.breweries-list')


const titleEl = document.querySelector('.title')
const searchBarEl = document.querySelector('.search-bar')
const breweryListWrapper = document.querySelector('.brewery-list-wrapper')


const filterByType = document.querySelector('#filter-by-type')


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
    breweryTypes: ['micro', 'regional', 'brewpub'],
    selectedBreweryType: '',
    selectedCities: []
  }




  function getBreweriesToDisplay() {
    let breweriesToDisplay = state.breweries
    breweriesToDisplay = breweriesToDisplay.filter(brewery => 
        //@ts-ignore
        state.breweryTypes.includes(brewery.brewery_type)
    )

    if (state.selectedCities.length > 0) {
      breweriesToDisplay = breweriesToDisplay.filter(brewery =>
        state.selectedCities.includes(brewery.city)
        )
    }

    breweriesToDisplay = breweriesToDisplay.slice(0, 10)
    return breweriesToDisplay
  }


  function getCitiesFromBreweries(breweries: Array<Breweries>) {
    //@ts-ignore
    let cities = []

    for (const brewery of breweries) {
      
      if (!cities.includes(brewery.city)){
        cities.push(brewery.city)
      }
    }
    return cities
  }

  function readBreweries() {
    return fetch(baseUrl). then(resp => resp.json())
  }



  function readBreweriesByState(state: string) {
    return fetch(`${baseUrl}?by_state=${state}`).then(resp => resp.json())
    
  }


  function renderFilterSection() {

    filterByType.value = state.selectedBreweryType

    if (filterByCityForm === null) return

 filterByCityForm.innerHTML = ''

 const cities = getCitiesFromBreweries(state.breweries)

 for (const city of cities){
  const inputEl = document.createElement('input')
  inputEl.setAttribute('type', 'checkbox')
  inputEl.setAttribute('class', 'city-checkbox')
  inputEl.setAttribute('name', city)
  inputEl.setAttribute('value', city)
  inputEl.setAttribute('id', city)

  const labelEl = document.createElement('label')
  labelEl.setAttribute('for', city)
  labelEl.textContent = city

  inputEl.addEventListener('change', function(){
    const cityCheckboxes = document.querySelectorAll('.city-checkbox')
    let selectedCities = []

    for (const checkbox of cityCheckboxes) {
      if (checkbox.checked) selectedCities.push(checkbox.value)
    }

    state.selectedCities = selectedCities

    render()

  })
  

  filterByCityForm.append(inputEl, labelEl)
 }
    
  }


  function renderBreweryItem(brewery) {
  

   const liEl= document.createElement('li')

   const breweryTitle = document.createElement('h2')
   breweryTitle.textContent = brewery.name

   const typeEl = document.createElement('div')
   typeEl.setAttribute('class', 'type')
   typeEl.textContent= brewery.brewery_type

   const addressEl = document.createElement('section')
   addressEl.setAttribute('class', 'address')

   const addressTitle = document.createElement('h3')
   addressTitle.textContent = 'Address:'

   const addressStreet = document.createElement('p')
   addressStreet.textContent = brewery.street

   const addressPostCode = document.createElement('p')
   const addressPostCodeStrong = document.createElement('strong')
   addressPostCodeStrong.textContent = `${brewery.city}, ${brewery.postal_code}`

   addressPostCode.append(addressPostCodeStrong)
   addressEl.append(addressTitle, addressStreet, addressPostCode)


   const phoneEl = document.createElement('section')
   phoneEl.setAttribute('class', 'phone')

   const phoneTitle = document.createElement('h3')
   phoneTitle.textContent = 'Phone:'

   const phoneNumberEl = document.createElement('p')
   phoneNumberEl.textContent= brewery.phone

   phoneEl.append(phoneTitle, phoneNumberEl)


   const linkEl = document.createElement('section')
   linkEl.setAttribute('class', 'link')

   const aEl = document.createElement('a')
   aEl.setAttribute('href', brewery.website_url)
   aEl.setAttribute('target', '_blank')
   aEl.textContent = 'Visit Website'

   linkEl.append(aEl)

   liEl.append(breweryTitle, typeEl, addressEl, phoneEl, linkEl)
   breweryList?.append(liEl)

  }


function renderBreweryList() {
breweryList.innerHTML = ''
  
for (const brewery of getBreweriesToDisplay()){
  renderBreweryItem(brewery)
}
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
            state.selectedCities = []
            state.selectedBreweryType = ''
            render()
        })   
    })
  }


  function listenToFilterByType() {
    filterByType?.addEventListener('change', function(){
      state.selectedBreweryType = filterByType.value

      render()
    })
  }



    render()
    listenToSelectStateForm()
    listenToFilterByType()


