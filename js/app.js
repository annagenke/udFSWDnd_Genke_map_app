var infoWindow;
var map;
var service;

// initMap
function initMap() {

    // Constructor creates a new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: zoom
    });

    //bind for view model
    ko.applyBindings(new ViewModel());
}

// Location Object
// Location has the data for each point
// and the marker
//implementation inspired by https://github.com/doobieroo/Neighborhood-Map
var Location = function(data) {
    var self = this;

    //create the info window inside the Location object
    //easier binding
    infoWindow = new google.maps.InfoWindow();

    this.name = data.name;
    this.lat = data.location.lat;
    this.lng = data.location.lng;
    this.visible = ko.observable(true);
    this.street = '';
    this.city_st_zip = '';
    this.rating = '';
    this.photoRef ='';

    //google places API
    var googlePlacesSearchURL = placeSearch + this.name + placesParams + this.lat+','+this.lng +'&key='+google_api_key;
    var request = {
        query: this.name,
        fields: ['rating', 'photos'],
    };
    //service has to be used to avoid CORS policy issue
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            self.rating = results[0].rating;
            //  Faced issues with adding Photos, will revisit
            // self.photoRef = results[0].photos[0].html_attributions[0];
        }
    });



    //Foursquare API Because google places doesn't satisfy 3rd API party requirement
    var foursquareURL = FSvenueSearchURL + this.lat + ',' + this.lng + clientID + clientSecret + '&intent=match&query=' + this.name;

    // Parse JSON object returned by Foursquare API
    $.getJSON(foursquareURL).done(function(json) {
        var results = json.response.venues[0];
        if (results) {
            if(results.location.formattedAddress[0] === undefined)
            {
                self.street = '';
            }else{
                self.street = results.location.formattedAddress[0];
            };
            if(results.location.formattedAddress[1] === undefined)
            {
                self.city_st_zip = '';
            }else{
                self.city_st_zip = results.location.formattedAddress[1];
            };
        };

    });


    // Construct marker for this location object.
    // by having the marker inside a location object, it is easier to bind
    // with location info
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.location),
        title: data.name,
        animation: google.maps.Animation.DROP,
        map: map
    });

    // If Location is not visisbel in list, set the map to null
    this.showMarker = ko.computed(function() {
        var result = this.visible();
        if(result) {
            this.marker.setMap(map);
        }else {
            this.marker.setMap(null);
        }
        return result;
    }, this);

    //adds listener for click, displays infoWindow if clicked
    this.marker.addListener('click', function() {
        self.contentStr = '<div><strong>' + data.name + '</strong></div><br>'+'' +
            '<div>' + self.street + '</div>' +
            '<div>' + self.city_st_zip + '</div>'+
            '<div>' + self.rating + '<i class="fas fa-star"></i></div>';

        infoWindow.setContent(self.contentStr);

        // Add bounce to the marker
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.marker.setAnimation(null);
        }, 1000);
        //saw other students adding timeout so it doesn't keep bouncinh

        // Pan to the marker and open its information
        infoWindow.open(map, this);
    });

};


//The View Model that links view and model
var ViewModel = function() {
    var self = this;

    this.locations = ko.observableArray([]);
    this.search = ko.observable('');

    // Feed the data from our initial array into Location array
    LocationList.forEach(function(locationItem){
        self.locations.push( new Location(locationItem) );
    });

    // Listen to see if the user clicks on a list item
    this.listClick = function() {
        google.maps.event.trigger(this.marker, 'click');
    };

    // If the user enters a search criteria, filter what's visible in the
    this.filtered = ko.computed (function() {
        var filter = self.search().toLowerCase();
        if (!filter) {
            self.locations().forEach(function(locationItem) {
                locationItem.visible(true);
            });
        } else {
            return ko.utils.arrayFilter(self.locations(),
                function(locationItem) {
                    var name = locationItem.name.toLowerCase();
                    var result = (name.includes(filter));
                    locationItem.visible(result);
                    return result;
                });
        }
    });
};

// onerror="googleMapError()" called if google Map cannot load
function googleMapError() {
    window.alert('The map could not be loaded.');
}