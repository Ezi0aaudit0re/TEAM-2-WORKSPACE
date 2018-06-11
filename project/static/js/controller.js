let betaApp = angular.module('betaApp', []);

betaApp.controller('LoginController', ($scope) => {
    let socket = io.connect('http://' + document.domain + ':' + location.port + '/')
})