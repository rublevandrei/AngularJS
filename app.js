var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.run(function($rootScope, $cookies) {



});

app.controller('home', function($scope, $cookies){

    $scope.test = 'test';

});

app.controller('login', function($scope, $cookies){

    var users = [{'name':'test@test.com', 'pass':'test'}];

    $cookies.put('users', users)

});

app.controller('register', function($scope, $cookies){

    var users = $cookies.get('users');

    alert(users['pass']);


});

app.config(function($routeProvider){
    $routeProvider
        .when("/",
        {
            templateUrl: "home/index.html",
            controller: "home",
            controllerAs: "app"
        })
        .when("/login",
        {
            templateUrl: "login/index.html",
            controller: "login",
            controllerAs: "app"
        })
        .when("/register",
        {
            templateUrl: "register/index.html",
            controller: "register",
            controllerAs: "app"
        })
        .otherwise({ redirectTo: '/login' });
});
