// Define the colleges with their names and coordinates
const colleges = [
    {name: 'College of Agricultural and Environmental Sciences', coordinates: [0.334003, 32.566679]},
    {name: 'College of Business and Management Sciences', coordinates: [0.3363, 32.5660]},
    {name: 'College of Computing and Information Sciences', coordinates: [0.3322, 32.5703]},
    {name: 'College of Education and External Studies', coordinates: [0.3293, 32.5685]},
    {name: 'College of Engineering, Design, Art and Technology', coordinates: [0.3361, 32.5644]},
    {name: 'College of Health Sciences', coordinates: [0.3366, 32.5779]},
    {name: 'College of Humanities and Social Sciences', coordinates: [0.3326, 32.5678]},
    {name: 'College of Natural Sciences', coordinates: [0.3345, 32.5662]},
    {name: 'College of Veterinary Medicine, Animal Resources & Bio-security', coordinates: [0.3401, 32.5680]},
    {name: 'School of Law', coordinates: [0.3287, 32.5696]}
];

// Calculate the average center of all college coordinates
let avgLon = 0;
let avgLat = 0;
colleges.forEach(college => {
    avgLon += college.coordinates[1]; // Longitude is index 1
    avgLat += college.coordinates[0]; // Latitude is index 0
});
avgLon /= colleges.length;
avgLat /= colleges.length;

// Initialize the map using Leaflet
const map = L.map('map').setView([avgLat, avgLon], 15); // Set the center and zoom level

// Define base layers for OpenStreetMap, Satellite, and Hybrid
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors'
});

// Satellite imagery layer (Esri)
const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USGS, NGA, USDA, NPS',
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 19
});

// Hybrid imagery layer (Esri)
const hybridLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    attribution: 'Map data &copy; <a href="https://www.google.com/intl/en-US/maps/">Google</a>',
    maxZoom: 19,
    tileSize: 256
});

// Add the default base layer (OSM) to the map
osmLayer.addTo(map);

// Create icons for the markers (use a valid URL for the icon image)
const collegeIcon = L.icon({
    iconUrl: 'maps-and-location.png', // Replace with a valid icon image URL
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32] // Popup anchor point
});

// Add markers for each college on the map
colleges.forEach(college => {
    const marker = L.marker([college.coordinates[0], college.coordinates[1]], {icon: collegeIcon}).addTo(map);
    marker.bindPopup(`<strong>${college.name}</strong><br>Coordinates: ${college.coordinates[0].toFixed(4)}, ${college.coordinates[1].toFixed(4)}`);
});

// Layer toggle functionality for base map selector
document.getElementById('base-map-selector').addEventListener('change', function (e) {
    const selectedLayer = e.target.value;

    if (selectedLayer === 'OSM') {
        map.removeLayer(satelliteLayer);
        map.removeLayer(hybridLayer);
        map.addLayer(osmLayer);
    } else if (selectedLayer === 'Satellite') {
        map.removeLayer(osmLayer);
        map.removeLayer(hybridLayer);
        map.addLayer(satelliteLayer);
    } else if (selectedLayer === 'Hybrid') {
        map.removeLayer(osmLayer);
        map.removeLayer(satelliteLayer);
        map.addLayer(hybridLayer);
    }
});
