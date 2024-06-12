import { map } from './Basemaps.js';
import { barrageList } from './BarrageList.js';
import {barajDurum} from './Services.js';

// fetch ile baraj durum verisini alma
fetch(barajDurum)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            barrageList.forEach(barrage => {
                if (barrage.name === item.BarajKuyuAdi) {
                    barrage.dolulukOrani = item.DolulukOrani
                    barrage.suYuksekligi = item.SuYuksekligi
                    barrage.minimumSuYuksekligi = item.MinimumSuYuksekligi
                    barrage.maximumSuYuksekligi = item.MaksimumSuYuksekligi
                    barrage.barajDurumTarihi = item.DurumTarihi

                    // Doluluk oranına göre ikon belirleme
                    if (barrage.dolulukOrani <= 20) {
                        barrage.iconUrl = "img/percent0_20.png";
                    } else if (barrage.dolulukOrani > 20 && barrage.dolulukOrani <= 40) {
                        barrage.iconUrl = "img/percent20_40.png";
                    } else if (barrage.dolulukOrani > 40 && barrage.dolulukOrani <= 60) {
                        barrage.iconUrl = "img/percent40_60.png";
                    } else if (barrage.dolulukOrani > 60 && barrage.dolulukOrani <= 80) {
                        barrage.iconUrl = "img/percent60_80.png";
                    } else if (barrage.dolulukOrani > 80 && barrage.dolulukOrani <= 100) {
                        barrage.iconUrl = "img/percent80_100.png";
                    }

                    let icon = L.icon({
                        iconUrl: barrage.iconUrl,
                        iconSize: [32, 32], // ikon boyutu
                        iconAnchor: [16, 32], // ikonu haritaya bağlama noktası
                        popupAnchor: [0, -32] // popup konumlandırma
                    });

                    L.marker([barrage.latitude, barrage.longitude], { icon: icon })
                        .addTo(map)
                }
            });
        });
    })
    .catch(error => console.error('Fetch hatası:', error));