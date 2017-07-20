var map;
var markers = [];
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 39.996203, lng: 116.480772},
		zoom: 12
	});

	var infoWindow = new google.maps.InfoWindow();
	var bound = new google.maps.LatLngBounds();
	var hightlightIcon = markerIcon("beachflag.png");

	// create markers and add event
	for(var i = 0; i < datas.length; i++) {
		var mid = datas[i];
		var marker = new google.maps.Marker({
			position: mid.latlng,
			map: map,
			title: mid.title,
			id: mid.id,
			animation: google.maps.Animation.DROP,
		});
		markers.push(marker);
		bound.extend(marker.position);

		marker.addListener("click", function() {
			populateInfoWindow(this, infoWindow);
		});

		marker.addListener("mouseover", function() {
			this.setIcon(hightlightIcon);
		});

		marker.addListener("mouseout", function() {
			this.setIcon(null);
		});

		map.fitBounds(bound);
	}
}

function populateInfoWindow(marker, infoWindow) {
	if(infoWindow.marker !== marker){
		infoWindow.marker = marker;
		getData(marker.title);
		infoWindow.setContent(marker.title);
		infoWindow.open(map, marker);
	}
}

function markerIcon(img) {
	return {
		url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/'+img,
		size: new google.maps.Size(21, 34),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(10, 34),
		scaledSize: new google.maps.Size(21,34)
	};
}
