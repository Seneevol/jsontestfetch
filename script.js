const all = document.getElementById('all')


// Fetch de l'api pokemon
function fetchKanto() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
        .then(response => response.json())
        .then((datapokemon) => {
            // Ligne mettant chaque résultat du fetch dans la fonction crée
            datapokemon.results.forEach(function (pokemon) {
                // Appelle de la fonction 'allpokemondata'
                allpokemondata(pokemon)
            })
        })
}

// Fetch des détails des pokemons en utilisant le fetch juste au dessus
function allpokemondata(pokemon) {
    let url = pokemon.url
    fetch(url)
        .then(response => response.json())
        .then((datapoke) => {
            const poke = datapoke
            allCards(poke)
        })
}

// Création de la barre de recherche
function searchbar() {

    const container = document.createElement('div')
    container.setAttribute('class', 'container')

    const row = document.createElement('div')
    row.className = 'row'

    const inputgroup = document.createElement('div')
    inputgroup.setAttribute('class', 'input-group mb-3 mt-3')
    const form = document.createElement('div')
    form.setAttribute('class', 'form-outline')

    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'form1'
    input.className = 'form-control mx-auto'
    input.placeholder = 'Recherchez un pokémon...'
    input.setAttribute('onkeyup', 'filterListImages()')


    inputgroup.appendChild(form)
    form.appendChild(input)
    all.appendChild(container)
    container.appendChild(row)
    row.appendChild(inputgroup)
}


// Création du container pour les cards
function containerCards() {
    const container = document.createElement('div')
    container.setAttribute('class', 'container')

    const row = document.createElement('div')
    row.setAttribute('class', 'row')
    row.setAttribute('id', 'listCard')

    all.appendChild(container)
    container.appendChild(row)
}

// Création des cards
function allCards(poke) {

    row = document.getElementById('listCard')

    //console.log(poke.id);
    const card = document.createElement('div')
    card.setAttribute('class', 'card col-md-4')
    card.setAttribute('id', 'pokeCard')
    card.style.display = 'none'

    const img = document.createElement('img')
    img.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`)
    img.setAttribute('class', 'card-img-top')


    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')

    const titleCard = document.createElement('h5')
    titleCard.innerText = poke.name
    titleCard.setAttribute('class', 'card-title')

    const p = document.createElement('p')
    p.innerText = `Pokemon n°${poke.id} de type`
    p.setAttribute('class', 'card-text')

    const a = document.createElement('a')
    const linkText = document.createTextNode('Go somewhere')
    a.setAttribute('class', 'btn btn-primary')

    card.appendChild(img)
    card.appendChild(cardBody)
    cardBody.appendChild(titleCard)
    cardBody.appendChild(p)
    a.appendChild(linkText)
    cardBody.appendChild(a)
    row.appendChild(card)
}

function filterListImages() {
    var input, filter, card, listCard, h5, i, txtValue;
    input = document.getElementById('form1');
    filter = input.value.toUpperCase();
    listCard = document.getElementById('listCard')
    card = listCard.getElementsByTagName('div')

    //console.log(listCard);
    for (i = 0; i < card.length; i++) {
        h5 = card[i].getElementsByTagName("h5")[0];

        
        txtValue = (h5.textContent || h5.innerText).toUpperCase().indexOf(filter) > -1;

        if (txtValue) {

            // Si la valeur dans l'input ne retourne rien ne rien montrer
            if(input.value.length == 0){
                card[i].style.display = "none";

             // Sinon chercher avec la valeur de l'input   
            }else{
                card[i].style.display = "";
            }
            // Cacher les cards ne correspondants pas à la recherche
        } else {
            card[i].style.display = 'none'
        }
    }
}

searchbar()
containerCards()
fetchKanto()
