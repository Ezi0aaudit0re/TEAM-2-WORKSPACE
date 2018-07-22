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
                        <input type="text" class="form-control" readonly ng-model="$ctrl.project.created_date" />
                    </div>
                    <div ng-show="$ctrl.readonly">
                        Update Date: 
                        <input type="text" class="form-control" readonly ng-model="$ctrl.project.updated_date" />
                    </div>
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
        controller: function ($log) {

            this.readonly = true;

            this.edit = function () {
                this.readonly = !this.readonly;
            };

            this.updateProject = function () {
                ProjectsService.updateProject();
            };
        }
    });