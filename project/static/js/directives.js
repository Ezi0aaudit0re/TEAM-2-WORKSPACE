angular.module('betaApp')
    .directive('myErrorMessages', function () {
        return {
            template: `
            <script type="text/ng-template" id="error-messages">
                <div ng-message="required">Please enter a value for this field.</div>
                <div ng-message="email">This field must be a valid email address.</div>
                <div ng-message-default>This field has an input error</div>
            </script>
            `
        };
    })
    .component('myErrorMessage', {
        // :( not working for the attributes)

        bindings: {
            myForm: '@',
            myField: '@'
        },
        template: `
            <div ng-messages={{$ctrl.target}} role="alert">
                {{$ctrl.myForm}}.{{$ctrl.myField}}
                <div ng-messages-include="error-messages"></div>
            </div>
            `,
        controller: function () {
            this.target = '' + this.myForm + '.' + this.myField + '.$error';
            console.log(this.target);
        }

    })
    .component('myModalButton', {

        bindings: {
            tgt: '@'
        },
        template: `
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target={{$ctrl.tgt}}>
                    Add
                </button>`
    })
    .directive('myModalClose', function () {
        return {
            template: `
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>`
        };
    })
    .directive('myModalForm', function () {
        return {
            scope: {
                myType: '='
            },
            template: `
            <!-- Modal -->
            <div class="modal fade" id="new{{myType}}Modal" tabindex="-1" role="dialog" aria-labelledby="new{{myType}}ModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="new{{myType}}ModalLabel">New {{myType}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <flash-message name="flash-newproject"></flash-message>
                        </div>

                    </div>
                </div>
            </div>
            `
        };
    })