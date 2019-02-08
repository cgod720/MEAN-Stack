const app = angular.module('TheApp', []);

app.controller('MainController', ['$http', function($http){

  this.createUser = () => {
    $http({
      method: "POST",
      url: '/users',
      data: {
        username: this.userName,
        password: this.password
      }
    }).then((response) => {
        this.createdUserName = response.data.username;
        console.log(response);
    }, (err) => {
        console.log(err);
    })
  }

  this.logIn = () => {
    $http({
      method: "POST",
      url: '/sessions',
      data: {
        username: this.user,
        password: this.pass
      }
    }).then((response) => {
        // this.createdUserName = response.config.data.username;
        console.log(response);
    }, (err) => {
        console.log(err);
    })
  }
}]);

function findMe() {
  var output = document.getElementById('out');

  if (!navigator.geolocation){
     output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
     return;
   }

   function success(position) {
     var latitude  = position.coords.latitude;
     var longitude = position.coords.longitude;

     output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

     var img = new Image();
     img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false&key=YOUR_API_KEY";

     output.appendChild(img);
   }

   function error() {
     output.innerHTML = "Unable to retrieve your location";
   }

   output.innerHTML = "<p>Locating…</p>";

   navigator.geolocation.getCurrentPosition(success, error);
 }
