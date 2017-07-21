var map;
var markers = [];
var hightlightIcon;
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 39.996203, lng: 116.480772},
		zoom: 12
	});

	var infoWindow = new google.maps.InfoWindow();
	var bound = new google.maps.LatLngBounds();
	hightlightIcon = markerIcon("beachflag.png");

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
		// add animation for marker
		marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 1380);
		infoWindow.setContent(marker.title);
		infoWindow.open(map, marker);
		infoWindow.addListener("closeclick", function(){
			infoWindow.marker = null;
		});
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

function mapErrorHandle() {
	alert("Google map's api is error!");
}