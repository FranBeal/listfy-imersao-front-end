const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");
const artistContainer = document.getElementById('artist-container');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${encodeURIComponent(searchTerm)}`
    console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
        .catch((error) => console.error("Erro na requisição", error));
}

function escondePlaylists() {
    playlistContainer.classList.add("hidden");
}

function mostraPlaylists() {
    playlistContainer.classList.remove("hidden");
}

function escondeArtistas() {
    resultArtist.classList.add("hidden");
}

function mostraArtistas() {
    resultArtist.classList.remove("hidden");
}

function displayResults(result) {
    escondePlaylists();

    // Limpa os resultados anteriores
    artistContainer.innerHTML = "";


    console.log("Chegou no for each");
    result.forEach(artist => {

        console.log("entrou no for each");
        // Criar um div para o artista
        const card = document.createElement("div");
        card.classList.add("artist-card");
        const cardImg = document.createElement("div");
        cardImg.classList.add("card-img");

        const img = document.createElement("img");
        img.classList.add("artist-img");
        img.src = artist.urlImg;
        img.alt = artist.name;

        const playIcon = document.createElement("div");
        playIcon.classList.add("play");

        const playSpan = document.createElement("span");
        playSpan.classList.add("fa", "fa-solid", "fa-play");

        playIcon.appendChild(playSpan);
        cardImg.appendChild(img);
        cardImg.appendChild(playIcon);

        const cardText = document.createElement("div");
        cardText.classList.add("card-text");

        const artistLink = document.createElement("a");
        artistLink.classList.add("vst");
        artistLink.href = "#";
        artistLink.title = artist.name;
        artistLink.textContent = artist.name;

        const artistName = document.createElement("span");
        artistName.classList.add("artist-name");
        artistName.textContent = artist.name;

        console.log(artist.name);

        const artistCategory = document.createElement("span");
        artistCategory.classList.add("artist-categorie");
        artistCategory.textContent = "Artista";

        console.log(artistCategory);

        cardText.appendChild(artistLink);
        cardText.appendChild(artistName);
        cardText.appendChild(artistCategory);

        card.appendChild(cardImg);
        card.appendChild(cardText);

        artistContainer.appendChild(card);
    });
    mostraArtistas();
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        mostraPlaylists();
        escondeArtistas();
    } else {
        requestApi(searchTerm);
    }
})