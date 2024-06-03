// Haritayı dışarıya export et
export var map;

// DOMContentLoaded olayını dinleyen fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // İzmir'in koordinatları (38.4237, 27.1428) ve başlangıç yakınlaştırma seviyesi (13)
    map = L.map('map').setView([38.4637, 27.15428], 10);

    // OpenStreetMap döşeme katmanı
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    });

    // Stamen Toner döşeme katmanı
    var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17
    });

    var OPNVKarte = L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
        maxZoom: 18
    });

    var stamenWaterColor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
        minZoom: 1,
        maxZoom: 16,
        ext: 'jpg'
    });

    var stamenTerrain = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
    });

    var esriImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    });

    // Varsayılan katman olarak OpenStreetMap ekleyelim
    osm.addTo(map);

    // Katman kontrolü ekleyelim
    var baseMaps = {
        "OpenStreetMap": osm,
        "Open Topo Map": OpenTopoMap,
        "OPNVKarte": OPNVKarte,
        "Stamen Water Color": stamenWaterColor,
        "Stamen Terrain": stamenTerrain,
        "ESRI Imagery": esriImagery
    };

    L.control.layers(baseMaps, null, {position: 'bottomright'}).addTo(map);
});
