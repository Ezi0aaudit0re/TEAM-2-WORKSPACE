angular.module('betaApp')
    .service('MessagesService', function ($http, Flash) {
        var service = {
            getMessages: function (projectId) {
                // called on page load to get all user projects
                return $http.post("/api/messages", {
                        "projectId": projectId
                    }, {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        if (!checkIfSuccess(response.data)) {
                            // 404 - no new messages or 503 - user not part of project
                            Flash.create('danger', response.data.message, 3000);
                        }
                        return response.data.data;
                    })
                    .catch(function (error) {
                        console.log("error getting messages: " + JSON.stringify(error));
                        // get sample data instead
                        Flash.create('info', "This is sample data", 3000);
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
                        if (!checkIfSuccess(response.data)) {
                            // 404 - no new messages or 503 - user not part of project
                            Flash.create('danger', response.data.message, 3000, {
                                container: 'flash-newmessage'
                            });
                            return false;
                        }
                        return true;

                    })
                    .catch(function (error) {
                        Flash.create('danger', 'The message did not post - please try again', 1000, {
                            container: 'flash-newmessage'
                        });
                        console.log("error posting message: " + error);
                        return false;
                    });
            }
        };

        return service;
    });