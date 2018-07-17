angular.module('betaApp')
    .component('project', {
        bindings: {
            project: '<'
        },

        template: `
            <div class="col-sm-2">
                <h2>
                    Project
                    <button class="btn btn-primary" ng-click="edit()">Edit</button>
                </h2>
                
                <div>
                    Name: {{$ctrl.project.name}}
                </div>
                <div>
                    Description: {{$ctrl.project.description}}
                </div>
                <div>
                    Status: {{$ctrl.project.status}}
                </div>
                <div>
                    Created Date: {{$ctrl.project.created_date}}
                </div>
                <div>
                    Update Date: {{$ctrl.project.updated_date}}
                </div>
                <div>
                    <button class="btn btn-secondary" ui-sref="projects">Close Project</button>
                </div>

            </div>
            
            <ui-view>
                <a ui-sref="projects.project.tasks" ui-sref-active="active">Tasks</a>
                <a ui-sref="projects.project.messages" ui-sref-active="active">Messages</a>
                <a ui-sref="projects.project.issues" ui-sref-active="active">Issues</a>
            </ui-view>
            
            
            `,
        controller: ['$scope', '$stateParams', '$state', function (
            $scope, $stateParams, $state) {
            $scope.edit = function () {
                $state.go('.edit', $stateParams);
            };
        }]
    });