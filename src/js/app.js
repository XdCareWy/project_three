var datas = [
	{	
		id: 1,
		name: "地坛公园",
		latlng: {
			lat: 39.953031,
			lng: 116.416121
		},
		visible: true,
		title: "地坛公园"
	},
	{	
		id: 2,
		name: "北海公园",
		latlng: {
			lat: 39.925447,
			lng: 116.389195
		},
		visible: true,
		title: "北海公园"
	},
	{	
		id: 3,
		name: "圆明园遗址公园",
		latlng: {
			lat: 40.008065,
			lng: 116.298182
		},
		visible: true,
		title: "圆明园遗址公园"
	},
	{	
		id: 4,
		name: "天坛公园",
		latlng: {
			lat: 39.883918,
			lng: 116.412894
		},
		visible: true,
		title: "天坛公园"
	},
	{	
		id: 5,
		name: "望京soho",
		latlng: {
			lat: 39.996203,
			lng: 116.480772
		},
		visible: true,
		title: "望京soho"
	}
];

// Location *Model*
function Location(data) {
	var self = this;
	self.id = ko.observable(data.id);
	self.name = ko.observable(data.name);
	self.latlng = ko.observable(data.latlng);
	self.visible = ko.observable(data.visible);
	self.description = ko.observable(data.description);
	self.imgSrc = ko.observable("http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+data.name);
}

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function LocationViewModel() {
    var self = this;
    self.hideStatus = ko.observable(false);
    self.locations = ko.observableArray([]);
    datas.forEach(function(item) {
    	self.locations.push(new Location(item));
    })

    self.filterText = ko.observable();
    // This is a filter event. User input any, then filter.
	self.filterEvent = function() {
		self.locations().map(function(item) {
			if(!item.name().match(self.filterText())){
				item.visible(false);
				markers[item.id()-1].setVisible(false)
			}else {
				item.visible(true);
				markers[item.id()-1].setVisible(true)
			}
		});
	}
	self.setLoaction = function(v) {
		self.getData(v)
		for (var i = 0; i < markers.length; i++) {
			if(markers[i].id === v.id()){
				map.setCenter(v.latlng());
				markers[i].setMap(map);
			}
        }
	}

	self.toggleNavbar = function() {
		self.hideStatus(!self.hideStatus());
	}

	self.getData = function(v) {
		var wiki_url = "https://zh.wikipedia.org/w/api.php?action=opensearch&search="+v.name()+"&format=json&callback=wikiCallback";
	    $.ajax({
	        url: wiki_url,
	        dataType: "jsonp",
	        success: function(res){
	        	var res_data = res[2][0] || res[2][1] || res[1][0];
	        	v.description(res_data.slice(0,30));
	        }
	    })
	    .fail(function() {
	    	v.description("服务异常");
	    });
	}

}

// Activates knockout.js
ko.applyBindings(new LocationViewModel());