angular.module('betaApp')

    .component('messages', {
        bindings: {
            messages: '<'
        },
        template: `
        <div class="col-sm-8">
            <h3>
                Messages
            </h3>
            <div>
                <input type="text" ng-model="search.username" placeholder="Filter by username">
                <input type="text" ng-model="search.msg" placeholder="Filter by message text">
                <input type="text" ng-model="search.timestamp" placeholder="Filter by date/time">
            </div>
            <div class="container-fluid scroll" id="chatwindow" >
                <div ng-repeat="msg in $ctrl.messages | filter:{username:search.username, timestamp:search.timestamp, msg:search.msg}" class="row">
                    <span class="pull-right">{{msg.timestamp}}</span>
                    <span class="col-sm-3">{{msg.username}}:</span>
                        
                    <p class="col-sm-5">{{msg.msg}}</p>
                </div>
            </div>
        
            <form name="messageForm" ng-submit="$ctrl.createMessage()">
                <input type="text" id="message" ng-model="$ctrl.message" placeholder="Type your message here">
                
                <input class="btn btn-primary" ng-disabled="!messageForm.$dirty" type="submit" value="Submit">
                <flash-message name="flash-newmessage"></flash-message>
            </form>
            <button ui-sref="projects.project">Close Messages</button>
        </div>
    `,

        controller: function (UtilService, $scope, loc, MessagesService, $interval) {

            // get user from parent scope
            var user = $scope.$parent.$resolve.user;
            var userName = user.userName;
            
            console.log(loc)

            // SOCKETIO
            var socket = io.connect(loc);

            // initialize empty array to track new messages on client
            $scope.newMessages = [];


            this.createMessage = function () {
                var message = {};

                message.msg = $('#message').val();
                message.datestamp = new Date();
                message.username = userName;

                // send immediately
                socket.send(message);

                // save locally to send via interval every 3 seconds
                $scope.newMessages.push({
                    "userId": user.id,
                    "msg": message.msg,
                    "timestamp": UtilService.convertISODatetimeToMySQLString(message.datestamp),
                    "projectId": $scope.$parent.$resolve.project.id
                });
                // clear form input
                $('#message').val('');
            };


            socket.on('connect', function () {
                // fired when client connects
                message.msg = userName + ' has connected';
                message.datestamp = new Date();
                message.username = "Team Beta Bot";

                socket.send(message);
                // scroll to bottom of chat window
                $('#chatwindow').scrollTop($('#chatwindow')[0].scrollHeight);
            });

            socket.on('message', function (msg) {
                // notification
                UtilService.notifyMe(msg.msg, msg.username);

                // update view immediately
                $scope.$ctrl.messages.push({
                    "username": msg.username,
                    "msg": msg.msg,
                    "timestamp": new Date(msg.datestamp).toUTCString()
                });

            });

            // called every 3 seconds to post client messages to server
            postNewMessages = function () {
                if ($scope.newMessages.length > 0) {
                    var success = MessagesService.postMessages($scope.newMessages);
                    if (success) {
                        // clear storage of messages since last post
                        $scope.newMessages = [];
                    }
                }

            };

            // update backend periodically
            $interval(postNewMessages, 3000);
        }
    });
