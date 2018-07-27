angular.module('betaApp')
    .component('project', {
        bindings: {
            project: '<'
        },

        template: `
            <div class="col-sm-2">
                <h2>
                    Project 
                    <button class="btn btn-primary" ng-click="$ctrl.readonly  = !$ctrl.readonly">
                        {{$ctrl.readonly == true ? 'Edit' : 'Stop Editing'}}
                    </button>
                    
                </h2>
                <form name="projectForm">
                    <span>
                        Name:
                        <input type="text" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.project.name" />
                    </span>
                    <div>
                        Description:
                        <input type="text" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.project.description" />
                    </div>
                    <div>
                        Status:
                        <input type="text" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.project.status" />
                    </div>
                    <div ng-show="$ctrl.readonly">
                        Created Date: 
                        <input type="text" class="form-control" readonly ng-model="$ctrl.project.createdDate" />
                    </div>
                    <div ng-show="$ctrl.readonly">
                        Updated Date: 
                        <input type="text" class="form-control" readonly ng-model="$ctrl.project.updatedDate" />
                    </div>

                    <label for="inputProjectUser" class="">Project Users</label>
                    <span ng-repeat="user in $ctrl.project.users">    
                                    <input type="email" id="inputProjectUser" class="form-control" required ng-readonly="$ctrl.readonly"
                                        placeholder="Enter email address of user to add" autofocus 
                                        ng-model="$ctrl.project.users[$index].email" value='' />
                                    <button class="btn btn-danger" ng-show="$last && !$ctrl.readonly" ng-click="$ctrl.removeUserFromProject()">-</button>
                    </span>
                    <button type="button" class="btn btn-primary" ng-show="!$ctrl.readonly" ng-click="$ctrl.addUserToProject()">Add a user</button>

                </form>
                <div>
                    <button ng-show="projectForm.$dirty" class="btn btn-primary" ng-click="$ctrl.updateProject()">
                        Submit Changes
                    </button>
                    <button class="btn btn-secondary" ui-sref="projects">Close Project</button>
                </div>

            </div>
            
            <ui-view>
                <a ui-sref="projects.project.tasks" ui-sref-active="active">Tasks</a>
                <a ui-sref="projects.project.messages" ui-sref-active="active">Messages</a>
                <a ui-sref="projects.project.issues" ui-sref-active="active">Issues</a>
            </ui-view>
            
            
            `,
        controller: function (ProjectsService) {

            this.readonly = true;

            this.addUserToProject = function () {
                // push an empty object to create blank field
                this.project.users.push({});
            };

            this.removeUserFromProject = function () {
                // remove the last entry
                this.project.users.splice(this.project.users.length - 1);
            };

            this.edit = function () {
                this.readonly = !this.readonly;
            };

            this.updateProject = function () {
                ProjectsService.updateProject(this.project);
            };
        }
    });