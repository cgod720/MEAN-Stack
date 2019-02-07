const app = angular.module('TheApp', []);

app.controller('MainController', ['$http', function($http){
  this.test = "Testing yo";
}])
