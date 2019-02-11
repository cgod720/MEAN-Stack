const app = angular.module('TheApp', []);

app.controller('MainController', ['$http', '$sce', '$scope', function($http, $sce, $scope){
  const controller = this;

  this.includePath  = 'partials/landing.html';
  this.logInForm = {};
  this.signUpForm = {};
  this.errorMessage = '';
  this.googlePlaces = [];
  this.editIndexForm = 1;

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
        this.getPlaces();
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

  this.getUserLocation = () => {
    // Make request to get user's public IP address
    $http({
      method: 'GET',
      url: 'https://api.ipify.org?format=json'
    }).then((json) => {
      // Make request to find user's location based on their public IP
      $http({
        method: 'GET',
        url: `http://ip-api.com/json/${json.data.ip}`
      }).then((response) => {
        // save lat and lon in currentLocation object
        this.currentLocation = {
          lat: response.data.lat,
          lon: response.data.lon
        }
      })
    })
  }

  this.getMapURL = () => {
    // If user's location is no known
    if (!this.currentLocation) {
      // return map of eiffel tower
      return $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=AIzaSyCqDaNbp7xk07SRPEDtRTZKAMePvafg47A&q=Eiffel+Tower,Paris+France');
    } else if (!this.currentDestination) {
      // if there is not set destination
      // return map of user's location
      return $sce.trustAsResourceUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyCqDaNbp7xk07SRPEDtRTZKAMePvafg47A&q=${this.currentLocation.lat},${this.currentLocation.lon}`);
    } else {
      // if user's location is available and a destination is set
      // display route
      return $sce.trustAsResourceUrl(`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCqDaNbp7xk07SRPEDtRTZKAMePvafg47A&origin=${this.currentLocation.lat},${this.currentLocation.lon}&destination=${this.currentDestination}`);
    }
  }

  this.getGooglePlaces = () => {
    // save google places library to places variable
    const places = new google.maps.places.PlacesService(document.createElement('div'));
    // set users current location to location variable
    const location = new google.maps.LatLng(this.currentLocation.lat,this.currentLocation.lon);

    // request places near user's location that match the searchTerm
    places.textSearch({
      query: controller.searchTerm,
      location: location,
      radius: '10000'
    }, (results, status) => {
      // If the request was successful
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // save list of places to variable
        controller.googlePlaces = results;
        // Force map view to re render
        $scope.$apply();
      }
    });
  }

  this.onLandingSearch = () => {
    // Clear errorMessage when go button is clicked
    this.errorMessage = '';
    // if there is no search term provided
    if (!this.searchTerm) {
      // render error message
      this.errorMessage = 'Must provide a search term';
    } else {
      // Find places nearby that match searchTerm
      this.getGooglePlaces(this.searchTerm);
      // navigate to map view
      this.includePath = 'partials/map.html';
    }
  }

  this.getCurrentUser = () => {
    // Make request to get current user
    $http({
      method: 'GET',
      url: 'sessions/currentUser'
    }).then((response) => {
      if(response.data) {
      this.getPlaces();
    }
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

  this.getPlaces = () => {
  $http({
    method: 'GET',
    url: '/places'
  }).then(function(response) {
    controller.savedPlaces = response.data;
  }, function(err) {
    console.log(err);
  })
}


this.deletePlace = (place) => {
  $http({
    method: 'DELETE',
    url: '/places/' + place._id
  }).then(function(response) {
  controller.getPlaces();
  }, function(err) {
    console.log(err);
  })
}

this.updatePlace = (place) => {
  $http({
    method: 'PUT',
    url: '/places/' + place._id,
      data: {
        name: this.updatedName
      }
  }).then(function(response){
    controller.getPlaces();
    controller.updatedName = '';
  }, function(err) {
    console.log(err);
  })
}

  this.getUserLocation();
  // Call getCurrentUser as soon as page loads
  this.getCurrentUser();
}]);
