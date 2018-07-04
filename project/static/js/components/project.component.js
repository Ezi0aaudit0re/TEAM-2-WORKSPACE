angular.module('betaApp')
    .component('project', {
        bindings: {
            project: '<'
        },

        template: `
            <div>
                <h4>Project</h4>
                <div>
                    Name: {{$ctrl.project.name}}
                </div>
                <div>
                    Description: {{$ctrl.project.description}}
                </div>
                <div>
                    Status: {{$ctrl.project.status}}
                </div>
                <div>
                    Created Date: {{$ctrl.project.created_date}}
                </div>
                <div>
                    Update Date: {{$ctrl.project.updated_date}}
                </div>
                <a ui-sref="projects.project.tasks" ui-sref-active="active">Tasks</a>
                <a ui-sref="projects.project.messages" ui-sref-active="active">Messages</a>
                <a ui-sref="projects.project.issues" ui-sref-active="active">Issues</a>
                
            </div>
            <ui-view class="pull-right"></ui-view>
            <button ui-sref="projects">Close Project</button>
            `
    })