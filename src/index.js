import {barrageList} from "./addBarrage.js"

var barajdurum;

fetch('https://openapi.izmir.bel.tr/api/izsu/barajdurum')
  .then(response => response.json())
  .then(data => {
    barajdurum = data;
    console.log('Baraj durumu verisi alındı:', barajdurum);
  })
  .catch(error => {
    console.error('Baraj durumu verisi alınırken bir hata oluştu:', error);
  });