
const baseUrl = 'https://api.openbrewerydb.org/breweries'
const selectStateForm = document.querySelector('#select-state-form')
const filterSectionEl = document.querySelector('.filters-section')
const filterByCityForm = document.querySelector('#filter-by-city-form')
const breweryList = document.querySelector('.breweries-list')


const titleEl = document.querySelector('.title')
const searchBarEl = document.querySelector('.search-bar')
const breweryListWrapper = document.querySelector('.brewery-list-wrapper')


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
    const asideEl = document.createElement('aside')
    asideEl.className = "filters-section"

    /*   <aside class="filters-section">
        <h2>Filter By:</h2>
        <!-- Type of brewery - Challenge #1 -->
        <form id="filter-by-type-form" autocompete="off">
          <label for="filter-by-type">
            <h3>Type of Brewery</h3>
          </label>
          <select name="filter-by-type" id="filter-by-type">
            <option value="">Select a type...</option>
            <option value="micro">Micro</option>
            <option value="regional">Regional</option>
            <option value="brewpub">Brewpub</option>
          </select>
        </form>
        <!-- Cities  - Challenge #2 -->
        <div class="filter-by-city-heading">
          <h3>Cities</h3><button class="clear-all-btn">clear all</button>
        </div>
        <form id="filter-by-city-form">
          <input type="checkbox" name="williamsville" value="williamsville">
          <label for="williamsville">Williamsville</label> <input type="checkbox" name="holland patent"
            value="holland patent">
          <label for="holland patent">Holland Patent</label>
          <input type="checkbox" name="holbrook" value="holbrook">
          <label for="more">More cities ...</label>
          <input type="checkbox" name="more" value="more">
        </form>*/
    
  }


  function renderBreweryItem(brewery) {
    /*<li>
      <h2>Snow Belt Brew</h2>
      <div class="type">micro</div>
      <section class="address">
        <h3>Address:</h3>
        <p>9511 Kile Rd</p>
        <p><strong>Chardon, 44024</strong></p>
      </section>
      <section class="phone">
        <h3>Phone:</h3>
        <p>N/A</p>
      </section>
      <section class="link">
        <a href="null" target="_blank">Visit Website</a>
      </section>
    </li>
    */

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
            render()
        })   
    })
  }



    render()
    listenToSelectStateForm()


