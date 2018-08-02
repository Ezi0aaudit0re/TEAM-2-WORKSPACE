angular.module('betaApp')
    .component('issues', {
        bindings: {
            issues: '<',
            projectId: '<'
        },

        template: `
            <div class="col-sm-2">
                <h3>
                    Issues
                    <button type="button" class="close" aria-label="Close" ui-sref="projects.project">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    
                    <!-- Button trigger modal -->
                    <my-modal-button tgt="#newIssueModal"></my-modal-button>
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
                            <my-modal-close></my-modal-close>
                            <flash-message name="flash-newissue"></flash-message>
                        </div>
                        <div class="modal-body">
                            <form name="newIssueForm">
                                <label for="inputIssueSubject" class="">Issue Subject</label>
                                <input type="text" id="inputIssueSubject" class="form-control" placeholder="Issue Subject" name="inputIssueSubject"
                                    required autofocus ng-model="$ctrl.issue.subject">
                                <div ng-messages="newIssueForm.inputIssueSubject.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>
                                
                                <label for="inputIssueDescription" class="">Issue Description</label>
                                <input type="text" id="inputIssueDescription" class="form-control" placeholder="Issue Description" name="inputIssueDescription"
                                    required autofocus ng-model="$ctrl.issue.description">
                                <div ng-messages="newIssueForm.inputIssueDescription.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>

                                <label for="inputIssueUser" class="">Issue User</label> 
                                <input type="email" id="inputIssueUser" class="form-control" required name="inputIssueUser"
                                    placeholder="Enter email address of assigned user" autofocus 
                                    ng-model="$ctrl.issue.user.email" value='' />

                                <div ng-messages="newIssueForm.inputIssueUser.$error" role="alert">
                                    <div ng-messages-include="error-messages"></div>
                                </div>
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

        controller: function (IssuesService) {
            // TODO

            this.getIssuesForUser = function () {
                // TODO
                // this would be for a use-centric dashboard
            };

            this.createNewIssue = function () {
                // service call from modal form
                IssuesService.postNewIssue(this.projectId, this.issue);
            };
        }

    });