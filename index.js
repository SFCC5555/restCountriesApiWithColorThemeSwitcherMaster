let countriesContainer = document.querySelector('.countriesContainer');

let filterButton = document.getElementById('filterButton');

let regionMenu = document.getElementById('regionMenu');

let darkModeButton = document.getElementById('darkModeButton');

let body = document.querySelector('body');

let darkModeIcon = document.getElementById('darkModeIcon');

let searchIcon = document.getElementById('searchIcon');

let downArrowIcon = document.getElementById('downArrowIcon');


fetch('https://restcountries.com/v2/all')
        .then(response => response.json())
        .then(data => {

        //console.log(data)


        regionMenu.addEventListener('click',selectRegion);

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

            countriesContainer.innerHTML="";

            for (let i of data) {

                function renderFilterCountries() {
                    let countrie = document.createElement('div');

                    console.log(darkModeIcon.classList)

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
                    
                    countriesContainer.appendChild(countrie);
                }

                if (region==='Filter by Region') {

                    renderFilterCountries();

                }

                else if (region===i.region) {

                    renderFilterCountries()
    
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

            darkModeIcon.classList.toggle('darkModeIconLight');
            darkModeIcon.classList.toggle('darkModeIconDark');

            searchIcon.classList.toggle('searchIconLight');
            searchIcon.classList.toggle('searchIconDark');

            downArrowIcon.classList.toggle('downArrowIconLight');
            downArrowIcon.classList.toggle('downArrowIconDark');

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








