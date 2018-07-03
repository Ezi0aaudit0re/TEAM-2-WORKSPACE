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
                <a ui-sref-active="active" ui-sref="projects.project.tasks"><h4>Tasks</h4></a>
                <ui-view></ui-view>
            </div>
            <button ui-sref="projects">Close</button>
            `,

        controller: function () {
            // TODO

            this.createNewTask = function () {
                // TODO
            }

            this.getTasksForUser = function () {
                // TODO
            }
        }
    })