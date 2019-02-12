const app = angular.module('TheApp', []);

app.controller('MainController', ['$http', function($http){
  this.includePath  = 'partials/landing.html';
  this.logInForm = {};
  this.signUpForm = {};
  this.errorMessage = '';

  this.changeInclude = (path) => {
    // clear errorMessage whenever navigating to a different page
    this.errorMessage = '';
    this.includePath = 'partials/' + path + '.html';
  }


  this.createUser = () => {
    // Clear errorMessage
    this.errorMessage = '';

    // If there is no provided username
    if (!this.signUpForm.username) {
      // Display an error message
      this.errorMessage = 'Must provide username';
    } else if (!this.signUpForm.password) {
      // If there is no provided password
      // Display an error message
      this.errorMessage = 'Must provide password';
    } else {
      // Make request to create user
      $http({
        method: "POST",
        url: '/users',
        data: {
          username: this.signUpForm.username,
          password: this.signUpForm.password
        }
      }).then((response) => {
          // set current user to user returned from db
          this.currentUser = response.data;
          // navigate to the map view
          this.includePath  = 'partials/map.html';
          // clear signUpForm fields
          this.signUpForm = {};
      }, (error) => {
          // request returned an error
          console.log(error);
          // set errorMessage to message returned from request
          this.errorMessage = error.data.message;
      })
    }
  }

  this.logIn = () => {
    // Clear errorMessage
    this.errorMessage = '';

    // If there is no provided username
    if (!this.logInForm.username) {
      // Display an error message
      this.errorMessage = 'Must provide username';
    } else if (!this.logInForm.password) {
      // If there is no provided password
      // Display an error message
      this.errorMessage = 'Must provide password';
    } else {
      // Make request to log user in
      $http({
        method: "POST",
        url: '/sessions',
        data: {
          username: this.logInForm.username,
          password: this.logInForm.password
        }
      }).then((response) => {
          // set current user to user returned from db
          this.currentUser = response.data;
          // navigate to the map view
          this.includePath  = 'partials/map.html';
          // clear logInForm fields
          this.logInForm = {};
      }, (error) => {
          // request returned an error
          console.log(error);
          // set errorMessage to message returned from request
          this.errorMessage = error.data.message;
      })
    }
  }

  this.logOut = () => {
    // Make request to log out current user
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then((response) => {
      // set currentUser to false
      this.currentUser = false;
      // navigate to landing view
      this.includePath  = 'partials/landing.html';
    },
    (error) => {
      console.error(error);
    })
  }

  this.getCurrentUser = () => {
    // Make request to get current user
    $http({
      method: 'GET',
      url: 'sessions/currentUser'
    }).then((response) => {
      // if a user is logged in, currentUser will equal user object
      // if a user is not logged in, currentUser will equal false
      this.currentUser = response.data;

      // If there is a logged in user
      if (response.data) {
        // navigate to map view
        this.includePath  = 'partials/map.html';
      } else {
        // navigate to landing page
        this.includePath  = 'partials/landing.html';
      }
    },
    (error) => {
      console.error(error);
    })
  }

  // Call getCurrentUser as soon as page loads
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
      console.log(response.data);
      this.name = place.name
      this.location = place.pullLocation;
      this.createdBy = this.currentUser;
      console.log(this.name, this.currentUser);
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

 this.getDestination = () => {
   $http({
     method: "GET",
     url: "",
     data: {
       name: this.name,
       location: this.location
     }
   }).then((response) => {
        console.log(response);
   }, (err) => {
        console.log(err);
   })
 }

}]);
