angular.module('betaApp')
    .service('IssuesService', function ($http, $log, Flash) {
        var service = {
            getIssues: function (id) {
                // called on page load to get all project issues
                return $http.get("/api/projects/" + id + "/issues", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting issues: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get("../static/js/issues/issues.json", {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                return response.data.data;
                            });
                    });
            },

            getIssue: function (id) {

                function issueMatchesParam(issue) {
                    return issue.id === id;
                }

                return service.getIssues().then(function (issues) {
                    return issues.find(issueMatchesParam);
                });
            },

            postNewIssue: function (issue) {
                return $http.post('/api/issue/new', {
                        "issue": this.issue
                    })
                    .then(function (results) {
                        var code = results.data.code;
                        var msg = results.data.message;
                        Flash.create('success', msg, 0);
                        $log.log("Successfully created issue: " + JSON.stringify(results));
                        return true;
                    })
                    .catch(function (error) {
                        Flash.create('danger', 'There was an issue creating the issue', 0);
                        $log.log("error creating issue: " + error);
                        return false;
                    });
            },
        };
        return service;
    })