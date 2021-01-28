// create map
const map = L.map('mapid').setView([41.5512535,-8.4236012], 16)

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

// create icon 
const icon = L.icon({
    iconUrl: '/images/map-marker.svg',
    iconSize: [58,68],
    iconAnchor: [29,68],

})

let marker;

// create and add marker 
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    //remove icon
    marker && map.removeLayer(marker)

    // add icon layer 
    marker = L.marker([lat,lng],{icon}).addTo(map);

})

// upload photos
function addPhotoField(){
        // get photos container #images
        const container = document.querySelector('#images')
        // get container for double .new-upload
        const fieldsContainer = document.querySelectorAll('.new-upload')
        // realize clone from the last photo added
        const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
        
        //verify if the field its empty, if yes, not add to image container
        const input = newFieldContainer.children[0]
        if (input.value == ''){
            return
        }
        
        //clean the fields
        input.value = ''

        // add clone on container from #images
        container.appendChild(newFieldContainer)
 }

 // delete field 
 function deleteField(event){
     const span = event.currentTarget
     const fieldsContainer = document.querySelectorAll('.new-upload')
    
     if(fieldsContainer.length < 2){
        // clean the field
        span.parentNode.children[0].value = ''
        return
     }

     //delete field 
     span.parentNode.remove()

 }

 //select yes or no
 function toggleSelect(event){
    // delete class .active (from buttons)
    document.querySelectorAll('.button-select button')
    .forEach( button => button.classList.remove('active')) // function that remove class

    // add class .active on clicked button 
    const button = event.currentTarget
    button.classList.add('active')
    // get clicked button

     
    // update hidden input with selected value
     const input = document.querySelector('[name="open_on_weekends"]')
        // verify if yes or no
    input.value = button.dataset.value
 }