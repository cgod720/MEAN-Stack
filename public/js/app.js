const app = angular.module('TheApp', []);

app.controller('MainController', ['$http', function($http){
  this.includePath  = 'partials/landing.html';

  this.changeInclude = (path) => {
    this.includePath = 'partials/' + path + '.html';
  }


  this.createUser = () => {
    $http({
      method: "POST",
      url: '/users',
      data: {
        username: this.userName,
        password: this.password
      }
    }).then((response) => {
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
        this.currentUser = response.data;
    }, (err) => {
        console.log(err);
    })
  }

  this.logOut = () => {
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then((response) => {
      this.currentUser = false;
    },
    (error) => {
      console.error(error);
    })
  }

  this.getCurrentUser = () => {
    $http({
      method: 'GET',
      url: 'sessions/currentUser'
    }).then((response) => {
      this.currentUser = response.data;
    },
    (error) => {
      console.error(error);
    })
  }

  this.getCurrentUser();
}]);

app.controller('PlacesController', ['$http', function($http) {
  const controller = this;

  this.createPlace = () => {
    $http({
    method: 'POST',
    url: '/places',
      data: {
        name: this.name,
        location: this.location,
        createdBy: this.createdBy
      }
  }).then(function(response) {
    console.log(response);
  }, function(error) {
    console.log(err);
  });
 }

 this.pullLocation = (data) => {
   $http({
     method: 'GET',
     url: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCqDaNbp7xk07SRPEDtRTZKAMePvafg47A&q=Empire+State+Building'
       // data: {
       //   Title: this.Title,
       //   Year: this.Year,
       //   Released: this.Released
       // }
   }).then(function(response) {
     console.log(response);
   }, function(err) {
     console.log(err);
   });
 }
}]);
