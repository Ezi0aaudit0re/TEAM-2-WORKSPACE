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
                <div ng-repeat="msg in $ctrl.messages">
                    <div class="row">
                        <div class="col-sm-3">{{msg.username}}:</div>
                        <div class="col-sm-5">{{msg.msg}}</div>
                    </div>
                </div>
            </div>
        
            <form ng-submit="$ctrl.createMessage()">
                <input type="text" id="message" ng-model="$ctrl.message" placeholder="...">
                <input class="btn btn-primary" type="submit" value="Submit">
            </form>
            <button ui-sref="projects.project">Close Messages</button>
        </div>
    `,

        controller: function ($log, $scope, loc) {

            $log.log("message controller");
            $log.log(typeof $scope.$ctrl.messages);

            var userName = $scope.$parent.$resolve.user.user_name;
            $log.log(userName);

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

            socket.on('message', function (msg) {
                $log.log(msg);
                // notification
                notifyMe(msg, userName);

                $log.log($scope.$ctrl.messages);
                $scope.$ctrl.messages.push({
                    "username": userName,
                    "msg": msg
                });

            });
        }
    });