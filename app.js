(function() {

    'use strict';

    var app = angular
        .module('app', ['ngRoute', 'ngStorage'])
        .controller('home', HomeController)
        .controller('login', LoginController)
        .controller('register', RegisterController)
        .service('authService', authService);

    app.run(function($rootScope, $localStorage, $sessionStorage, $location) {

        $localStorage.users = [{}];

    });

    function HomeController($scope, $localStorage, $sessionStorage, $location){

        $scope.user = $sessionStorage.userEmail;
        $scope.users = $sessionStorage.users;

        $scope.onLogout = function () {

            $sessionStorage.checkAuth = false;

            $location.path( "/login" );

        }

    }

    function LoginController($scope, $localStorage, $sessionStorage, $location){

        var users = $sessionStorage.users;

        $scope.onLogin = function () {

            var user = users.filter(function (user) { return user.email == $scope.email });

            if(user.length > 0 && user[0].password == $scope.password){

                $sessionStorage.checkAuth = true;
                $sessionStorage.userEmail = user[0].email;
                $location.path( "/" );

            }else $scope.error = 'Нет такого пользователя!';


        }


    }

    function deleteUser(user) {

        alert(user);

    }

    function RegisterController($scope, $localStorage, $sessionStorage, $location){

        var users = $sessionStorage.users;

        $scope.onRegister = function () {

            var user = users.filter(function (user) { return user.email == $scope.email });

            if(user.length < 1){

                users[users.length] = {'email': $scope.email, 'password': $scope.password};

                $sessionStorage.users = users;

                console.log(users);
                console.log($sessionStorage.users);

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
                    "check": function ($location, $sessionStorage) {
                        if($sessionStorage.checkAuth !== true) $location.path( "/login" );
                    }
                }
            })
            .when("/login",
            {
                templateUrl: "login/index.html",
                controller: "login",
                controllerAs: "app",
                resolve: {
                    "check": function ($location, $sessionStorage) {
                        if($sessionStorage.checkAuth == true) $location.path( "/" );
                    }
                }
            })
            .when("/register",
            {
                templateUrl: "register/index.html",
                controller: "register",
                controllerAs: "app",
                resolve: {
                    "check": function ($location, $sessionStorage) {
                        if($sessionStorage.checkAuth == true) $location.path( "/" );
                    }
                }
            })
            .otherwise({ redirectTo: '/login' });
    });

})();
