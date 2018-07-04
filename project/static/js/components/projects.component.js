angular.module('betaApp')
    .component('projects', {
        bindings: {
            projects: '<'
        },

        template: `
            <div class="flex-h">
                <div class="projects pa-sidebar well well-small">
                    <h3>Projects</h3>
                    <ul>
                        <li ng-repeat="project in $ctrl.projects">
                            <a ui-sref-active="active" ui-sref="projects.project({ projectId: project.id })">
                                {{project.name}}: {{project.status}}
                            </a>
                        </li>
                    </ul>
                </div>
                <ui-view></ui-view>
            </div>

            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newProjectModal">
                Add New Project
            </button>

            <!-- Modal -->
            <div class="modal fade" id="newProjectModal" tabindex="-1" role="dialog" aria-labelledby="newProjectModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="newProjectModalLabel">New Project</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <label for="inputProjectName" class="sr-only">Project Name</label>
                                <input type="text" id="inputProjectName" class="form-control" placeholder="Project Name" required autofocus ng-model="$ctrl.project.name">
                                <label for="inputProjectDescription" class="sr-only">Project Description</label>
                                <input type="text" id="inputProjectDescription" class="form-control" placeholder="Project Description" required autofocus
                                    ng-model="$ctrl.project.description">
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" ng-click="$ctrl.newProject()">Create New Project</button>
                        </div>
                    </div>
                </div>
            </div>
            `,

        controller: function ($http, $log) {
            // TODO

            this.showProject = function () {
                // TODO

                $http.get("/api/projects/:id", {
                        timeout: 3000
                    })
                    .then(function (response) {
                        this.project = response.data;
                    });
            };

            this.newProject = function () {
                // TODO
                $log.log(this.project);

                $http.post('/api/project/new', {
                        "project": this.project
                    })
                    .then(function (results) {
                        $log.log("Successfully created project: " + JSON.stringify(results));
                    })
                    .catch(function (error) {
                        $log.log("error creating project: " + JSON.stringify(error));
                    });
            };
        }
    })