angular.module('betaApp')

    .controller('ProjectsController', function ($scope, $http, $log) {
        // TODO

        // sample data
        $scope.projects = [{
                id: 1,
                name: "Project1",
                status: "Waiting"
            },
            {
                id: 2,
                name: "Project2",
                status: "In Progress",
                tasks: [{
                    "id": 1,
                    "name": "Stim",
                    "description": "viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus",
                    "status": "Completed",
                    "created_at": "2017-07-23T05:44:46Z",
                    "updated_at": "2017-06-30T00:47:17Z",
                    "assigned_to": "Shalna Mabbutt",
                    "assigned_by": "Ignatius Walby"
                }, {
                    "id": 2,
                    "name": "Y-find",
                    "description": "sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium",
                    "status": "In Progress",
                    "created_at": "2017-07-19T21:19:26Z",
                    "updated_at": "2018-01-19T00:11:32Z",
                    "assigned_to": "Gaylene Sargeant",
                    "assigned_by": "Marabel Matteotti"
                }, {
                    "id": 3,
                    "name": "Fixflex",
                    "description": "nisi volutpat eleifend donec ut dolor morbi vel lectus in quam",
                    "status": "Completed",
                    "created_at": "2017-11-27T15:51:30Z",
                    "updated_at": "2017-08-25T03:25:24Z",
                    "assigned_to": "Brandie Larter",
                    "assigned_by": "Gallagher Brasted"
                }, {
                    "id": 4,
                    "name": "Bitwolf",
                    "description": "nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in",
                    "status": "Waiting",
                    "created_at": "2018-03-24T08:20:50Z",
                    "updated_at": "2018-06-29T14:51:00Z",
                    "assigned_to": "Kearney Coggell",
                    "assigned_by": "Antonella Ripper"
                }, {
                    "id": 5,
                    "name": "Subin",
                    "description": "diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam",
                    "status": "Waiting",
                    "created_at": "2017-07-08T02:13:10Z",
                    "updated_at": "2017-08-06T19:32:57Z",
                    "assigned_to": "Vaclav Siveyer",
                    "assigned_by": "Caldwell Axby"
                }]
            }

        ];

        // called on page load
        $http.get("/api/projects", {
                timeout: 3000
            })
            .then(function (response) {
                $scope.projects = response.data.records;
            });


        $scope.showProject = function (id) {
            // TODO

            $log.log(id);

            $http.get("/api/project:id", {
                    timeout: 3000
                })
                .then(function (response) {
                    $scope.project = response.data.records;
                });
        };

        $scope.newProject = function () {
            // TODO
            $log.log($scope.project);

            $http.post('/api/project/new', {
                    "project": $scope.project
                })
                .then(function (results) {
                    $log.log("Successfully created project: " + JSON.stringify(results));
                })
                .catch(function (error) {
                    $log.log("error creating project: " + JSON.stringify(error));
                });
        };
    })

    .controller('ProjectController', function ($scope) {
        // TODO

        $scope.getTasksForUser = function () {
            // TODO
        }
    })