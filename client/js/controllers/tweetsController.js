app.controller('TweetsController', ['$scope', '$rootScope', 'TweetsFactory', "$timeout",
  function ($scope, $rootScope, TweetsFactory, $timeout) {

    $scope.tweetsArray;
    const tweets = $("#tweets");
    const search = $("#abcd");

    $scope.showTweets = function () {
      $timeout( function(){
      TweetsFactory.create($rootScope.trendQuery).then(
        function (response) {
          console.log(response);
          var tweets = [];
          for (var i = 0; i < 5; i++) {
            tweets.push(response.data[i]);
          }
          $scope.tweetsArray = tweets;
          $scope.stringBasedHTML();
        },
        function (error) {
          console.log('Unable to retrieve tweets:', error);
        }
      );
    }, 1500);
  }

    $scope.searchResult;
    $scope.searchTweets = function () {
      if ($scope.searchQuery) {
        encodedQuery = encodeURIComponent($scope.searchQuery);
        TweetsFactory.getTweetsByQuery(encodedQuery).then(
          function (response) {
            var tweets = [];
            for (var i = 0; i < 5; i++) {
              tweets.push(response.data[i]);
            }
            $scope.searchResult = tweets;
          },
          function (error) {
            console.log('Unable to retrieve tweets:', error);
          }
        )
      }
    }

    $scope.stringBasedHTML = function () {
      var s = "";
      for (var i = 0; i < 5; i++) {
        s += $scope.tweetsArray[i];
      }
      tweets.html(s);
    }

    $scope.stringBasedHTML2 = function () {
      $timeout( function(){
        s = $scope.searchResult[0];
        search.html(s);
      },2000);
    }

    // function delay(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    // Show tweet data initially
    // $scope.showTweets();

    $scope.onloadFun = function() {
        $scope.showTweets();
    }
  }
]);
