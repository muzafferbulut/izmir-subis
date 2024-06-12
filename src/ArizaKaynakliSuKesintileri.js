import { arizaKaynakliSuKesintileri } from "./Services.js";

var kesintiBilgileri;

// Veri alma işlemi
fetch(arizaKaynakliSuKesintileri)
    .then(response => response.json())
    .then(data => {
        const kesintiListElement = document.getElementById('kesintilist');
        kesintiListElement.innerHTML = JSON.stringify(data);
        })
    .catch(error => console.error('Fetch hatası:', error));