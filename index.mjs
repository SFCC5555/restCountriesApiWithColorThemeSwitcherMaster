let countriesContainer = document.querySelector('.countriesContainer');

let filterButton = document.getElementById('filterButton');

let regionMenu = document.getElementById('regionMenu');

let darkModeButton = document.getElementById('darkModeButton');

let body = document.querySelector('body');

let darkModeIcon = document.getElementById('darkModeIcon');

let searchIcon = document.getElementById('searchIcon');

let downArrowIcon = document.getElementById('downArrowIcon');

let search = document.getElementById('search');

let searchInput = document.getElementById('searchInput');

let detailSection = document.querySelector('.detailSection');

let title = document.querySelector('title');

let elements;

let backArrow;


fetch('https://restcountries.com/v2/all')
        .then(response => response.json())
        .then(data => {

        //console.log(data)


        regionMenu.addEventListener('click',selectRegion);

        searchInput.addEventListener('keydown',renderCountriesLately);

        function renderCountriesLately(){
            setTimeout(renderCountries,0);
        }

        let region = 'Filter by Region';


        function selectRegion(event) {

            let target = event.target.outerText;

            let filterOptions=['Africa','America','Asia','Europe','Oceania','All'];

            for (let i of filterOptions) {
                if (target===i) {

                    if (target==='All') {
                        filterButton.innerText='Filter by Region';
                        region= filterButton.innerText;
                        console.log(region)
                    } else {
                        filterButton.innerText=target;
                        if (target==='America') {
                            region = filterButton.innerText + 's'
                        } else {
                            region = filterButton.innerText;
                        }

                    }
                    renderCountries();
                }
            }
        }
        

        function renderCountries() {

            title.innerText='COUNTRY.io'

            countriesContainer.innerHTML="";

            search.innerHTML="";

            detailSection.innerHTML='';

            let counter=0;

            for (let i of data) {

                function renderFilterCountries() {
                    let countrie = document.createElement('div');

                    if (darkModeIcon.classList.value==='darkModeIconLight') {
                        countrie.classList.add('lightModeElements');
                    } else {
                        countrie.classList.add('darkModeElements');
                    }
                

                    countrie.classList.add('flex');
                    countrie.classList.add('column')
        
                    countrie.innerHTML=`<img src="${i.flag}">
                    
                    <div class="font-weight800 font-size16px">${i.name}</div>
                    
                    <div class="font-weight600" ><span class="font-weight800" >Population:</span>${i.population}</div>
        
                    <div class="font-weight600" ><span class="font-weight800" >Region:</span>${i.region}</div>
                    
                    <div class="font-weight600" ><span class="font-weight800" >Capital:</span>${i.capital}</div>  
                    
                    </div>`

                    counter++

                    countriesContainer.appendChild(countrie);

                    let option = document.createElement('option');
                    option.setAttribute('value',i.name);
                    search.appendChild(option);

                    countrie.addEventListener('click',renderDetail)

                    function renderDetail() {

                        let languages = i.languages.map(l=>l.name).join(', ');

                        let currencies = 'No currencies';


                        if (i.currencies) {

                            currencies = i.currencies.map(l=>l.name).join(', ');

                        };

                        title.innerText = `COUNTRY.io/${i.name}`


                        countriesContainer.innerHTML="";

                        detailSection.innerHTML='';
            
                        detailSection.innerHTML=`<button id='backButton'><span id = 'backArrow'></span>Back</button>

                                                <main>
                                            
                                                    <img class='detailImg' src="${i.flag}">
                                                    <section class="data">
                                                        <div class="countryData">
                                                            <div class="data1 marginBottom30px">
                                            
                                                                <div class="font-weight800 font-size16px marginBottom30px">${i.name}</div>
                                                                <div class="font-weight600"><span class="font-weight800">Native Name: </span>${i.nativeName}</div>
                                                                <div class="font-weight600"><span class="font-weight800">Population: </span>${i.population}</div>
                                                                <div class="font-weight600"><span class="font-weight800">Region: </span>${i.region}</div>
                                                                <div class="font-weight600"><span class="font-weight800">Sub Region: </span>${i.subregion}</div>
                                                                <div class="font-weight600"><span class="font-weight800">Capital: </span>${i.capital}</div>
                                            
                                                            </div>
                                                            <div class="data2 marginBottom30px">
                                            
                                                                <div class="font-weight600"><span class="font-weight800">Top Level Domain: </span>${i.topLevelDomain}</div>
                                                                <div class="font-weight600"><span class="font-weight800">Currencies: </span>${currencies}</div>
                                                                <div class="font-weight600"><span class="font-weight800">Languages: </span>${languages}</div>
                                            
                                                            </div>
                                                        </div>
                                            
                                                        <div class="borderData">
                                                            <div class="font-weight800 marginBottom10px">Border Countries:</div>
                                                            <div class="buttonsContainer">
                                                            </div>
                                                        </div>
                                            
                                                    </section>
                                            
                                                </main>`

                        let backButton = document.getElementById('backButton');

                        backArrow = document.getElementById('backArrow');

                        if (darkModeIcon.classList.value==='darkModeIconLight') {
                            backButton.classList.add('lightModeElements');
                            backArrow.classList.add('backArrowLight');
                        } else {
                            backButton.classList.add('darkModeElements');
                            backArrow.classList.add('backArrowDark');

                        }



                        backButton.addEventListener('click',renderCountries);

                        let buttonsContainer = document.querySelector('.buttonsContainer');

                        if (i.borders) {

                            for (let b of i.borders) {


                                let indexBorderCountry = data.findIndex(c=>b===c.alpha3Code);

                                let borderName = data[indexBorderCountry].name;
    
            
                                
                                let borderButton = document.createElement('button');

                                if (darkModeIcon.classList.value==='darkModeIconLight') {
                                    borderButton.classList.add('lightModeElements');
                                } else {
                                    borderButton.classList.add('darkModeElements');
                                }


                                borderButton.innerText=borderName;
                                buttonsContainer.appendChild(borderButton);
    
                            }
    

                        } else {
                            buttonsContainer.innerText='No border countries'
                        }

                        if (darkModeIcon.classList.value==='darkModeIconLight') {

                            elements = document.querySelectorAll('.lightModeElements');
                        } else {
                            elements = document.querySelectorAll('.darkModeElements');
                        }

                    }

                }

                let match = new RegExp(searchInput.value,'i');

                if (match.test(i.name)) {
                    
                    if (region==='Filter by Region') {

                        renderFilterCountries();
    
                    }
    
                    else if (region===i.region) {
    
                        renderFilterCountries()
        
                    }

                }
    
            }

            if (counter===0) {
                if (counter===0) {
                    countriesContainer.innerHTML="NO MATCHES";
                }
            }



            if (darkModeIcon.classList.value==='darkModeIconLight') {

                elements = document.querySelectorAll('.lightModeElements');
            } else {
                elements = document.querySelectorAll('.darkModeElements');
            }
            


            darkModeButton.addEventListener('click',darkModeSwitch);

        }

        renderCountries()

        function darkModeSwitch() {

            body.classList.toggle('ligthModeBackground');
            body.classList.toggle('darkModeBackground');

            detailSection.classList.toggle('ligthModeBackground');
            detailSection.classList.toggle('darkModeBackground')

            darkModeIcon.classList.toggle('darkModeIconLight');
            darkModeIcon.classList.toggle('darkModeIconDark');

            searchIcon.classList.toggle('searchIconLight');
            searchIcon.classList.toggle('searchIconDark');

            downArrowIcon.classList.toggle('downArrowIconLight');
            downArrowIcon.classList.toggle('downArrowIconDark');


            if (backArrow) {

                backArrow.classList.toggle('backArrowLight');
                backArrow.classList.toggle('backArrowDark');

            }
            

            for (let l of elements) {
                l.classList.toggle('lightModeElements');
                l.classList.toggle('darkModeElements');
            }
        }   

    
        })



filterButton.addEventListener('click',controlFilterButton); 

function controlFilterButton() {

    regionMenu.classList.toggle('inactive');
    
    //console.log(regionMenu.classList.value)
    
}

document.addEventListener('click',hideRegionMenu);


function hideRegionMenu(event) {

    //console.log(event.target)

    if (event.target!==filterButton) {

        //console.log(regionMenu.classList.value)

        if (regionMenu.classList.value.includes('menu')) {
            regionMenu.classList.add('inactive');
        }
    }
}