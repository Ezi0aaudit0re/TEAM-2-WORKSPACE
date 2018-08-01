angular.module('betaApp')
    .component('projects', {
        bindings: {
            user: '<',
            // project: '<'
        },

        template: `
            <div class="row" ng-init="">
                <div class="projects col-sm-3 sidebar ">
                    <h1>
                    {{$ctrl.user.firstName}} {{$ctrl.user.lastName}}'s Projects 
                    </h1>
                    <ul>
                    <input type="text" ng-model="search.project" placeholder="Filter by project">
                        <span ng-if="$ctrl.user.projects.length==0">Please create a project</span>
                        <li ng-repeat="project in $ctrl.user.projects | filter:search.project">
                            <a ui-sref-active="active" ui-sref="projects.project({ projectId: project.id })">
                                {{project.name}}: {{project.status}}
                            </a>
                        </li>
                    </ul>
                    <!-- Button trigger modal -->
                    <my-modal-button tgt="#newProjectModal"></my-modal-button>
                </div>
                
                <ui-view></ui-view>
            </div>

            

            <!-- Modal -->
            <div class="modal fade" id="newProjectModal" tabindex="-1" role="dialog" aria-labelledby="newProjectModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="newProjectModalLabel">New Project</h5>
                            <my-modal-close></my-modal-close>
                            <flash-message name="flash-newproject"></flash-message>
                        </div>

                        <form name="newProjectForm" ng-submit="">
                            <div class="modal-body">

                                <label for="inputProjectName" class="">Project Name</label>
                                <input type="text" id="inputProjectName" class="form-control" name="inputProjectName"
                                    placeholder="Project Name" required autofocus ng-model="$ctrl.project.name">
                                <div ng-messages="newProjectForm.inputProjectName.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>

                                <label for="inputProjectDescription" class="">Project Description</label>
                                <input type="text" id="inputProjectDescription" class="form-control" name="inputProjectDescription"
                                    placeholder="Project Description" required autofocus ng-model="$ctrl.project.description">
                                <div ng-messages="newProjectForm.inputProjectDescription.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>

                                <label for="inputProjectUser" class="">Project Users</label>
                                <span ng-repeat="user in $ctrl.project.users">
                                    <input type="email" id="inputProjectUser" class="form-control" required name="inputProjectUser"
                                        placeholder="Enter email address of user to add" autofocus 
                                        ng-model="$ctrl.project.users[$index].email" value='' />
                                    <button class="btn btn-danger" ng-show="$last" ng-click="$ctrl.removeUserFromProject()">-</button>
                                </span>
                                <div ng-messages="newProjectForm.inputProjectUser.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>
                                
                                
                                <button type="button" class="btn btn-primary" ng-click="$ctrl.addUserToProject()">Add a user</button>
                                
                            </div>

                            

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <input type="submit" class="btn btn-primary" id="submit" ng-disabled="newProjectForm.$invalid" 
                                    value="Create New Project" ng-click="$ctrl.newProject()" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <my-error-messages></my-error-messages>
            `,

        controller: function (ProjectsService) {


            this.project = {};
            this.project.users = [];

            this.addUserToProject = function () {
                // push an empty object to create blank field
                this.project.users.push({});
            };

            this.removeUserFromProject = function () {
                // remove the last entry
                this.project.users.splice(this.project.users.length - 1);
            };


            this.newProject = function () {
                console.log("newProject");
                ProjectsService.postNewProject(this.project);
                console.log("newProjectDone");
            };

        }
    });