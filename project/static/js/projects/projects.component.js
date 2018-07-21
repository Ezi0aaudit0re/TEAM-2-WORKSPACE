angular.module('betaApp')
    .component('projects', {
        bindings: {
            user: '<',
        },

        template: `
            Hi {{$ctrl.user.first_name}}!
            <div class="row" ng-init="">
                <div class="projects col-sm-2 sidebar ">
                    <h1>
                        Projects <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newProjectModal">
                            Add
                        </button>
                    </h1>
                    <ul>
                        <span ng-if="$ctrl.user.projects.length==0">Please create a project</span>
                        <li ng-repeat="project in $ctrl.user.projects">
                            <a ui-sref-active="active" ui-sref="projects.project({ projectId: project.id })">
                                {{project.name}}: {{project.status}}
                            </a>
                        </li>
                    </ul>
                </div>
                <ui-view></ui-view>
            </div>

            

            <!-- Modal -->
            <div class="modal fade" id="newProjectModal" tabindex="-1" role="dialog" aria-labelledby="newProjectModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="newProjectModalLabel">New Project</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <flash-message name="flash-newproject"></flash-message>
                        </div>
                        <div class="modal-body">
                            <form>
                                <label for="inputProjectName" class="sr-only">Project Name</label>
                                <input type="text" id="inputProjectName" class="form-control" 
                                    placeholder="Project Name" required autofocus ng-model="$ctrl.project.name">
                                <label for="inputProjectDescription" class="sr-only">Project Description</label>
                                <input type="text" id="inputProjectDescription" class="form-control" 
                                    placeholder="Project Description" required autofocus ng-model="$ctrl.project.description">

                                <span ng-repeat="user in $ctrl.project.users">
                                    <label for="inputProjectUser" class="sr-only">Project Users</label> 
                                    <input type="email" id="inputProjectUser" class="form-control" required 
                                        placeholder="Enter email address of user to add" autofocus 
                                        ng-model="$ctrl.project.users[$index].email" value='' />
                                    <button class="btn btn-danger" ng-show="$last" ng-click="$ctrl.removeUserFromProject()">-</button>
                                </span>
                                <button type="button" class="btn btn-primary" ng-click="$ctrl.addUserToProject()">Add a user</button>
                            
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" ng-click="$ctrl.newProject()">Create New Project</button>
                        </div>
                    </div>
                </div>
            </div>
            `,

        controller: function ($scope, $http, $log, ProjectsService) {
            // TODO

            this.project = {};
            this.project.users = [];

            this.addUserToProject = function () {
                // push an empty object to create blank field
                $log.log(this.project.users);
                this.project.users.push({});
            };

            this.removeUserFromProject = function () {
                // remove the last entry
                this.project.users.splice(this.project.users.length - 1);
            };

            this.newProject = function () {
                // TODO

                $log.log(this.project);
                ProjectsService.postNewProject(this.project);

            };

        }
    });