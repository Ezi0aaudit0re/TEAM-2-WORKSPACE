angular.module('betaApp')
    .component('issue', {
        bindings: {
            issue: '<'
        },

        template: `
        <div class="col-sm-4">
            <h4>
                {{$ctrl.issue.subject}}
                <button class="btn btn-primary" ng-click="$ctrl.readonly  = !$ctrl.readonly">
                    {{$ctrl.readonly == true ? 'Edit' : 'Stop Editing'}}
                </button>
            </h4>
            <form name="issueForm">

                <div>
                    Priority
                    <input type="text" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.issue.priority" />
                </div>
                <div>
                    Description
                    <input type="text" class="form-control" readonly ng-model="$ctrl.issue.description" />
                </div>
                <div>
                    Severity
                    <input type="text" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.issue.severity" />
                </div>
                <div>
                    Status
                    <input type="text" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.issue.status" />
                    <select class="form-control" ng-disabled="$ctrl.readonly" ng-model="$ctrl.issue.status" >
                        <option ng-value="0">Created</option>
                        <option ng-value="1">Assigned</option>
                        <option ng-value="2">In Progress</option>
                        <option ng-value="3">Fix Developed</option>
                        <option ng-value="4">Awaiting QA</option>
                        <option ng-value="5">QA Completed</option>
                        <option ng-value="6">Promoted to Production</option>
                    </select>
                </div>
                <div>
                    Created At:
                    <input type="text" class="form-control" readonly ng-model="$ctrl.issue.created_at" />
                </div>
                <div>
                    Updated At:
                    <input type="text" class="form-control" readonly ng-model="$ctrl.issue.updated_at" />
                </div>
                <div>
                    Assigned To User:
                    <input type="email" class="form-control" ng-readonly="$ctrl.readonly" ng-model="$ctrl.issue.assigned_to_user_id" />
                </div>
                <div>
                    Created By User:
                    <input type="text" class="form-control" readonly ng-model="$ctrl.issue.created_by_user" />
                </div>

            </form>
            <button ng-show="issueForm.$dirty" class="btn btn-primary" ng-click="$ctrl.updateIssue()">
                Submit Changes
            </button>
        </div>
        <button ui-sref="projects.project.issues">Close Issue</button>
        `,

        controller: function () {
            // TODO
            this.readonly = true;

            this.edit = function () {
                this.readonly = !this.readonly;
            };

            this.updateIssue = function () {
                IssuesService.updateIssue();
            };
        }
    });