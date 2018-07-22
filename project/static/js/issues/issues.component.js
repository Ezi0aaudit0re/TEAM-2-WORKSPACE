angular.module('betaApp')
    .component('issues', {
        bindings: {
            issues: '<'
        },

        template: `
            <div class="col-sm-2">
                <h3>
                    Issues
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newIssueModal">
                        Add
                    </button>
                </h3>
                <ul>
                    <li ng-repeat="issue in $ctrl.issues">
                        <a ui-sref-active="active" ui-sref="projects.project.issues.issue({ issueId: issue.id })">
                            {{issue.subject}}: {{issue.status}}
                        </a>
                    </li>
                </ul>
                
                <button ui-sref="projects.project">Close Issues</button>
            </div>

            <ui-view></ui-view>
            
            <!-- Modal -->
            <div class="modal fade" id="newIssueModal" tabindex="-1" role="dialog" aria-labelledby="newIssueModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="newIssueModalLabel">New Issue</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <flash-message name="flash-newissue"></flash-message>
                        </div>
                        <div class="modal-body">
                            <form>
                                <label for="inputIssueSubject" class="sr-only">Issue Subject</label>
                                <input type="text" id="inputIssueSubject" class="form-control" placeholder="Issue Subject" required autofocus ng-model="$ctrl.issue.subject">
                                <label for="inputIssueDescription" class="sr-only">Issue Description</label>
                                <input type="text" id="inputIssueDescription" class="form-control" placeholder="Issue Description" required autofocus ng-model="$ctrl.issue.description">
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" ng-click="$ctrl.createNewIssue()">Create New Issue</button>
                        </div>
                    </div>
                </div>
            </div>
            
        `,

        controller: function ($log, IssuesService) {
            // TODO

            this.getIssuesForUser = function () {
                // TODO
            };

            this.createNewIssue = function () {
                // TODO
                IssuesService.postNewIssue();
            };
        }
    });