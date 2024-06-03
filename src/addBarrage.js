// basemap.js dosyasını içe aktar
import { map } from './basemap.js';

export var barrageList;

// Baraj listesi
var barrageList = [
    {
        name: "Tahtalı Barajı",
        latitude: 38.152322, 
        longitude: 27.113595
    },
    {
        name: "Balçova Barajı",
        latitude: 38.370276,
        longitude:  27.041390
    },
    {
        name: "Ürkmez Barajı",
        latitude: 38.098284, 
        longitude: 26.958425
    },
    {
        name: "Güzelhisar Barajı",
        latitude: 38.800908, 
        longitude: 27.121976
    },
    {
        name: "Gördes Barajı",
        latitude: 38.762327, 
        longitude: 28.068100
    },
    {
        name: "Alaçatı Kutlu Aktaş Barajı",
        latitude: 38.289216, 
        longitude: 26.413458
    }
];
// Baraj ikonu
var barrageIcon = L.icon({
    iconUrl: 'img/barrage.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// DOMContentLoaded olayını dinleyen fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // Haritadaki her bir barajı işaretlemek için map değişkenini kullanabiliriz
    barrageList.forEach(function(barrage) {
        L.marker([barrage.latitude, barrage.longitude], { icon: barrageIcon }).addTo(map)
            .bindPopup(barrage.name); // İşaretlenen noktanın adını bir popup'ta gösterelim
    });
});