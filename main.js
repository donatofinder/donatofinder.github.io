var app = angular.module('donatoFinderApp', []);


app.controller('myCtrl', function ($scope, $http) 
{
    $scope.season = "20202021";
    $scope.getStats = function(time)
    {
      $scope.season = time;
      $http.get('https://statsapi.web.nhl.com/api/v1/people/8477987/stats?stats=statsSingleSeason&season=' + $scope.season).then(
        function successCallback(response) {
          $scope.stats = response;
          $scope.gamesPlayed = response.data.stats[0].splits[0].stat.games;
          $scope.goals = response.data.stats[0].splits[0].stat.goals;
          $scope.assists = response.data.stats[0].splits[0].stat.assists;
          $scope.points = response.data.stats[0].splits[0].stat.points;
        }
      );
    }

    $scope.getPersonal = function()
    {
      $http.get('https://statsapi.web.nhl.com/api/v1/people/8477987').then(
        function successCallback(response) {
          $scope.personal = response;
          $scope.team = response.data.people[0].currentTeam.name;
          $scope.age = response.data.people[0].currentAge
        }
      );
    }

    $scope.getPersonal();
});