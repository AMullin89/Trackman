mapboxgl.accessToken =
"pk.eyJ1IjoibXVsbGluODkiLCJhIjoiY2xtNGF2NjluMTFnNTNnbnoxYndzZThoMyJ9.tq26GwO-nq4DJSZ9GECBEA";

let map = new mapboxgl.Map({
container: "map",
style: "mapbox://styles/mapbox/streets-v11",
center: [0.63646, 51.78791],
zoom: 13
});

const popup = new mapboxgl.Popup().setHTML('<h3>Home Address</h3><p>12 Stainer Close, Witham, CM81RU</p>');

const vehicleData = document.getElementById('vehicle-container').getAttribute('data');

const finalVehicleData = JSON.parse(vehicleData);

for (let i = 0; i < finalVehicleData.length; i++){

    const vehicleCardElement = document.getElementById(i + 1);
    const longLat = [finalVehicleData[i].latitude, finalVehicleData[i].longitude];
    const marker = new mapboxgl.Marker().setLngLat(longLat).addTo(map);
marker.setPopup(popup);

function centerMap(){
    map.setCenter(longLat);
}

vehicleCardElement.addEventListener('click', centerMap)
};


