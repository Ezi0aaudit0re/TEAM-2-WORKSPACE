describe('Unit: Testing Service', function () {
    describe("Projects Service:", function () {
        beforeEach(function () {
            angular.mock.module('app');
        });
        // it('should get user info', function () {

        beforeEach(inject(function (_ProjectsService_) {
            ProjectsService = _ProjectsService_;
        }));


        it('ProjectsService should exist', function () {
            expect(ProjectsService).toBeDefined();
        });

        // it('should contain nine post functions', function(ProjectsService) {
        //     expect(ProjectsService.)
        // })
        // expect().
        // });
    });

});