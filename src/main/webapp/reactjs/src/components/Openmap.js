import React from "react";
import "ol/ol.css";
import {Map, View, Feature} from "ol";
//import TileLayer from 'ol/layer/Tile';
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";
import LayerGroup from "ol/layer/Group";
import GeoJSON from "ol/format/GeoJSON";
import {bbox as bboxStrategy} from "ol/loadingstrategy";
//Draw imports
import {Circle as CircleStyle, Fill, Stroke, Style, Icon, Text} from "ol/style";
import {Draw, Modify, Snap} from "ol/interaction";
import {Vector as VectorSource, Vector} from "ol/source";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import {fromLonLat, transform, transformExtent} from "ol/proj";
//Geo location imports
import Point from "ol/geom/Point";
import Geolocation from "ol/Geolocation";
import Geometry from "ol/geom/Geometry";
//Marker imports
import TileJSON from "ol/source/TileJSON";
//Variable imports
//import {iconX, iconY} from "./VehicleLayer.js";
//Cesium imports

class Openmap extends React.Component {
  render() {
    var control,
      controls = [];

    var myExtent = [
      3618440.741834922,
      4838769.704572259,
      3679297.1137508885,
      4872024.5526137715,
    ];

    //CREATING LAYER GROUPS
    var layers = [
      new TileLayer({
        source: new OSM(),
      }),
    ];

    //Style
    var style = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.6)",
      }),
      stroke: new Stroke({
        color: "#319FD3",
        width: 1,
      }),
      text: new Text({
        font: "12px Calibri,sans-serif",
        fill: new Fill({
          color: "#000",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 3,
        }),
      }),
    });
    //Style

    // #region Draw declaration
    var source = new VectorSource();
    var layersRasterVector = new LayerGroup({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: source,
          style: new Style({
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
            stroke: new Stroke({
              color: "#ffcc33",
              width: 2,
            }),
            image: new CircleStyle({
              radius: 7,
              fill: new Fill({
                color: "#ffcc33",
              }),
            }),
          }),
        }),
      ],
    });

    //#endregion

    //#region Layers
    var raster = new TileLayer({
      source: new OSM(),
    });

    var layersDefault = new LayerGroup({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });

    var layersRoads = new LayerGroup({
      name: "RoadsLayer",
      layers: [
        new VectorLayer({
          source: new VectorSource({
            url:
              "http://localhost:8080/geoserver/geo_test1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geo_test1%3Agis_osm_roads_free_1&maxFeatures=5000&outputFormat=application%2Fjson",
            //params: {'LAYERS': 'geo_test1:gis_osm_pois_free_1', 'TILED': true},
            //serverType: 'geoserver',
            //transition: 0,
            strategy: bboxStrategy,
            format: new GeoJSON(),
            crossOrigin: "Anonymous",
          }),
        }),
      ],
    });

    var layersTransport = new LayerGroup({
      name: "PublicTransportLayer",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8080/geoserver/geo_test1/wms",
            params: {LAYERS: "geo_test1:gis_osm_transport_free_1", TILED: true},
            serverType: "geoserver",
            transition: 0,
          }),
        }),
      ],
    });

    var layersBuildings = new LayerGroup({
      name: "BuildingsLayer",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8080/geoserver/geo_test1/wms",
            params: {
              LAYERS: "geo_test1:gis_osm_buildings_a_free_1",
              TILED: true,
            },
            serverType: "geoserver",
            transition: 0,
          }),
        }),
      ],
    });

    var layersPlaces = new LayerGroup({
      name: "PlacesLayer",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8080/geoserver/geo_test1/wms",
            params: {LAYERS: "geo_test1:gis_osm_places_free_1", TILED: true},
            serverType: "geoserver",
            transition: 0,
          }),
        }),
      ],
    });

    var layersWaterbody = new LayerGroup({
      name: "PlacesLayer",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8080/geoserver/geo_test1/wms",
            params: {LAYERS: "geo_test1:gis_osm_water_a_free_1", TILED: true},
            serverType: "geoserver",
            transition: 0,
          }),
        }),
      ],
    });

    var layersWaterway = new LayerGroup({
      name: "PlacesLayer",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8080/geoserver/geo_test1/wms",
            params: {LAYERS: "geo_test1:gis_osm_waterways_free_1", TILED: true},
            serverType: "geoserver",
            transition: 0,
          }),
        }),
      ],
    });

    var layersTraffic = new LayerGroup({
      name: "PlacesLayer",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8080/geoserver/geo_test1/wms",
            params: {LAYERS: "geo_test1:gis_osm_traffic_free_1", TILED: true},
            serverType: "geoserver",
            transition: 0,
          }),
        }),
      ],
    });

    var layersRailways = new LayerGroup({
      name: "PlacesLayer",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8080/geoserver/geo_test1/wms",
            params: {LAYERS: "geo_test1:gis_osm_railways_free_1", TILED: true},
            serverType: "geoserver",
            transition: 0,
          }),
        }),
      ],
    });

    var layersLanduse = new LayerGroup({
      name: "PlacesLayer",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8080/geoserver/geo_test1/wms",
            params: {LAYERS: "geo_test1:gis_osm_landuse_a_free_1", TILED: true},
            serverType: "geoserver",
            transition: 0,
          }),
        }),
      ],
    });

    var layersNatural = new LayerGroup({
      name: "PlacesLayer",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8080/geoserver/geo_test1/wms",
            params: {LAYERS: "geo_test1:gis_osm_natural_free_1", TILED: true},
            serverType: "geoserver",
            transition: 0,
          }),
        }),
      ],
    });

    var layersPofw = new LayerGroup({
      name: "PlacesLayer",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8080/geoserver/geo_test1/wms",
            params: {LAYERS: "geo_test1:gis_osm_pofw_free_1", TILED: true},
            serverType: "geoserver",
            transition: 0,
          }),
        }),
      ],
    });

    //#region Comment
    /*
		//EXAMPLE WMS LAYER (IMAGE)
		  var layersPois = new LayerGroup({
		    name: 'PointofInterestsLayer',
		    layers: [
		    new TileLayer({
		      source: new TileWMS({
		        url: 'http://localhost:8080/geoserver/geo_test1/wms',
		        params: {'LAYERS': 'geo_test1:gis_osm_pois_free_1', 'TILED': true},
		        serverType: 'geoserver',
		        transition: 0
		      })
		    }) ]
		  });

		//EXAMPLE GEOJSON LAYER
		var layersPois = new LayerGroup({
		  name: 'PointofInterestsLayer',
		  layers: [
		  new VectorLayer({
		    source: new VectorSource({
		      url: 'http://localhost:8080/geoserver/geo_test1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geo_test1%3Agis_osm_pois_free_1&maxFeatures=250&outputFormat=application%2Fjson',
		      //params: {'LAYERS': 'geo_test1:gis_osm_pois_free_1', 'TILED': true},
		      //serverType: 'geoserver',
		      //transition: 0,
		      format: new GeoJSON(),
		      crossOrigin: 'Anonymous'
		    })
		  }) ]
		});
		*/
    //#endregion

    var layersPois = new LayerGroup({
      name: "PointofInterestsLayer",
      layers: [
        new VectorLayer({
          source: new VectorSource({
            url:
              "http://localhost:8080/geoserver/geo_test1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geo_test1%3Agis_osm_pois_free_1&maxFeatures=10000&outputFormat=application%2Fjson",
            //params: {'LAYERS': 'geo_test1:gis_osm_pois_free_1', 'TILED': true},
            //serverType: 'geoserver',
            //transition: 0,
            format: new GeoJSON(),
            crossOrigin: "Anonymous",
          }),
        }),
      ],
    });

    //#endregion Layers

    var map = new Map({
      layers: layersRasterVector,
      target: "map",
      view: new View({
        center: fromLonLat([34, 39]),
        zoom: 6,
      }),
    });
    //console.log(map.getView().calculateExtent(map.getSize()));
    /*
		map.setView(
		  new View({
		    center: fromLonLat([34, 39]),
		    extent: map.getView().fit(myExtent, map.getSize()),
		    zoom: 16,
		  })
		);
		*/
    //map.getView().fit(myExtent, map.getSize());

    // #region Draw2

    var modify = new Modify({source: source});
    map.addInteraction(modify);

    var draw, snap; // global so we can remove them later
    var typeSelect = document.getElementById("type");

    function addInteractions() {
      draw = new Draw({
        source: source,
        type: typeSelect.value,
      });
      map.addInteraction(draw);
      snap = new Snap({source: source});
      map.addInteraction(snap);
    }

    //Handle change event.

    typeSelect.onchange = function () {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      addInteractions();
    };

    addInteractions();
    // #endregion Draw2

    //BUTTON TYPE LAYER CHANGE
    /*
		//document.getElementById("mySelect").addEventListener("Transport", console.log("a"));
		document.getElementById("transportMap").addEventListener("click", function() {
		  map.setLayerGroup(layersTransport);
		});

		document.getElementById("roadsMap").addEventListener("click", function() {
		  map.setLayerGroup(layersRoads);
		});

		document.getElementById("defaultMap").addEventListener("click", function() {
		  map.setLayerGroup(layersDefault);
		});
		*/

    //#region Checkbox
    var transportCheckbox = document.querySelector(
      "input[name=transportCheck]"
    );
    var roadsCheckbox = document.querySelector("input[name=roadsCheck]");
    var placesCheckbox = document.querySelector("input[name=placesCheck]");
    var poisCheckbox = document.querySelector("input[name=poisCheck]");
    var buildingsCheckbox = document.querySelector(
      "input[name=buildingsCheck]"
    );
    var landuseCheckbox = document.querySelector("input[name=landuseCheck]");
    var naturalCheckbox = document.querySelector("input[name=naturalCheck]");
    var pofwCheckbox = document.querySelector("input[name=pofwCheck]");
    var railwaysCheckbox = document.querySelector("input[name=railwaysCheck]");
    var trafficCheckbox = document.querySelector("input[name=trafficCheck]");
    var waterbodyCheckbox = document.querySelector(
      "input[name=waterbodyCheck]"
    );
    var waterwaysCheckbox = document.querySelector(
      "input[name=waterwaysCheck]"
    );
    //var checkbox = document.querySelector("input[name=vehicle1]");

    waterwaysCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersWaterway);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersWaterway);
      }
    });

    waterbodyCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersWaterbody);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersWaterbody);
      }
    });

    trafficCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersTraffic);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersTraffic);
      }
    });

    railwaysCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersRailways);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersRailways);
      }
    });

    pofwCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersPofw);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersPofw);
      }
    });

    naturalCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersNatural);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersNatural);
      }
    });

    landuseCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersLanduse);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersLanduse);
      }
    });

    transportCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersTransport);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersTransport);
      }
    });

    roadsCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersRoads);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersRoads);
      }
    });

    placesCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersPlaces);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersPlaces);
      }
    });

    poisCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersPois);
        //console.log(map.getView().calculateExtent(map.getSize()));
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersPois);
        //console.log(map.getView().calculateExtent(map.getSize()));
      }
    });

    buildingsCheckbox.addEventListener("change", function () {
      if (this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersBuildings);
      } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersBuildings);
      }
    });
    //#endregion Checkbox

    map.on("click", function (e) {
      map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        console.log(feature.getProperties().name);
      });
    });
    //layers.setVisible(true);

    //#region Geolocation
    var view = new View({
      center: [0, 0],
      zoom: 2,
    });

    var geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    });

    function el(id) {
      return document.getElementById(id);
    }

    el("track").addEventListener("change", function () {
      geolocation.setTracking(this.checked);
    });

    // update the HTML page when the position changes.
    geolocation.on("change", function () {
      el("accuracy").innerText = geolocation.getAccuracy() + " [m]";
      el("altitude").innerText = geolocation.getAltitude() + " [m]";
      el("altitudeAccuracy").innerText =
        geolocation.getAltitudeAccuracy() + " [m]";
      el("heading").innerText = geolocation.getHeading() + " [rad]";
      el("speed").innerText = geolocation.getSpeed() + " [m/s]";
    });

    // handle geolocation error.
    geolocation.on("error", function (error) {
      var info = document.getElementById("info");
      info.innerHTML = error.message;
      info.style.display = "";
    });

    var accuracyFeature = new Feature();
    geolocation.on("change:accuracyGeometry", function () {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });

    var positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: "#3399CC",
          }),
          stroke: new Stroke({
            color: "#fff",
            width: 2,
          }),
        }),
      })
    );

    geolocation.on("change:position", function () {
      var coordinates = geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
    });

    new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [accuracyFeature, positionFeature],
      }),
    });
    //#endregion

    //#region Icons
    var vehicleFeatures = [];
    var iconX = 34;
    var iconY = 39;

    //VEHICLES
    var iconFeature = new Feature({
      geometry: new Point(
        fromLonLat([
          iconX + Math.random() * 2 - 1,
          iconY + (Math.random() * 2 - 1),
        ])
      ),
      name: "Vehicle 1",
      population: 4000,
      rainfall: 500,
    });

    var iconFeature1 = new Feature({
      geometry: new Point(
        fromLonLat([
          iconX + Math.random() * 2 - 1,
          iconY + (Math.random() * 2 - 1),
        ])
      ),
      name: "Vehicle 2",
      population: 4000,
      rainfall: 500,
    });

    var iconFeature2 = new Feature({
      geometry: new Point(
        fromLonLat([
          iconX + Math.random() * 2 - 1,
          iconY + (Math.random() * 2 - 1),
        ])
      ),
      name: "Vehicle 3",
      population: 4000,
      rainfall: 500,
    });
    //VEHICLES END

    var iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "/331565-200.png",
        scale: 0.2,
      }),
    });

    iconFeature.setStyle(iconStyle);
    iconFeature1.setStyle(iconStyle);
    iconFeature2.setStyle(iconStyle);

    vehicleFeatures.push(iconFeature);
    vehicleFeatures.push(iconFeature1);
    vehicleFeatures.push(iconFeature2);

    //el("accuracy").innerText = geolocation.getAccuracy() + " [m]";
    //console.log(vehicleFeatures);

    var vectorSource = new VectorSource({
      features: [iconFeature, iconFeature1, iconFeature2],
    });

    var vectorLayerIcon = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayerIcon);
    //console.log(iconFeature.getProperties());

    function updateCoordinate(item) {
      var i;
      for (i = 0; i < item.length; i++) {
        iconX = iconX + (Math.random() * 2 - 1) / 10;
        iconY = iconY + (Math.random() * 2 - 1) / 10;
        var coord = fromLonLat([iconX, iconY]);
        item[i].getGeometry().setCoordinates(coord);
      }
    }

    var time = 1;

    //Simulating vehicles moving
    /*
    var interval = setInterval(function () {
      if (time <= 60) {
        //console.log(time);
        updateCoordinate(vehicleFeatures);
        time++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
    */

    //console.log(iconFeature.getProperties());

    //#endregion

    //Cesium

    return null;
  }
}

export default Openmap;
