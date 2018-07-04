angular.module('betaApp')
    .service('MessagesService', function ($http, $log) {
        var service = {
            getMessages: function () {
                $log.log("getAllMessages");
                // called on page load to get all user projects
                return $http.get("/api/messages", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting messages: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get("../static/js/data/messages.json", {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                return response.data;
                            })
                    });
            }
        }

        return service;
    })