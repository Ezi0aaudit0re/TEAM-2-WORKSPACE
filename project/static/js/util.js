angular.module('betaApp')
    .service('UtilService', function ($http, $log, Flash) {
        var service = {
            post: function (url, data = {}) {
                // reuse for timeout and cache
                return $http.post(url, data, {
                    cache: true,
                    timeout: 3000
                });
            },

            checkIfSuccess: function (response) {
                // resuse for all success codes are 200
                if (response.data.code === 200) {
                    $log.log(response.data.message);
                    return true;
                } else {
                    Flash.create('danger', response.data.message, 3000);
                    return false;
                }
            },

            handleErrorWithFlash: function (error, event, duration = 0, targetContainer = '') {
                // reuse for errors that display backend error message
                $log.error(error);
                Flash.create('danger', 'There was an error ' + event, duration, {
                    container: targetContainer
                });
                return false;
            },



            getSampleData: function (error, dataLocation) {
                // reuse to present the user with data but warn of sample
                $log.error(error);
                Flash.create('info', "This is sample data", 3000);
                return $http.get(dataLocation, {
                    timeout: 3000
                });
            },

            convertISODatetimeToMySQLString: function (d) {
                // reuse to convert javascript date objects to MySQL format
                return new Date(d).toISOString().slice(0, 19).replace('T', ' ');
            },

            notifyMe: function (msg, user = "Test") {
                if (Notification.permission !== "granted")
                    // if user has not allowed notification 
                    // ask permission for notification
                    Notification.requestPermission();
                else {
                    var notification = new Notification('Message from ' + user, {
                        // TODO add our website logo
                        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                        body: msg,
                    });

                    notification.onclick = function () {
                        // TODO change link here
                        window.open("http://stackoverflow.com/a/13328397/1269037");
                    };

                }

            }
        };

        return service;
    });