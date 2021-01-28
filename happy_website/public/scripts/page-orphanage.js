const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}
// get values from html o
const lat = document.querySelector('span[data-lat]').dataset.lat
const lng = document.querySelector('span[data-lng]').dataset.lng

// create map
const map = L.map('mapid',options).setView([lat,lng], 16)

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

// create icon 
const icon = L.icon({
    iconUrl: '/images/map-marker.svg',
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]
})


// create and add marker

L
.marker([lat,lng], {icon})
.addTo(map)

// image gallery

function selectImage(event){
    const button = event.currentTarget
    
    //remove all classes .active
    const buttons = document.querySelectorAll(".images button")

    buttons.forEach(removeActiveClass)
    
    function removeActiveClass(button){
        button.classList.remove("active")
    }
    // select the clicked image
    const image = button.children[0]
    const imageContainer = document.querySelector(".orphanage-details > img")
    
    //update the main image
    /* const tempImage = imageContainer 
    image.src = tempImage.src */
    
    imageContainer.src = image.src
    // add back the class .active with the image that was clicked
    button.classList.add('active')

}