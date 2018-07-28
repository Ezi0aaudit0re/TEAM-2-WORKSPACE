angular.module('betaApp')
    .component('task', {
        bindings: {
            task: '<'
        },

        template: `
            <div class="col-sm-4">
                <h4>
                    Task
                    <button type="button" class="close" aria-label="Close" ui-sref="projects.project.tasks">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    
                </h4>
            <form name="taskForm">

                <span>
                    Name: {{$ctrl.projects.project.tasks.task.name}}
                    <input type="text" class="form-control" readonly ng-model="$ctrl.task.name" />
                </span>
                <div>
                    Description:
                    <input type="text" class="form-control" readonly ng-model="$ctrl.task.description" />
                </div>
                <div>
                    Priority:
                    <input type="text" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.task.priority" />
                </div>
                <div>
                    Due Date:
                    <input type="text" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.task.dueDate" />
                </div>
                <div>
                    Status:
                    <input type="text" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.task.status" />
                </div>
                <div>
                    Created At:
                    <input type="text" class="form-control" readonly ng-model="$ctrl.task.createdAt" />
                </div>
                <div>
                    Updated At:
                    <input type="text" class="form-control" readonly ng-model="$ctrl.task.updatedAt" />
                </div>
                <div>
                    Assigned To User:
                    <input type="text" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.task.assignedToUser" />
                </div>
                <div>
                    Assigned By User:
                    <input type="text" class="form-control" readonly ng-model="$ctrl.task.assignedByUser" />
                </div>

            </form>
            <button ng-show="taskForm.$dirty" class="btn btn-primary" ng-click="$ctrl.updateTask()">
                Submit Changes
            </button>
            <button class="btn btn-primary" ng-click="$ctrl.readonly  = !$ctrl.readonly">
                {{$ctrl.readonly == true ? 'Edit' : 'Stop Editing'}}
            </button>
            <button class="btn btn-secondary" ui-sref="projects.project.tasks">Close Task</button>
        </div>
        
        `,

        controller: function (ProjectsService) {

            this.readonly = true;

            this.edit = function () {
                this.readonly = !this.readonly;
            };

            this.updateTask = function () {
                ProjectsService.updateTask(this.task);
            };
        }
    });