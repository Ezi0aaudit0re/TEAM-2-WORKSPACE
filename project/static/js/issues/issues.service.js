angular.module('betaApp')
    .service('IssuesService', function ($http, $log, Flash) {
        var testIssueDataLocation = "../static/js/issues/issues.json";

        var service = {
            getIssues: function (projectId) {
                // called on page load to get all project issues
                return $http.post("/api/projects/" + projectId + "/issues", {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting issues: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.post(testIssueDataLocation, {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                return response.data.data;
                            });
                    });
            },

            getIssue: function (projectId, issueId) {
                // called on click of issue to get details
                return $http.post("/api/projects/" + projectId + "/issues/" + issueId, {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting issue: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.post(testIssueDataLocation, {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                $log.log(response.data);
                                return response.data.data[issueId];
                            });
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
                        $('#newIssueModal').modal('hide');
                        return true;
                    })
                    .catch(function (error) {
                        Flash.create('danger', 'There was an issue creating the issue', 0, {
                            container: 'flash-newissue'
                        });
                        $log.log("error creating issue: " + error);
                        return false;
                    });
            },

            updateIssue: function () {
                // TODO
            }
        };
        return service;
    });