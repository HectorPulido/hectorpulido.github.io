var app = angular.module('heroApp', []);

app.controller('heroController', function($scope) {
    $scope.loading = true;
    $scope.data = [
        {
            name : "Some cool unity project",
            img : "https://picsum.photos/300/300",
            tags : ["Unity, Gamedev"]
        },
        {
            name : "Some cool ml project",
            img : "https://picsum.photos/300/300",
            tags : ["ml, machine learning"]
        }
    ];

    $scope.loadPosts = function (){
        var db = firebase.firestore();

        let temp = [];

        db.collection("projectos").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                temp.push({
                    name : doc.data().titulo,
                    tags : doc.data().tags,
                    img : doc.data().url_image
                });
            });
            console.log(temp);
            $scope.$apply(function () {
                $scope.data = temp;
                $scope.loading = false;
            });
        });

    }
  });