angular.module('betaApp')
    .service('MessagesService', function (UtilService, $log, Flash) {
        var testDataLocation = "../static/js/messages/messages.json";

        var service = {
            getMessages: function (projectId) {
                // called on page load to get all user projects
                return UtilService.post("/api/messages", {
                        "projectId": projectId
                    })
                    .then(function (response) {
                        UtilService.checkIfSuccess(response)
                        // 404 - no new messages or 503 - user not part of project
                        return response.data.data;
                    })
                    .catch(function (error) {
                        // get sample data instead
                        return UtilService.getSampleData(error, testDataLocation).then(function (response) {
                            return response.data.data;
                        });
                    });
            },

            postMessages: function (newMessages) {
                return UtilService.post('/api/storeMessage', {
                        "messages": newMessages
                    })
                    .then(function (response) {
                        if (!UtilService.checkIfSuccess(response)) {
                            // 404 - no new messages or 503 - user not part of project
                            Flash.create('danger', response.data.message, 3000, {
                                container: 'flash-newmessage'
                            });
                            return false;
                        }
                        return true;

                    })
                    .catch(function (error) {
                        $log.error(error);
                        Flash.create('danger', 'The message did not post - please try again', 1000, {
                            container: 'flash-newmessage'
                        });
                        return false;
                    });
            }
        };

        return service;
    });