angular.module('betaApp')

    .component('signup', {
        bindings: {
            user: '<',
            error: '<'
        },
        template: `
                <div class="container">

                    <div>
                        <form class="form-signin">
                            <h2 class=" form-signin-heading">Please sign up</h2>

                            <label for="inputFirstName" class="sr-only">First Name</label>
                            <input type="text" id="inputFirstName" class="form-control" 
                                placeholder="First Name" required autofocus ng-model="$ctrl.user.firstName">
                            <label for="inputLastName" class="sr-only">Last Name</label>
                            <input type="text" id="inputLastName" class="form-control" 
                                placeholder="Last Name" required autofocus ng-model="$ctrl.user.lastName">

                            <label for="inputEmail" class="sr-only">Email address</label>
                            <input type="email" id="inputEmail" class="form-control" 
                                placeholder="Email address" required autofocus ng-model="$ctrl.user.emailAddress">
                            <label for="inputUsername" class="sr-only">Username</label>
                            <input type="text" id="inputUsername" class="form-control" 
                                placeholder="Username" required autofocus ng-model="$ctrl.user.username">
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" id="inputPassword" class="form-control" 
                                placeholder="Password" required ng-model="$ctrl.user.password">
                            <div class="checkbox">
                            </div>
                            <button class="btn btn-lg btn-primary btn-block" type="submit" ng-click="$ctrl.createNewUser()">Sign up</button>
                        </form>
                    </div>

                </div>
                <!-- /container -->`,

        controller: [
            '$log', '$http',
            function ($log, $http) {

                this.createNewUser = function () {
                    // TODO
                    $log.log(this.user);

                    let userInput = this.user;

                    $http.post('/api/createUser', {
                            "user": userInput
                        })
                        .then(function (results) {
                            $log.log("Successfully created user: " + JSON.stringify(results));
                            $log.log("Message: " + results.data.message)
                            $log.log("return_code: " + results.data.return_code)
                        }, function (error) {
                            $log.log("error creating user: " + JSON.stringify(error));
                            this.error = error.statusText;
                        });
                }
            }
        ]
    })
    .component('login', {
        bindings: {
            user: '<',
            error: '<'
        },
        template: `
            <div class="navbar navbar-form">
                <form class="form-inline">
                    <div class="form-group">
                        <input type="text" name="email_username" 
                            placeholder="Email or Username" class="form-control" ng-model="$ctrl.user.email_username">
                    </div>
                    <div class="form-group">
                        <input type="password" name="pass" 
                            placeholder="Password" class="form-control" ng-model="$ctrl.user.password">
                    </div>
                    <button type="submit" class="btn btn-success"  ng-click="$ctrl.login()">Login</button>
                </form>
            </div>
        `,
        controller: [
            '$log', '$http',
            function ($log, $http) {

                this.login = function () {
                    // TODO
                    $log.log(this.user);

                    let userInput = this.user;


                    $http.post('/api/authenticate', {
                            "user": userInput
                        })
                        .then(function (results) {
                            $log.log("Successfully logged in: " + JSON.stringify(results));
                        }, function (error) {
                            $log.log("error logging in: " + JSON.stringify(error));
                            this.error = error.statusText;
                        });
                }

                this.logout = function () {
                    // TODO

                    $http.post('/api/logout', {})
                        .then(function (results) {
                            $log.log("Successfully logged out: " + JSON.stringify(results));
                        }, function (error) {
                            $log.log("error logging out: " + JSON.stringify(error));
                            this.error = error.statusText;
                        });
                }
            }
        ]
    })