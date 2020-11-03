// proj4
proj4.defs("6676","+proj=tmerc +lat_0=36 +lon_0=138.5 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs")
function to_map_projection(epsg_code, location) {
  return proj4(epsg_code).inverse(location)
}

// map
const map = L.map('map').setView([51.505, -0.09], 13)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
}).addTo(map)
let rectangle

// drop supports
const dropZone = document.getElementById('map')
const fileInput = document.getElementById('file-input')
dropZone.addEventListener('dragover', function(e) {
  e.stopPropagation()
  e.preventDefault()
}, false)

dropZone.addEventListener('dragleave', function(e) {
  e.stopPropagation()
  e.preventDefault()
}, false);

dropZone.addEventListener('drop', function(e) {
  e.stopPropagation()
  e.preventDefault()
  const files = e.dataTransfer.files
  previewFile(files[0])
}, false)

// read file
function previewFile(blob) {
  const lasParser = new LasParser(blob)
  const target = document.getElementById('floating')
  lasParser.read(target, (max_x, min_x, max_y, min_y) => {
    console.log(max_x, min_x, max_y, min_y)
    const max = proj4("6676").inverse([max_x, max_y])
    const min = proj4("6676").inverse([min_x, min_y])
    console.log(min, max)
    const bounds = [min.reverse(), max.reverse()];
    if (rectangle) {
      map.removeLayer(rectangle)
    }
    rectangle = L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
    map.fitBounds(bounds);
  })
}

