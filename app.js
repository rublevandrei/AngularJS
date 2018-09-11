angular.module('app', ['ngRoute', 'ngCookies'])

.run(function($rootScope, $cookies) {


})

.controller('home', ['AuthenticationService', function($scope, $cookies, AuthenticationService){

    AuthenticationService.ClearCredentials();

}])

.controller('login', function($scope, $cookies, AuthenticationService){



    var users = [{'name':'test', 'pass':'123'}];

    $cookies.put('users', users)

})

.controller('register', function($scope, $cookies){



})

.config(function($routeProvider){
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
