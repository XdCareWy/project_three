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
			}else {
				item.visible(true);
			}
		});
	}

	self.setLoaction = function(v) {
		console.log(v.name())
		for (var i = 0; i < markers.length; i++) {
			if(markers[i].id !== v.id()){
          		markers[i].setMap(null);
			}else {
				map.setCenter(v.latlng());
				map.setZoom(15)
				markers[i].setMap(map);
			}
        }
	}

	self.toggleNavbar = function() {
		self.hideStatus(!self.hideStatus());
	}
}

function getData(city) {
	var wiki_url = "https://zh.wikipedia.org/w/api.php?action=opensearch&search="+city+"&format=json&callback=wikiCallback";
	var datas = [];
    $.ajax({
        url: wiki_url,
        dataType: "jsonp",
        success: function(data){
            var articleList = data[1];
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var u = 'https://zh.wikipedia.org/wiki/' + articleStr;
                datas.push({
                	articleStr: articleStr,
                	url: u
                });
            }
            return datas;
        }
    });
    return "loding";
}

// Activates knockout.js
ko.applyBindings(new LocationViewModel());