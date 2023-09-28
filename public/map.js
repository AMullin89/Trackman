mapboxgl.accessToken =
"pk.eyJ1IjoibXVsbGluODkiLCJhIjoiY2xtNGF2NjluMTFnNTNnbnoxYndzZThoMyJ9.tq26GwO-nq4DJSZ9GECBEA";

let map = new mapboxgl.Map({
container: "map",
style: "mapbox://styles/mapbox/streets-v11",
center: [0.63646, 51.78791],
zoom: 13
});

const vehicleData = document.getElementById('vehicle-container').getAttribute('data');

const finalVehicleData = JSON.parse(vehicleData);
console.log(finalVehicleData);

for (let i = 0; i < finalVehicleData.length; i++) {

    const carIcon = document.createElement('img');

carIcon.src = 'car (1).png'
carIcon.width = 15;
carIcon.height = 15;

    const popup = new mapboxgl.Popup().setHTML(
      `<div id="vehicle-popup"><h3>${finalVehicleData[i].vrm}</h3>
      <p>${finalVehicleData[i].make}, ${finalVehicleData[i].model}</p>
      <p>${finalVehicleData[i].color}</p></div>`
    );
  
    const longLat = [finalVehicleData[i].latitude, finalVehicleData[i].longitude] ; // Note the corrected order
  
    const vehicleCardElement = document.getElementById(i + 1);
    const marker = new mapboxgl.Marker(carIcon).setLngLat(longLat).addTo(map);
    marker.setPopup(popup);
  
    function centerMap() {
      map.setCenter(longLat);
    }
  
    vehicleCardElement.addEventListener('click', centerMap);
    vehicleCardElement.addEventListener('touchend', centerMap);
  }
  


