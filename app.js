(function() {

    'use strict';

    var app = angular
        .module('app', ['ngRoute', 'ngStorage'])
        .controller('home', HomeController)
        .controller('login', LoginController)
        .controller('register', RegisterController)
        .service('authService', authService);

    app.run(function($rootScope, $localStorage, $sessionStorage, $location) {

        if(!$localStorage.users) $localStorage.users = [];

    });

    function HomeController($scope, $localStorage, $sessionStorage, $location){

        $scope.user = $sessionStorage.userEmail;
        $scope.users = $sessionStorage.users;

        $scope.onLogout = function () {

            $localStorage.checkAuth = false;

            $location.path( "/login" );

        }

    }

    function LoginController($scope, $localStorage, $sessionStorage, $location){

        var users = $localStorage.users;

        $scope.onLogin = function () {

            var user = users.filter(function (users) { return users.email == $scope.email });

            alert(users[0].password);

            if(user.length > 0 && user[0].password == $scope.password){

                $localStorage.checkAuth = true;
                $localStorage.userEmail = user[0].email;
                $location.path( "/" );

            }else $scope.error = 'Нет такого пользователя!';


        }


    }

    function RegisterController($scope, $localStorage, $sessionStorage, $location){
	
        var users = $localStorage.users;

        $scope.onRegister = function () {

            var user = users.filter(function (users) { return users.email == $scope.email });

            if(user.length == 0){

                users[users.length] = {'email': $scope.email, 'password': $scope.password};

                $localStorage.checkAuth = true;
                $localStorage.userEmail = $scope.email;
                $location.path( "/" );

            }else $scope.error = 'Такой пользователь уже существует!';

        }

    }

    authService.$inject = ['$http'];

    function authService($http) {

    }

    app.config(function($routeProvider){
        $routeProvider
            .when("/",
            {
                templateUrl: "home/index.html",
                controller: "home",
                controllerAs: "app",
                resolve: {
                    "check": function ($location, $localStorage) {
                        if($localStorage.checkAuth !== true) $location.path( "/login" );
                    }
                }
            })
            .when("/login",
            {
                templateUrl: "login/index.html",
                controller: "login",
                controllerAs: "app",
                resolve: {
                    "check": function ($location, $localStorage) {
                        if($localStorage.checkAuth == true) $location.path( "/" );
                    }
                }
            })
            .when("/register",
            {
                templateUrl: "register/index.html",
                controller: "register",
                controllerAs: "app",
                resolve: {
                    "check": function ($location, $localStorage) {
                        if($localStorage.checkAuth == true) $location.path( "/" );
                    }
                }
            })
            .otherwise({ redirectTo: '/login' });
    });

})();
