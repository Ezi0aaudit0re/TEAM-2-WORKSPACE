angular.module('betaApp')
    .component('tasks', {
        bindings: {
            tasks: '<',
            task: '<'
        },

        template: `
            <div class="col-sm-2">
                <h3>
                    Tasks 
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newTaskModal">
                        Add
                    </button>
                </h3>
                <ul>
                    <li ng-repeat="task in $ctrl.tasks">
                        <a ui-sref-active="active" ui-sref="projects.project.tasks.task({ taskId: task.id })">
                            {{task.name}}: {{task.status}}
                        </a>
                    </li>
                </ul>
                
                <button class="btn btn-secondary" ui-sref="projects.project">Close Tasks</button>
            </div>
            
            <ui-view></ui-view>
        
            <!-- Modal -->
            <div class="modal fade" id="newTaskModal" tabindex="-1" role="dialog" aria-labelledby="newTaskModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="newTaskModalLabel">New Task</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <flash-message name="flash-newtask"></flash-message>
                        </div>
                        <div class="modal-body">
                            <form>
                                <label for="inputTaskName" class="sr-only">Task Name</label>
                                <input type="text" id="inputTaskName" class="form-control" placeholder="Task Name" required autofocus ng-model="$ctrl.task.name">
                                <label for="inputTaskDescription" class="sr-only">Task Description</label>
                                <input type="text" id="inputTaskDescription" class="form-control" placeholder="Task Description" required autofocus ng-model="$ctrl.task.description">
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" ng-click="$ctrl.createNewTask()">Create New Task</button>
                        </div>
                    </div>
                </div>
            </div>
        `,

        controller: function ($log, ProjectsService) {
            // TODO

            this.getTasksForUser = function () {
                // TODO
            };

            this.createNewTask = function () {
                $log.log(this.task);

                ProjectsService.postNewTask(this.task);
            };
        }
    });