angular.module('betaApp')
    .service('MessagesService', function ($http, $log, Flash) {
        var service = {
            getMessages: function () {
                $log.log("getAllMessages");
                // called on page load to get all user projects
                return $http.get("/api/messages", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting messages: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get("../static/js/messages/messages.json", {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                return response.data.data;
                            });
                    });
            },

            postMessage: function (newMessage) {
                return $http.post('/api/storeMessage', {
                        "message": newMessage
                    })
                    .then(function (results) {
                        var code = results.data.code;
                        var msg = results.data.message;

                        if (code === 500) {
                            Flash.create('danger', msg, 3000);
                        } else {
                            Flash.create('success', msg, 3000);
                            $log.log("Successfully posted message: " + JSON.stringify(results));
                        }
                        return true;
                    })
                    .catch(function (error) {
                        Flash.create('danger', 'The message did not post - please try again', 1);
                        $log.log("error posting message: " + error);
                        return false;
                    });
            }
        };

        return service;
    });