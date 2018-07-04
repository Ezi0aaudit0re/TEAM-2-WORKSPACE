angular.module('betaApp')
    .component('task', {
        bindings: {
            task: '<'
        },

        template: `
        <div>
            <ul>
                <li>
                    <div id={{$ctrl.task.id}}>
                        <div>
                            Name: {{$ctrl.task.name}}
                        </div>
                        <div>
                            Description: {{$ctrl.task.description}}
                        </div>
                        <div>
                            Priority: {{$ctrl.task.priority}}
                        </div>
                        <div>
                            Status: {{$ctrl.task.status}}
                        </div>
                        <div>
                            Created At: {{$ctrl.task.created_at}}
                        </div>
                        <div>
                            Updated At: {{$ctrl.task.updated_at}}
                        </div>
                        <div>
                            Assigned To User: {{$ctrl.task.assigned_to_user}}
                        </div>
                        <div>
                            Assigned By User: {{$ctrl.task.assigned_by_user}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <button ui-sref="projects.project.tasks">Close Task</button>
        `,

        controller: function ($stateParams, $log) {
            // TODO

            $log.log("taskId: " + $stateParams.taskId);
        }
    })