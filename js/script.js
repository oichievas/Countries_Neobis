const navbarcontainer = document.querySelector('.navbarcontainer')
const container = document.querySelector('.row')

const Routes = {
    getAll: 'all',
    region: 'region'
}

const regionDate = [
    {
        id: 1,
        title: 'All countries',
        route: 'all'
    },
    {
        id: 2,
        title: 'Africa',
        route: 'africa'
    },
    {
        id: 3,
        title: 'Americas',
        route: 'americas'
    },
    {
        id: 4,
        title: 'Asia',
        route: 'asia'
    },
    {
        id: 5,
        title: 'Europe',
        route: 'europe'
    },
    {
        id: 6,
        title: 'Oceania',
        route: 'oceania'
    }
]

window.addEventListener('load', () => {
    const cardList = regionDate.map(({title, route}) => {
        return newList(title, route);  
    })

    navbarcontainer.innerHTML = cardList

    getDate(Routes.getAll , res => {
        console.log(res)
        const card = res.map(({name, capital, flag, region}) => {
            return cardTemplate(name, capital, flag, region)
        }).join('')
        container.innerHTML = card
    })
})

function cardTemplate( name, capital, flag, region){
    return `
       <div class="col-xl-4">
         <div class="card mt-4 mb-4" style="height: 400px">
            <div class="card-header">
                <h1>${name}</h1>
            </div>
            <div class="card-image">
                <img class="w-100" src="${flag}" style="height:250px;object-fit: cover">
            </div>
            <div class="card-body">
                <h5>Capital: ${capital}</h5>
                <h5>Region: ${region}</h5>
            </div>
        </div>
       </div>
    `
}

function newList(title, route) {
    return `
        <li class="nav-item">
            <button onclick="chooseRegion('${route}')" class="btn nav-link">  ${title} </button>
        </li>
    `
}

function chooseRegion(route){
    if(route === 'all'){
        getDate(Routes.getAll , res => {
            console.log(res)
            const card = res.map(({name, capital, flag, region}) => {
                return cardTemplate(name, capital, flag, region)
            }).join('')
            container.innerHTML = card
        })
    }else{
        getDate(`${Routes.region}/${route}` , res => {
            console.log(res)
            const card = res.map(({name, capital, flag, region}) => {
                return cardTemplate(name, capital, flag, region)
            }).join('')
            container.innerHTML = card
        })
    }
}

function getDate(endPoint, cb){
    fetch(`https://restcountries.eu/rest/v2/${endPoint}`)
    .then(res => res.json())
    .then(res => cb(res))
}


const select = document.querySelector('.select')
const input = document.querySelector('.searchName')

select.addEventListener('change', e => {
    var value = e.target.value;
    console.log(value)

    if(value === 'name'){
        input.placeholder = "Search by Name"
    } else {
        input.placeholder = "Search by Capital"
    }
})

input.addEventListener('input', e => {
    var val = e.target.value

    var selectValue = select.value

    if(selectValue === 'name'){
        getDate(Routes.getAll, res => {
            const card = res.map(({name, capital, flag, region}) => {
                if(name.includes(val)){
                    return cardTemplate(name, capital, flag, region)
                }
            }).join('')

            container.innerHTML = card
        })
    } else {
        getDate(Routes.getAll, res => {
            const card = res.map(({name, capital, flag, region}) => {
                if(capital.includes(val)){
                    return cardTemplate(name, capital, flag, region)
                }
            }).join('')

            container.innerHTML = card
        })
    }
})