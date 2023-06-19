import { products } from '/data.js';

const favouriteAlbums = [];
const favouriteTracks = [];

const albumElement = function(album) {

  const trackElement = function(track) {
    return `<li>${track.name}<button type="button" class="add-track-button" data-track-id="${track.track_id}">+</button></li>`
  }

  let tracksHtml = ``;

  album.details.forEach(track => {
    tracksHtml = tracksHtml + trackElement(track);
  })

  return `
    <div>
      <h1>${album.name}<button class="add-album-button" type="button" data-album-id="${album.id}">+</button></h1>
      <ol>${tracksHtml}</ol>
    </div>
  `;
}

const findAlbumById = function(albumId) {
  let albumToReturn = null
  
  products.forEach(album => {
    if (album.id === albumId) {
      albumToReturn = album 
    }
  })

  return albumToReturn;
}

const findTrackById = function (trackId) {
  let trackToReturn = null;

  products.forEach(album => {
    album.details.forEach(track => {
      if (track.track_id === trackId) {
        trackToReturn = track;
      }
    })
  })

  return trackToReturn;
}

const loadEvent = function() {
  const rootElement = document.getElementById("root");

  products.forEach(product => {
    rootElement.insertAdjacentHTML("beforeend", albumElement(product));
  })

  const addAlbumButtons = document.querySelectorAll(".add-album-button")

  addAlbumButtons.forEach(addAlbumButton => {
    addAlbumButton.addEventListener("click", event => {
      const albumId = parseInt(event.target.getAttribute("data-album-id"));
      const albumToAdd = findAlbumById(albumId);

      if (!favouriteAlbums.includes(albumToAdd)) {
        favouriteAlbums.push(albumToAdd);
        event.target.innerText = "-";
      } else {
        event.target.innerText = "+";
        favouriteAlbums.splice(favouriteAlbums.indexOf(albumToAdd), 1);
      }
      
      console.log(favouriteAlbums);
    });
  });

  const addTrackButtons = document.querySelectorAll(".add-track-button");

  addTrackButtons.forEach(trackButton => {
    trackButton.addEventListener("click", event => {
      const trackId = parseInt(event.target.getAttribute("data-track-id"));
      const trackToAdd = findTrackById(trackId);
      
      if (!favouriteTracks.includes(trackToAdd)) {
        favouriteTracks.push(trackToAdd);
        event.target.innerText = "-";
      } else {
        favouriteTracks.splice(favouriteTracks.indexOf(trackToAdd), 1);
        event.target.innerText = "+";
      }

      console.log(favouriteTracks);
    })
  })
}

window.addEventListener("load", loadEvent);
