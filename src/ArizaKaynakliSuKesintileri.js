import { arizaKaynakliSuKesintileri } from "./Services.js";

fetch(arizaKaynakliSuKesintileri)
    .then(response => response.json())
    .then(data => {
        const kesintiBilgileri = data.map(item => ({
            kesintiTarihi: item.KesintiTarihi,
            ilceAdi: item.IlceAdi,
            mahalle: item.Mahalleler,
            tip: item.Tip,
            birim: item.Birim,
            kesintiSuresi: item.KesintiSuresi,
            aciklama: item.Aciklama
        }));

        // Kesinti bilgilerini eklemek için container elemanını alın
        const kesintiListElement = document.getElementById('kesintilist');
        kesintiListElement.innerHTML = ''; // Mevcut içeriği temizleyin

        // Her bir kesinti bilgisi için bir card (div) elemanı oluşturun ve container'a ekleyin
        kesintiBilgileri.forEach(kesinti => {
        const card = document.createElement('div');
        card.classList.add('card');

        // İçeriği oluşturun
        card.innerHTML = `
            <div><strong>Kesinti Tarihi:</strong> <span>${kesinti.kesintiTarihi}</span></div>
            <div><strong>İlçe Adı:</strong> <span>${kesinti.ilceAdi}</span></div>
            <div><strong>Mahalle:</strong> <span>${kesinti.mahalle}</span></div>
            <div><strong>Tip:</strong> <span>${kesinti.tip}</span></div>
            <div><strong>Birim:</strong> <span>${kesinti.birim}</span></div>
            <div><strong>Kesinti Süresi:</strong> <span>${kesinti.kesintiSuresi}</span></div>
            <div><strong>Açıklama:</strong> <span>${kesinti.aciklama}</span></div>
            `;

            // card elemanını container'a ekleyin
            kesintiListElement.appendChild(card);
        });
    })
    .catch(error => console.error('Fetch hatası:', error));
