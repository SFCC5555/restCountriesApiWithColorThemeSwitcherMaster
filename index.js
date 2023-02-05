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

        console.log(data)
        for (let i of data) {

            let countrie = document.createElement('div');
            
            countrie.classList.add('lightModeElements');
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
        
        let lightModeElements = document.querySelectorAll('.lightModeElements');

        darkModeButton.addEventListener('click',darkModeSwitch);

        function darkModeSwitch() {
        
            body.classList.toggle('ligthModeBackground');
            body.classList.toggle('darkModeBackground');

            darkModeIcon.classList.toggle('darkModeIconLight');
            darkModeIcon.classList.toggle('darkModeIconDark');

            searchIcon.classList.toggle('searchIconLight');
            searchIcon.classList.toggle('searchIconDark');

            downArrowIcon.classList.toggle('downArrowIconLight');
            downArrowIcon.classList.toggle('downArrowIconDark');
        
            for (let l of lightModeElements) {
                l.classList.toggle('lightModeElements');
                l.classList.toggle('darkModeElements');
            }
        
        }    
    
    
    })
    
filterButton.addEventListener('click',controlFilterButton); 

function controlFilterButton() {

    regionMenu.classList.toggle('inactive');
    
    console.log(regionMenu.classList.value)
    
}

document.addEventListener('click',hideRegionMenu);


function hideRegionMenu(event) {

    console.log(event.target)

    if (event.target!==filterButton) {

        console.log(regionMenu.classList.value)

        if (regionMenu.classList.value.includes('menu')) {
            regionMenu.classList.add('inactive');
        }
    }
}

