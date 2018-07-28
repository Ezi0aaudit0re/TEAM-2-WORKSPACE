angular.module('betaApp')
    .component('tasks', {
        bindings: {
            tasks: '<',
            projectId: '<'
        },

        template: `
            <div class="col-sm-3">
                <h3>
                    Tasks 
                    <button type="button" class="close" aria-label="Close" ui-sref="projects.project">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    
                </h3>
                <ul>
                    <input type="text" ng-model="search.project" placeholder="Filter by project">
                    <li ng-repeat="t in $ctrl.tasks | filter:search.task">
                        <a ui-sref-active="active" ui-sref="projects.project.tasks.task({ taskId: t.id })">
                            {{t.name}}: {{t.status}}
                        </a>
                    </li>
                </ul>
                <my-modal-button tgt="#newTaskModal"></my-modal-button>
                <button class="btn btn-secondary" ui-sref="projects.project">Close Tasks</button>
            </div>
            
            <ui-view></ui-view>
        
            <!-- Modal -->
            <div class="modal fade" id="newTaskModal" tabindex="-1" role="dialog" aria-labelledby="newTaskModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="newTaskModalLabel">New Task</h5>
                            <my-modal-close></my-modal-close>
                            <flash-message name="flash-newtask"></flash-message>
                        </div>
                        <form name="newTaskForm">
                            <div class="modal-body">
                            
                                <label for="inputTaskName" class="">Task Name</label>
                                <input type="text" id="inputTaskName" class="form-control" name="inputTaskName"
                                    placeholder="Task Name" required autofocus 
                                    ng-model="$ctrl.task.name">
                                <div ng-messages="newTaskForm.inputTaskName.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>

                                <label for="inputTaskDescription" class="">Task Description</label>
                                <input type="text" id="inputTaskDescription" class="form-control" name="inputTaskDescription"
                                    placeholder="Task Description" required autofocus 
                                    ng-model="$ctrl.task.description">
                                <div ng-messages="newTaskForm.inputTaskDescription.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>

                                <label for="inputTaskPriority" class="">Task Priority</label>
                                <input type="text" id="inputTaskPriority" class="form-control" name="inputTaskPriority"
                                    placeholder="Task Priority" required autofocus 
                                    ng-model="$ctrl.task.priority">
                                <div ng-messages="newTaskForm.inputTaskPriority.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>

                                <label for="inputTaskDueDate" class="">Task Due Date</label>
                                <input type="date" id="inputTaskDueDate" class="form-control" name="inputTaskDueDate"
                                    placeholder="" required autofocus 
                                    ng-model="$ctrl.task.dueDate">
                                <div ng-messages="newTaskForm.inputTaskDueDate.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>

                                <label for="inputTaskUser" class="">Task User</label> 
                                <input type="email" id="inputTaskUser" class="form-control" required name="inputTaskUser"
                                    placeholder="Enter email address of assigned user" autofocus 
                                    ng-model="$ctrl.task.user.email" value='' />
                                <div ng-messages="newTaskForm.inputTaskUser.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>

                            
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" ng-click="$ctrl.createNewTask()" ng-disabled="newTaskForm.$invalid">Create New Task</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        `,

        controller: function (ProjectsService) {
            // TODO

            this.getTasksForUser = function () {
                // TODO
            };

            this.createNewTask = function () {
                console.log(this.task);

                console.log(this.projectId);

                ProjectsService.postNewTask(this.projectId, this.task);
                console.log(this.task);
            };
        }
    });