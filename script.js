var map,google,osm,ciudadesCapa,paisesCapa,DepartamentoCapa,HidrografiaCapa;

const initialConfig=()=>{
   osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
  });

  // google = L.gridLayer.googleMutant({
  //   maxZoom: 24,
  //   type:'satellite'
  // });

  //CAPAS SATELITAL




}

function getColor(c) {
  return c == "Africa"
    ? "#008000"
    : c == "North America"
    ? "#0000FF"
    : c == "Oceania"
    ? "#7D2181"
    : c == "South America"
    ? "#FFFF00"
    : c == "Europe"
    ? "#ff8000"
    : c == "Asia"
    ? "#FF0000"
    : "#FFFFFF";
}

function stylePaises(feature) {
  return {
    fillColor: getColor(feature.properties.continent),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}

const cargarLeyendas=()=>{

  const legends=[
    {
      label:"Paises africa",
      type:"polygon",
      sides:5,
      color:"#008000",
      fillColor:"#008000",
      weight:2,
    },
    {
      label:"Paises North America",
      type:"polygon",
      sides:5,
      color:"#0000FF",
      fillColor:"#0000FF",
      weight:2,
    },
    {
      label:"Paises Oceania",
      type:"polygon",
      sides:5,
      color:"#7D2181",
      fillColor:"#7D2181",
      weight:2,
    },
    {
      label:"Paises South America",
      type:"polygon",
      sides:5,
      color:"#FFFF00",
      fillColor:"#FFFF00",
      weight:2,
    },
    {
      label:"Paises Europe",
      type:"polygon",
      sides:5,
      color:"#ff8000",
      fillColor:"#ff8000",
      weight:2,
    },
    {
      label:"Paises Asia",
      type:"polygon",
      sides:5,
      color:"#FF0000",
      fillColor:"#FF0000",
      weight:2,
    },
    {
      label:"Hidrografia",
      type:"polyline",
      color: "#3388ff",
      fillColor: "#3388ff",
      weight: 2
    }
  ]

  const legend=L.control.Legend({
    position:"bottomright",
    collapsed:false,
    symbolWidth:24,
    opacity:1,
    column:1,
    legends
  });

  legend.addTo(map);

}

const cargarOtrasCapas=()=>{

  paisesCapa=L.geoJSON(paises,{
    style: stylePaises,
  }).addTo(map);
  ciudadesCapa = L.geoJSON(ciudades, {
    pointToLayer: function (feature, latlng) {
      const isCapital = feature.properties.CAPITAL === "N";
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: isCapital ? "#FFD700" : "#008000", // Amarillo para capitales, verde para no capitales
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      });
    },
  }).addTo(map);
  HidrografiaCapa=L.geoJSON(hidrografia).addTo(map);

}


 const main=()=>{
    initialConfig();

    map = L.map("map", {
      center: [1.6144, -75.6117],
      zoom: 14,
      layers: [osm],
    });

    cargarOtrasCapas();

    var baseMaps={
      OpenStreeMap:osm,
    }

    var overlayMaps={
        Paises:paisesCapa,
        Ciudades:ciudadesCapa,
        Hidrografia:HidrografiaCapa
    }

    let layerControl=L.control.layers(baseMaps,overlayMaps).addTo(map);

    L.control.scale({
      imperial:false
    }).addTo(map);

    cargarLeyendas();


 }

 main()