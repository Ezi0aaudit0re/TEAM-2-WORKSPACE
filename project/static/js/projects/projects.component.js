angular.module('betaApp')
    .component('projects', {
        bindings: {
            user: '<',
            project: '<'
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

                        <form name="newProjectForm" ng-submit="$ctrl.newProject()">
                            <div class="modal-body">

                                <label for="inputProjectName" class="y">Project Name</label>
                                <input type="text" id="inputProjectName" class="form-control" 
                                    placeholder="Project Name" required autofocus ng-model="$ctrl.project.name">
                                
                                    <label for="inputProjectDescription" class="">Project Description</label>
                                <input type="text" id="inputProjectDescription" class="form-control" 
                                    placeholder="Project Description" required autofocus ng-model="$ctrl.project.description">


                                <label for="inputProjectUsers" class="">Project Users</label> 
                                <input type="email" id="inputProjectUsers" class="form-control" required 
                                placeholder="sophie@example.com,separatebyacomma@multiple.com" autofocus 
                                    ng-model="$ctrl.project.users" multiple />
                                
                            
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <input type="submit" class="btn btn-primary" id="submit" ng-disabled="newProjectForm.$invalid" value="Create New Project" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            `,

        controller: function ($log, ProjectsService) {
            // TODO

            this.newProject = function () {
                // TODO

                $log.log("I'm running");

                $log.log(this.project);
                ProjectsService.postNewProject();

            };

        }
    });