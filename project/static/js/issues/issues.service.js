angular.module('betaApp')
    .service('IssuesService', function ($http, $log, Flash) {
        var testIssueDataLocation = "../static/js/issues/issues.json";

        var service = {
            getIssues: function (projectId) {
                // called on page load to get all project issues
                return $http.post("/api/getProjectIssues", {
                        "project_id": projectId
                    }, {
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

            getIssue: function (issueId) {
                // called on click of issue to get details
                return $http.post("/api/getIssue", {
                        "issue_id": issueId
                    }, {
                        cache: true,
                        timeout: 3000
                    })
                    .then(function (response) {
                        return response.data.data;
                    })
                    .catch(function (error) {
                        $log.log("error getting issue: " + JSON.stringify(error));
                        // get sample data instead
                        return $http.get(testIssueDataLocation, {
                                cache: true,
                                timeout: 3000
                            })
                            .then(function (response) {
                                $log.log(response.data);
                                return response.data.data[issueId];
                            });
                    });
            },

            postNewIssue: function (projectId, issue) {
                return $http.post('/api/issue/new', {
                        "issue": issue,
                        "project_id": projectId
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
                return $http.post('/api/issue/update', {
                        "issue": {
                            "id": issue.id,
                            "name": issue.name,
                            "status": issue.status,
                            "priority": issue.priority,
                            "updated_date": new Date().toISOString().slice(0, 19).replace('T', ' '),
                            "assigned_to_user": issue.assigned_to_user
                        }
                    })
                    .then(function (results) {
                        Flash.create('success', 'Issue Updated!', 0);
                        $log.log("Successfully updated issue: " + JSON.stringify(results));
                        return true;
                    })
                    .catch(function (error) {
                        Flash.create('danger', 'There was an issue updating the issue', 0);
                        $log.log("error creating issue: " + error);
                        return false;
                    });
            }
        };
        return service;
    });