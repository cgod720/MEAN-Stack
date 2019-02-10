const app = angular.module('TheApp', []);

app.controller('MainController', ['$http', function($http){
  this.includePath  = 'partials/landing.html';
  this.logInForm = {};
  this.signUpForm = {};
  this.errorMessage = '';

  this.changeInclude = (path) => {
    this.errorMessage = '';
    this.includePath = 'partials/' + path + '.html';
  }


  this.createUser = () => {
    this.errorMessage = '';
    if (!this.signUpForm.username) {
      this.errorMessage = 'Must provide username';
    } else if (!this.signUpForm.password) {
      this.errorMessage = 'Must provide password';
    } else {
      $http({
        method: "POST",
        url: '/users',
        data: {
          username: this.signUpForm.username,
          password: this.signUpForm.password
        }
      }).then((response) => {
          this.currentUser = response.data;
          this.includePath  = 'partials/map.html';
          this.signUpForm = {};
      }, (error) => {
          console.log(error);
          this.errorMessage = error.data.message;
      })
    }
  }

  this.logIn = () => {
    this.errorMessage = '';
    if (!this.logInForm.username) {
      this.errorMessage = 'Must provide username';
    } else if (!this.logInForm.password) {
      this.errorMessage = 'Must provide password';
    } else {
      $http({
        method: "POST",
        url: '/sessions',
        data: {
          username: this.logInForm.username,
          password: this.logInForm.password
        }
      }).then((response) => {
          this.currentUser = response.data;
          this.includePath  = 'partials/map.html';
          this.logInForm = {};
      }, (error) => {
          console.log(error);
          this.errorMessage = error.data.message;
      })
    }
  }

  this.logOut = () => {
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then((response) => {
      this.currentUser = false;
      this.includePath  = 'partials/landing.html';
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
      if (response.data) {
        this.includePath  = 'partials/map.html';
      } else {
        this.includePath  = 'partials/landing.html';
      }
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
