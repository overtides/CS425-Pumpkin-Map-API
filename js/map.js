/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let map;

// Only allows 1 overlay open at a time
let isOpen = null;

/** Initializes the map and the custom popup. */
async function initMap() {
    const mapsLibrary = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    const startPosition = {lat: 38.48183728130719, lng: -89.91605855725085};

    map = new google.maps.Map(document.getElementById("map"),  {
        zoom: 14,
        center: startPosition,
        mapId: "Braeutigam Orchards", // Map ID is required for advanced markers.
    });

    // This will be changed to accessing data in database in the future
    const markerData = [
      {
        lat: 38.48183728130719,
        lng: -89.91605855725085,
        img: "./images/icons8-farm-50.png",
        content:
          '<div class="info">' + 
          '<center><img src="./images/orchard.jpg" alt="Pumpkin" width="175px" height="125px"></center>' +
          '<div class="roboto-condense">Braeutigam Orchard</div>' + 
          '</div>'
      },
      {
        lat: 38.480534,
        lng: -89.941222,
        img: "./images/icons8-pumpkin-48.png",
        content: 
          '<div class="info">' + 
          '<div class="card-body p-2 style="position: relative"><p class="card-text small">Lat: 38.480534, Lng: -89.941222</p>' + 
          '<center><img src="./images/pumpkin.jpg" alt="Pumpkin" width="175px" height="125px"></center>' + 
          '<div class="roboto-condense">ACCURACY: 97%</div>' + 
          'Cultivar: Connecticut Field' + 
          '<br>Diseased?: No' + 
          '<br>Growth: 4 months' + 
          "</div>"
      },
      {
        lat: 38.491778,
        lng: -89.935807,
        img: "./images/icons8-pumpkin-48.png",
        content: 
          '<div class="info">' + 
          '<div class="card-body p-2 style="position: relative"><p class="card-text small">Lat: 38.480534, Lng: -89.941222</p>' + 
          '<center><img src="./images/pumpkin.jpg" alt="Pumpkin" width="175px" height="125px"></center>' + 
          '<div class="roboto-condense">ACCURACY: 97%</div>' + 
          'Cultivar: Connecticut Field' + 
          '<br>Diseased?: No' + 
          '<br>Growth: 4 months' + 
          "</div>"
      }
    ];

    markerData.forEach(data => {
      const iconContainer = document.createElement("div");
      // Applys custom markers
      iconContainer.className = "icon-container";

      // Adds image icon to icon container
      const img = document.createElement("img");
      img.src = data.img;
      iconContainer.appendChild(img);

      const marker = new AdvancedMarkerElement({
        map,
        position: {lat: data.lat, lng: data.lng},
        content: iconContainer
      });

        
      const infowindow = new google.maps.InfoWindow({
        content: data.content,
        ariaLabel: "Marker info"
      });

      marker.addListener("click", () => {
        // Close previously opened overlay
        if (isOpen) isOpen.close();

        // Opens current marker info
        infowindow.open({anchor: marker, map});

        // Tracks open InfoWindow
        isOpen = infowindow;
      });
    });
  }
window.initMap = initMap;