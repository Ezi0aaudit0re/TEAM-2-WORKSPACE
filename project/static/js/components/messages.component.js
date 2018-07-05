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
            <div class="container-fluid scroll" id="chatwindow">
                <div ng-repeat="msg in $ctrl.messages">
                    <div class="row">
                        <div class="col-sm-3">{{msg.username}}:</div>
                        <div class="col-sm-5">{{msg.msg}}</div>
                    </div>
                </div>
            </div>
        
            <form ng-submit="$ctrl.createMessage()">
                <input type="text" ng-model="$ctrl.message" placeholder="...">
                <input type="submit" value="Send">
            </form>
            <button ui-sref="projects.project">Close Messages</button>
        </div>
    `,

        controller: function ($http, $log, socket) {

            $log.log("message controller")

            // socket.forward('someEvent');
            // this.$on('socket:someEvent', function (ev, data) {
            //     this.theData = data;
            // });

            // this.createMessage = function () {
            //     socket.emit();
            // }

            // let socket = io.connect('http://' + document.domain + ':' + location.port + '/')

            // socket.on('connect', () => {
            //     // connected
            // })
        }
    })