angular.module('betaApp')
    .component('issue', {
        bindings: {
            issue: '<'
        },

        template: `
            <div">

                <ul>
                    <li>
                        <a id={{$ctrl.issue.subject}}>
                            {{$ctrl.issue.subject}}
                            <div>
                                {{$ctrl.issue.priority}}
                            </div>
                            <div>
                                {{$ctrl.issue.description}}
                            </div>
                            <div>
                                {{$ctrl.issue.severity}}
                            </div>
                            <div>
                                {{$ctrl.issue.status}}
                            </div>
                            <div>
                                {{$ctrl.issue.created_at}}
                            </div>
                            <div>
                                {{$ctrl.issue.updated_at}}
                            </div>
                            <div>
                                {{$ctrl.issue.assigned_to_user_id}}
                            </div>
                            <div>
                                {{$ctrl.issue.created_by_user}}
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <button ui-sref="projects.project.issues">Close Issue</button>
        `,

        controller: function ($stateParams, $log) {
            // TODO

            $log.log("issueId: " + $stateParams.issueId);
        }
    })