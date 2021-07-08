
//adding the earthquake URL
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//creating earthquakes as a new layergroup
var earthquakes = new L.LayerGroup();

//setting coordinates for middle of states
const USCoords = [38, -97];

//setting zoom level
const mapZoomLevel = 4;

//add the actual map to the screen using the api
var lightmap = L.map("map", {
    center: USCoords,
    zoom: mapZoomLevel
  });
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(lightmap);

var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

//create the base layers
var baseLayers = {
    "Light": lightmap,
    "Satelitte": satellitemap
};

//create top layers
var topLayers = {
    "Earthquakes": earthquakes
};

//create the map where I pass through the two layers to load in on page load
var myMap = L.map("map", {
    center: [45, 32],
    zoom: 2,
    layers: [lightmap, earthquakes]
});

//marker size of the magnitude (the magnitude changes based on how big it was)
function markerSize(magnitude) {
    return magnitude * 4;
};

//create layer control and add it to the map
//L.control.layers(baseLayers, topLayers).addTo(myMap);

L.control.layers(baseLayers, topLayers, {
    collapsed: false
  }).addTo(myMap);

//read the earthquake data and then once it's read, send it to featuresEQ
d3.json(earthquakeURL, function(earthquakeData) {
    FeaturesEQ(earthquakeData.features);
    console.log(earthquakeData.features)
  });

  function featuresEQ(earthquakeData) {
//making a popup for each circle
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
}

//read json with d3.json
d3.json(earthquakeURL, function(earthquakeData) {

    function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: .7,
          fillColor: chooseColor(feature.properties.mag),
          color: "#e31bbe",
          stroke: true,
          weight: .4
        };
        //create colors for the different circles
        function Color(magnitude) {
            if (magnitude > 5) {
                return 'darkred'
            } else if (magnitude > 4) {
                return 'orange'
            } else if (magnitude > 3) {
                return 'darkyellow'
            } else if (magnitude > 2) {
                return 'yellow'
            } else if (magnitude > 1) {
                return 'darkgreen'
            } else {
                return 'lightgreen'
            }
        };
        }
        return div;
    }

)



