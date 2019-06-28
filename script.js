var myApp = angular.module('myApp',['firebase']);

myApp.controller('ratmilk', ['$scope', '$firebaseArray', '$firebaseObject', function($scope, $firebaseArray, $firebaseObject) {

    $scope.showTheForm = false;
    $scope.password = false;
    $scope.data = {
        pass: '',
        newShow: {
            date: '',
            dateData: '',
            link: '',
            title: '',
            time: '',
            venue: ''
        }
    }

    var today = new Date();
    function getShows() {
        var ref = firebase.database().ref('shows');
        console.log(ref);
        var shows = $firebaseArray(ref);
        shows.$watch(function () {
            angular.forEach(shows, function (show) {
                show.dateData = new Date(show.dateData);
                if (today < show.dateData) {
                    show.display = true;
                } else {
                    show.display = false;
                }
                console.log(show);
            })
            $scope.shows = shows;
        })
    }

    $scope.postShow = function() {
        if (!$scope.data.date) {
            $scope.showTheForm = false;
            $scope.password = false;
            return;
        }
        var numbers = $scope.data.newShow.date.split("/");
        var month = numbers[0];
        var day = numbers[1];
        var year = numbers[2];
        $scope.data.newShow.dateData = year+'-'+month+'-'+day;

        var args = $scope.data.newShow;
        $scope.shows.$add(args);
    }

    $scope.showPassword = function () {
        if ($scope.password == false) {
            $scope.password = true;
        } else {
            $scope.password == false;
        }
    }

    $scope.showForm = function () {
        if ($scope.data.pass === 'huesaisabadgirl') {
            $scope.showTheForm = true;
            $scope.password = false;
        } else {
            $scope.showTheForm = false;
            $scope.password = false;
        }
    }

    var init = function () {
        getShows();
    }

    init();
}]);
