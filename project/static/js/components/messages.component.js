angular.module('betaApp')

    .component('messages', {
        bindings: {
            messages: '<'
        },
        template: `
        <div>
            <div class="container-fluid" id="chatwindow">
                <div ng-repeat="msg in $ctrl.messages">
                    <div class="row">
                        <div class="col-sm-8">{{msg.msg}}</div>
                        <div class="col-sm-2">{{msg.user_id}}</div>
                    </div>
                </div>
            </div>
        
            <form ng-submit="createMessage()">
                <input type="text" ng-model="text" placeholder="...">
                <input type="submit" value="Send">
            </form>
            <button ui-sref="projects.project">Close Messages</button>
        </div>
    `,

        controller: function ($http, $log) {

            $log.log("message controller")


            // let socket = io.connect('http://' + document.domain + ':' + location.port + '/')

            // socket.on('connect', () => {
            //     // connected
            // })
        }
    })