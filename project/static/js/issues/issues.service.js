angular.module('betaApp')
    .service('IssuesService', function (UtilService, $log, Flash, $state) {
        var testDataLocation = "../static/js/issues/issues.json";

        var service = {
            getIssues: function (projectId) {
                // called on page load to get all project issues
                return UtilService.post("/api/getProjectIssues", {
                        "projectId": projectId
                    })
                    .then(function (response) {
                        UtilService.checkIfSuccess(response);
                        console.log(response.data.data);
                        return response.data.data;
                    })
                    .catch(function (error) {
                        // get sample data instead
                        return UtilService.getSampleData(error, testDataLocation).then(function (response) {
                            return response.data.data;
                        });
                    });
            },

            getIssue: function (issueId) {
                // called on click of issue to get details
                console.log(issueId);
                return UtilService.post("/api/getIssue", {
                        "issueId": issueId
                    })
                    .then(function (response) {
                        UtilService.checkIfSuccess(response);
                        console.log(response.data.data);
                        return response.data.data;
                    })
                    .catch(function (error) {
                        // get sample data instead
                        return UtilService.getSampleData(error, testDataLocation).then(function (response) {
                            return response.data.data[issueId];
                        });
                    });
            },

            postNewIssue: function (projectId, issue) {
                return UtilService.post('/api/issue/new', {
                        "issue": issue,
                        "projectId": projectId
                    })
                    .then(function (response) {
                        if (!UtilService.checkIfSuccess(response)) {
                            Flash.create('danger', response.data.message, 3000, {
                                container: 'flash-newissue'
                            });
                            return false;
                        } else {
                            Flash.create('success', response.data.message, 3000);
                            $('#newIssueModal').modal('hide');
                            $state.reload();
                            return true;
                        }
                    })
                    .catch(function (error) {
                        UtilService.handleErrorWithFlash(error, "creating the issue", 0, "flash-newissue");
                    });
            },

            updateIssue: function () {
                // TODO
                return UtilService.post('/api/issue/update', {
                        "issueId": issue.id,
                        "issue": {
                            "name": issue.name,
                            "status": issue.status,
                            "priority": issue.priority,
                            "updatedDate": convertISODatetimeToMySQLString(new Date()),
                            "assignedToUser": issue.assignedToUser
                        }
                    })
                    .then(function (response) {
                        UtilService.checkIfSuccess(response);
                        return true;
                    })
                    .catch(function (error) {
                        UtilService.handleErrorWithFlash(error, "creating the issue", 0);
                    });
            }
        };
        return service;
    });