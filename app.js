var myApp = angular.module('myApp', [])

myApp.controller('myCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    $http.get('people.json').then(function(response) {
      $scope.people = response.data.People
    })
    $scope.index = 0
    $scope.setIndex = function(index) {
      $scope.index = index
      console.log($scope.index)
    }
  }
])
myApp.directive('header', function() {
  return {
    restrict: 'AE',
    templateUrl: 'header.html',
    controller: function($scope) {
      $scope.clearInput = function() {
        $scope.search = ''
      }
    }
  }
})

myApp.directive('nameList', function() {
  return {
    restrict: 'AE',
    templateUrl: 'sidebar.html',
    link: function(scope, elem, attrs) {
      scope.updateIndex = function(index) {
        scope.index = index
        console.log(scope.index)
      }
    }
  }
})

myApp.directive('centerPanel', function() {
  return {
    restrict: 'AE',
    templateUrl: 'centerPanel.html'
  }
})

myApp.directive('rating', [
  function() {
    return {
      restrict: 'AE',
      scope: {
        rating: '=rating',
        max: '=max'
      },
      templateUrl: 'rating.html',
      link: function(scope, elem, attrs) {
        scope.updateStars = function() {
          scope.stars = []
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: scope.rating > i
            })
          }
        }
        scope.starClass = function(star, idx) {
          var starClass = 'far fa-heart'
          if (star.filled) {
            starClass = 'fas fa-heart'
          }
          return starClass
        }
        scope.$watch('rating', function(oldVal, newVal) {
          if (newVal || newVal === 0) {
            scope.updateStars()
          }
        })
      }
    }
  }
])
