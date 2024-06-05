import { map } from './basemap.js';

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

var barajdurum;
var barrageDetails = [];

// Baraj ikonu
var barrageIcon = L.icon({
    iconUrl: 'img/barrage.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Modern pop-up tasarımı için CSS
const popupStyle = `
<style>
    .custom-popup {
        border-radius: 8px;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }
    .custom-popup h3 {
        margin: 0 0 5px;
        font-size: 16px;
        color: #006994; /* Su teması için mavi renk */
    }
    .custom-popup p {
        margin: 0;
        font-size: 14px;
        color: #555; /* Su teması için gri renk */
    }
</style>
`;

function initializeMap() {
    // Haritada her bir barajı işaretleme ve popup ekleme
    barrageDetails.forEach(barrage => {
        const popupContent = `
            ${popupStyle}
            <div class="custom-popup">
                <h3>${barrage.BarajKuyuAdi}</h3>
                <p><strong>Su Yüksekliği:</strong> ${barrage.SuYuksekligi} m</p>
                <p><strong>Doluluk Oranı:</strong> ${barrage.DolulukOrani} %</p>
                <p><strong>Durum Tarihi:</strong> ${barrage.DurumTarihi.split('T')[0]}</p>
            </div>
        `;

        L.marker([barrage.latitude, barrage.longitude], { icon: barrageIcon }).addTo(map)
            .bindPopup(popupContent);
    });

    // Arıza kaynaklı su kesintileri butonu ekleme
    L.Control.Button = L.Control.extend({
        onAdd: function(map) {
            var button = L.DomUtil.create('button', 'custom-button');
            fetch('https://openapi.izmir.bel.tr/api/izsu/arizakaynaklisukesintileri')
                .then(response => response.json())
                .then(data => {
                    button.innerHTML = `Arıza Kaynaklı Su Kesintileri (${data.length})`;
                })
                .catch(error => {
                    console.error('Su kesintileri verisi alınırken bir hata oluştu:', error);
                });

                button.onclick = function() {
                  fetch('https://openapi.izmir.bel.tr/api/izsu/arizakaynaklisukesintileri')
                      .then(response => response.json())
                      .then(data => {
                          console.log(data);
                      })
                      .catch(error => {
                          console.error('Su kesintileri verisi alınırken bir hata oluştu:', error);
                      });
              };
              
            return button;
        },

        onRemove: function(map) {
            // Nothing to do here
        }
    });

    L.control.button = function(opts) {
        return new L.Control.Button(opts);
    }

    L.control.button({ position: 'topright' }).addTo(map);
}

// DOMContentLoaded olayını dinleyen fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // Baraj durumu verilerini fetch etme
    fetch('https://openapi.izmir.bel.tr/api/izsu/barajdurum')
        .then(response => response.json())
        .then(data => {
            barajdurum = data;

            barrageDetails = barrageList.map(barrage => {
                let durum = barajdurum.find(d => d.BarajKuyuAdi === barrage.name);
                return {
                    BarajKuyuAdi: durum ? durum.BarajKuyuAdi : 'Veri yok',
                    SuYuksekligi: durum ? durum.SuYuksekligi : 'Veri yok',
                    DurulukOrani: durum ? durum.DolulukOrani : 'Veri yok',
                    DurumTarihi: durum ? durum.DurumTarihi : 'Veri yok',
                    latitude: barrage.latitude,
                    longitude: barrage.longitude,
                };
            });

            // Haritayı initialize et
            initializeMap();
        })
        .catch(error => {
            console.error('Baraj durumu verisi alınırken bir hata oluştu:', error);
        });
});
