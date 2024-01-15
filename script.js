const searchButton = document.querySelector('#button-addon2');
const inputKeyword = document.querySelector('.input-keyword');
document.body.style.backgroundImage = 'url(img/sky.jpg)';

searchButton.addEventListener('click', function() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputKeyword.value+"&appid=1fe5f03e8b679377cbc41601289edfdd&units=metric")
        .then(response => response.json())
        .then(response => {
            let result = document.querySelector('.result');

            // Menetapkan kategori suhu
            let temperatureCategory;
            if (response.main.temp >= 25 && response.main.temp <= 35) {
                temperatureCategory = "Sangat Baik (Optimal)";
            } else if (response.main.temp > 20 && response.main.temp <= 40) {
                temperatureCategory = "Baik (Cukup Baik)";
            } else if (response.main.temp < 20 || response.main.temp > 40) {
                temperatureCategory = "Cukup (Cukup Panas atau Dingin)";
            } else if (response.main.temp < -10 || response.main.temp > 60) {
                temperatureCategory = "Buruk (Ekstrim)";
            } else {
                temperatureCategory = "Tidak Diketahui";
            }

            // Menetapkan kategori awan
            let cloudCategory;
            if (response.clouds.all >= 0 && response.clouds.all <= 10) {
                cloudCategory = "Sangat Baik";
            } else if (response.clouds.all > 10 && response.clouds.all <= 30) {
                cloudCategory = "Baik";
            } else if (response.clouds.all > 30 && response.clouds.all <= 70) {
                cloudCategory = "Cukup";
            } else if (response.clouds.all > 70 && response.clouds.all <= 100) {
                cloudCategory = "Buruk";
            } else {
                cloudCategory = "Tidak Diketahui";
            }

            // Menampilkan hasil dengan kategori suhu dan awan
            result.innerHTML = `<h2 style="margin-bottom: 15px;">${response.name}, ${response.sys.country}</h2>
                                <h5><span class="temp">${response.main.temp}°С</span> <span class="temp">${response.weather[0].description}</span></h5>
                                <p style="text-align: center" style="margin-bottom: 17px;">Suhu ${response.main.temp_min}°С ke ${response.main.temp_max}°С</p>
                                <h5>Kecepatan Angin : ${response.wind.speed} m/s</h5>
                                <h5 style="margin-bottom: 17px;">Awan : ${response.clouds.all}% (${cloudCategory})</h5>
                                <h4 style="color: #012443;">Geo Coordinates : [${response.coord.lat}, ${response.coord.lon}]</h4>
                                <h5 style="margin-top: 17px;">Kecocokan Suhu untuk PLTS : ${temperatureCategory}</h5>`;
        });

    inputKeyword.value = null;
});
