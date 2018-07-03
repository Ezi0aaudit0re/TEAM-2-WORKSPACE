angular.module('betaApp')
    .component('tasks', {
        bindings: {
            tasks: '<'
        },

        template: `
            <div>
                <ul>
                    <li ng-repeat="task in $ctrl.tasks">
                        <a ui-sref-active="active" ui-sref="projects.project.tasks.task({ taskId: task.id })">
                            {{task.name}}: {{task.status}}
                        </a>
                    </li>
                </ul>
                <ui-view></ui-view>
            </div>
            <button ui-sref="projects.project">Close Tasks</button>
        `,

        controller: function () {
            // TODO

            this.getTasksForUser = function () {
                // TODO
            }
        }
    })