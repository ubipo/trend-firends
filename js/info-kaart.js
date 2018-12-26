
function initMap() {
    let coords = [51.02839, 4.48070];

    let map = L.map('map');
    map.setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.be/osmbe/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
        maxZoom: 18,
        id: 'mapnik-osmbe'
    }).addTo(map);
    let marker = L.marker(coords).addTo(map);
    marker.bindPopup(`
        <address class="address-block">
            <span class="address-block__line address-block__line--title"><a class="article__link" href="https://www.savamechelen.be/">Brasserie Sava</a></span>
            <span class="address-block__line">Grote Markt 13, 2800 Mechelen</span>
            <span class="address-block__line">+32 015 64 70 90</span>
        </address>
    `)
}


window.addEventListener("load", _ => {
    initMap();
});

if (document.readyState === "complete") {
    initMap();
}
