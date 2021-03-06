angular.module('betaApp')
    .component('project', {
        bindings: {
            project: '<'
        },

        template: `
            <div class="col-sm-3">
                <h2>
                    Project 
                    <button type="button" class="close" aria-label="Close" ui-sref="projects">
                        <span aria-hidden="true">&times;</span>
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
                        <select class="form-control" ng-disabled="$ctrl.readonly" ng-model="$ctrl.project.status" >
                            <option ng-value="0">Green – On Target</option>
                            <option ng-value="1">Green – Trending Down</option>
                            <option ng-value="2">Amber – Trending Up</option>
                            <option ng-value="3">Amber – No Change</option>
                            <option ng-value="4">Amber – Trending Down</option>
                            <option ng-value="5">Red – Trending Up</option>
                            <option ng-value="6">Red – No Change</option>
                            <option ng-value="7">Red – Trending Down</option>
                        </select>

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
                    <button class="btn btn-primary" ng-click="$ctrl.readonly  = !$ctrl.readonly">
                        {{$ctrl.readonly == true ? 'Edit' : 'Stop Editing'}}
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
            // to allow edit in same view
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

            // service call for update
            this.updateProject = function () {
                ProjectsService.updateProject(this.project);
            };
        }
    });