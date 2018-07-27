angular.module('betaApp')
    .component('tasks', {
        bindings: {
            tasks: '<',
            projectId: '<'
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
                    <li ng-repeat="t in $ctrl.tasks">
                        <a ui-sref-active="active" ui-sref="projects.project.tasks.task({ taskId: t.id })">
                            {{t.name}}: {{t.status}}
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
                        <form>
                            <div class="modal-body">
                            
                                <label for="inputTaskName" class="">Task Name</label>
                                <input type="text" id="inputTaskName" class="form-control" 
                                    placeholder="Task Name" required autofocus 
                                    ng-model="$ctrl.task.name">

                                <label for="inputTaskDescription" class="">Task Description</label>
                                <input type="text" id="inputTaskDescription" class="form-control" 
                                    placeholder="Task Description" required autofocus 
                                    ng-model="$ctrl.task.description">

                                <label for="inputTaskPriority" class="">Task Priority</label>
                                <input type="text" id="inputTaskPriority" class="form-control" 
                                    placeholder="Task Priority" required autofocus 
                                    ng-model="$ctrl.task.priority">

                                <label for="inputTaskDueDate" class="">Task Due Date</label>
                                <input type="date" id="inputTaskDueDate" class="form-control" 
                                    placeholder="" required autofocus 
                                    ng-model="$ctrl.task.dueDate">

                                <label for="inputTaskUser" class="">Task User</label> 
                                <input type="email" id="inputTaskUser" class="form-control" required 
                                    placeholder="Enter email address of assigned user" autofocus 
                                    ng-model="$ctrl.task.user.email" value='' />

                            
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" ng-click="$ctrl.createNewTask()">Create New Task</button>
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