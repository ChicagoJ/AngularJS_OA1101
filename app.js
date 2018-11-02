var myApp = angular.module('myApp', [])

myApp.controller('myCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    $http.get('people.json').then(function(response) {
      $scope.people = response.data.People
    })
    $scope.index = 4
    $scope.setIndex = function(index) {
      $scope.index = index
      console.log($scope.index)
    }
  }
])
myApp.directive('header', function() {
  return {
    restrict: 'AE',
    template: `
             <div>
                <input type="text" placeholder="Search" ng-model="search">
                <span style="float: right">Peter Hoang</span>
            </div>
            `
  }
})

myApp.directive('nameList', function() {
  return {
    restrict: 'AE',
    template: `
                <ul>
                    <li ng-click="updateIndex($index)" ng-repeat="person in people | filter: search">
                        {{person.name}} >
                    </li>
                </ul>
                `,
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
    template: `
                <div class="profile">
                    <img ng-src="{{people[index].img}}">
                    <div style="float:right;width:50%"><button class="btn btn-primary">SEND MESSAGE!</button><br>
                        <div class="rating" rating="people[index].rating || 0" max="5"></div>
                    </div>
                </div>
                <div class="describe">{{people[index].Description}}</div>
                <div>
                    <table>
                        <th>Likes</th>
                        <th>Dislikes</th>
                        <tr ng-repeat="i in people[index].Likes.length >= people[index].Dislikes.length? people[index].Likes: people[index].Dislikes">
                            <td>{{people[index].Likes[$index]||""}}</td>
                            <td>{{people[index].Dislikes[$index]||""}}</td>
                        </tr>
                    </table>
                </div>
            `
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
      template: `  
            <ul class="star">
            <li ng-repeat="star in stars"  ng-class="star">
            \u2665
            </li> 
            </ul>
            `,
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
          var starClass = 'far fa-star'
          if (star.filled) {
            starClass = 'fas fa-star'
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
