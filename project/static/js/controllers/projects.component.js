angular.module('betaApp')
    .component('projects', {
        bindings: {
            projects: '<'
        },

        template: `
            <div>
                <div>
                    <div ng-repeat="project in $ctrl.projects">

                            <a ui-sref-active="active" ui-sref="projects.project({ projectId: project.id })">
                            <div>
                                {{project.name}}
                            </div>
                            <div>
                                {{project.status}}
                            </div>
                        </a>
                        
                    </div>
                    <ui-view></ui-view>
                </div>
            `,

        controller: function ($http, $log) {
            // TODO
            $log.log("projects controller running " + JSON.stringify(this));

            this.showProject = function (id) {
                // TODO

                $log.log(id);

                $http.get("/api/project/:id", {
                        timeout: 3000
                    })
                    .then(function (response) {
                        this.project = response.data.records;
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