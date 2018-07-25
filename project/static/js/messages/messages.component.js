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
            <div class="container-fluid scroll" id="chatwindow" >
                <div ng-repeat="msg in $ctrl.messages" class="row">

                        <span class="pull-right">{{msg.timestamp}}</span>
                        <span class="col-sm-3">{{msg.username}}:</span>
                        

                    <p class="col-sm-5">{{msg.msg}}</p>
                </div>
            </div>
        
            <form ng-submit="$ctrl.createMessage()">
                <input type="text" id="message" ng-model="$ctrl.message" placeholder="...">
                <input class="btn btn-primary" type="submit" value="Submit">
            </form>
            <button ui-sref="projects.project">Close Messages</button>
        </div>
    `,

        controller: function ($log, $scope, loc, MessagesService, $state, $interval) {



            var userName = $scope.$parent.$resolve.user.user_name;

            // socket.forward('someEvent');
            // this.$on('socket:someEvent', function (ev, data) {
            //     this.theData = data;
            // });

            this.createMessage = function () {
                socket.send($('#message').val());
                $('#message').val('');
            };

            var socket = io.connect(loc);

            socket.on('connect', function () {
                socket.send(userName + ' has connected');
                $('#chatwindow').scrollTop($('#chatwindow')[0].scrollHeight);
            });

            socket.on('message', function (msg, timestamp) {
                $log.log(msg);
                // notification
                notifyMe(msg, userName);

                // $log.log($scope.$ctrl.messages);
                // $log.log(this.messages);

                MessagesService.postMessage(msg);

                $scope.$ctrl.messages.push({
                    "username": userName,
                    "msg": msg,
                    "timestamp": new Date().toISOString().slice(0, 19).replace('T', ' ')
                });

            });

            // TODO need to get from database as otherwise multiple clients will send same updates
            var lastUpdate = new Date().toISOString().slice(0, 19).replace('T', ' ');

            newMessages = function (element) {
                return element > lastUpdate;
            };

            // $interval(console.log($scope.$ctrl.messages.filter(newMessages), 3000));
            // $interval(MessagesService.postMessage($scope.$ctrl.messages.filter(newMessages)), 3000);
        }
    });