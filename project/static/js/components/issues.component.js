angular.module('betaApp')
    .component('issues', {
        bindings: {
            issues: '<'
        },

        template: `
            <div>
            Issues
                <ul>
                    <li ng-repeat="issue in $ctrl.issues">
                        <a ui-sref-active="active" ui-sref="projects.project.issues.issue({ issueId: issue.id })">
                            {{issue.name}}: {{issue.status}}
                        </a>
                    </li>
                </ul>
                <ui-view></ui-view>
            </div>
            
            <form ng-submit="send()">
                <input type="text" ng-model="text" placeholder="...">
                <input type="submit" value="Send">
            </form>
            </div>
            <button ui-sref="projects.project">Close Issues</button>
        `,

        controller: function () {
            // TODO

            this.getIssuesForUser = function () {
                // TODO
            }
        }
    })