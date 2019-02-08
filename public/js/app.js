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
        this.createdUserName = response.config.data.username;
        console.log(this.createdUserName);
        console.log(response);
    }, (err) => {
        console.log(err);
    })
  }
}])
