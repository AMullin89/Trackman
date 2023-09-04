mapboxgl.accessToken =
"pk.eyJ1IjoibXVsbGluODkiLCJhIjoiY2xtNGF2NjluMTFnNTNnbnoxYndzZThoMyJ9.tq26GwO-nq4DJSZ9GECBEA";

const map = new mapboxgl.Map({
container: "map",
style: "mapbox://styles/mapbox/streets-v11",
center: [0.63646, 51.78915],
zoom: 13
});

const popup = new mapboxgl.Popup().setHTML('<h3>Home Address</h3><p>12 Stainer Close, Witham, CM81RU</p>');

const home = new mapboxgl.Marker().setLngLat([0.63646, 51.78915]).addTo(map);
home.setPopup(popup);




