angular.module('betaApp')
    .service('MessagesService', function ($http, $log, Flash) {
        var service = {
            getMessages: function (id) {
                $log.log("getAllMessages");
                // called on page load to get all user projects
                return $http.post("/api/messages", {
                        "project_id": id
                    }, {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        console.log(response);
                        var code = response.data.code;
                        var msg = response.data.message;
                        if (code === 404) {
                            Flash.create('info', msg, 3000);
                            return [{
                                "msg": "This is the general chat for this project!",
                                "username": "System",
                                "timestamp": new Date().toISOString().slice(0, 19).replace('T', ' ')
                            }];
                        }
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
                                console.log(response.data.data);
                                return response.data.data;
                            });
                    });
            },

            postMessages: function (newMessages) {
                return $http.post('/api/storeMessage', {
                        "messages": newMessages
                    })
                    .then(function (response) {
                        console.log(response);
                        var code = response.data.code;
                        var msg = response.data.message;

                        if (code === 500) {
                            Flash.create('danger', msg, 3000);
                            return false;
                        } else {
                            Flash.create('success', msg, 3000);
                            $log.log("Successfully posted message: " + JSON.stringify(response));
                            return true;
                        }

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