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

        controller: function ($http, $log, $scope) {

            $log.log("message controller")
            $log.log(typeof this.messages)

            // socket.forward('someEvent');
            // this.$on('socket:someEvent', function (ev, data) {
            //     this.theData = data;
            // });

            this.createMessage = function () {
                socket.send($('#message').val());
                $('#message').val('')
            }

            // let socket = io.connect('http://' + document.domain + ':' + location.port + '/')

            // socket.on('connect', () => {
            //     // connected
            // })


            var socket = io.connect('http://127.0.0.1:5000')

            socket.on('connect', function () {
                socket.send({
                    "username": "bot",
                    "msg": 'user has connected'
                })
            })

            socket.on('message', function (msg) {
                $log.log(msg)
                // $("#chatwindow").append('<li>' + msg + '</li>')
                $log.log($scope.$ctrl.messages)
                $scope.$ctrl.messages.push({
                    "username": "me",
                    "msg": msg
                })

            })

        }
    })