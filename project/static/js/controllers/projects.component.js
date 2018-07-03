angular.module('betaApp')
    .component('projects', {
        bindings: {
            projects: '<'
        },

        template: `
            <div class="flex-h">
                <div class="projects">
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
            `,

        controller: function ($http, $log) {
            // TODO
            $log.log("projects controller running " + JSON.stringify(this));

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