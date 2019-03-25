const LocationList =[
    {name: 'Parker & Quinn', location: {lat: 40.7523645, lng: -73.9843616}},
    {name: 'The Malt House', location: {lat: 40.709609, lng: -74.0093344}},
    {name: 'The Five Mile Stone', location: {lat: 40.7772094, lng: -73.9518769}},
    {name: 'Trademark Taste + Grind', location: {lat: 40.7502573, lng: -73.9854582}},
    {name: 'The Smith', location: {lat: 40.7442372, lng: -73.9887775}},
    {name: 'Birch Coffee', location:{lat: 40.7803907,lng: -73.9533728}},
    {name: 'Culture Espresso', location: {lat: 40.7550594, lng: -73.9921483}},
    {name: 'City of Saints Coffee', location: {lat: 40.753052,lng:-74.0271073}},
    {name: 'Brooklyn Boulders Gowanus', location: {lat: 40.6798189, lng:-73.9840819}},
    {name: 'Brooklyn Boulders Queensbridge', location: {lat: 40.7525859, lng:-73.9401946}},
    {name: 'Ample Hills Creamery', location: {lat:;i 40.6789223,lng:-73.9873624}},
    {name: 'Central Park', location: {lat: 40.778752, lng: -73.963646}}
];

//Map set up
const center = {lat: 40.7368185, lng: -73.9782231};
const zoom = 12;
const google_api_key ="AIzaSyAkkFbgQ3uEiHnk3r5dILKP7aPp0y8U14M";

//Foursquare
const FSvenueSearchURL = 'https://api.foursquare.com/v2/venues/search?v=20161016&ll=';
const clientID = '&client_id=5MF3W0WL3LD5Q0IZJLMNW1RV0GTQWU2I1EO3DMPF0BYAKEC1';
const clientSecret = '&client_secret=SOL03P0A12VN4FG1JVVJTGDWD5SOPNNGKQAFFBLDQKKEMYGC';

//Google places
const placeSearch='https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input';
const placesParams ='&inputtype=textquery&fields=photos,rating&locationbias=circle:2000@';
const placesPhotoSearch ='https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=';