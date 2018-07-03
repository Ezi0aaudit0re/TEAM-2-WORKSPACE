angular.module('betaApp')
    .component('project', {
        bindings: {
            project: '<'
        },

        template: `
            <div>
                <h4>Project</h4>
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
                <h5>Tasks</h5>
                    <ul>
                        <li ng-repeat="task in $ctrl.project.tasks">
                            <a ui-sref-active="active" ui-sref="tasks.task({ taskId: task.id })">
                                {{task.name}}: {{task.status}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <button ui-sref="projects.project">Close</button>
            `,

        controller: function ($log) {
            // TODO

            $log.log("project controller running: " + JSON.stringify(this.project));


            this.createNewTask = function () {
                // TODO
            }

            this.getTasksForUser = function () {
                // TODO
            }
        }
    })