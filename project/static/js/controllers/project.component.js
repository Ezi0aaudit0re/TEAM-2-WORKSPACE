angular.module('betaApp')
    .component('project', {
        bindings: {
            project: '<'
        },

        template: `
            <div>
                hi {{$ctrl.project.id}} there
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
                <div ng-repeat="task in $ctrl.project.tasks">
                    Task
                    <div>
                        {{task.name}}
                    </div>
                    <div>
                        {{task.status}}
                    </div>
                    <button type="button" class="btn btn-primary" ng-click="showTask(task.id)">View</button>
                </div>
            </div>
            <button ui-sref="projects">Close</button>
            `,

        controller: function ($log) {
            // TODO

            $log.log("project controller running: " + this.project);



            this.createNewTask = function () {
                // TODO
            }

            this.getTasksForUser = function () {
                // TODO
            }
        }
    })