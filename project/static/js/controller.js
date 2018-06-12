let betaApp = angular.module('betaApp', []);

//  TODO JSON data 
let objJSON = JSON.parse(window.localStorage.getItem("data"));

// configure the routes
betaApp.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            // route for the home page
            templateUrl: '../../templates/index.html',
            controller: 'IndexController'
        })
        .when('/login/', {
            // route for the issue tracking
            templateUrl: '../../templates/login.html',
            controller: 'LoginController'
        })
        .when('/project/', {
            // route for the project management
            templateUrl: '../../templates/project.html',
            controller: 'ProjectController'
        })
        .when('/message/', {
            //route for the task page
            templateUrl: '../../templates/message.html',
            controller: 'MessageController'
        })
        .when('/issue/', {
            // route for the issue tracking
            templateUrl: '../../templates/issue.html',
            controller: 'IssueController'
        })
        .otherwise({
            // route for the home page
            templateUrl: '../../templates/index.html',
            controller: 'IndexController'
        });
});

betaApp.HeaderController = ($scope, $location) => {
    // for making active page link in navbar highlighted
    $scope.isActive = (viewLocation) => {
        return viewLocation === $location.path();
    };
}

betaApp.IndexController = ($scope) => {
    // home page will load data from json file or storage

    $scope.message = 'Welcome to the home page!';

    // starting list if no local storage
    // load from JSON if not in local storage
    if (window.localStorage.getItem("data") === null) {

        window.localStorage.clear(); // to avoid non-relevent or "duplicate" items

        // this section needed to designate JSON, as otherwise interprets as XML and fails
        $.ajaxSetup({
            beforeSend: (xhr) => {
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType("application/json");
                }
            }
        });
        // load data
        $.getJSON("data.json", { format: "json" }, { async: false })
            .done((data) => {
                window.localStorage.setItem("data", JSON.stringify(data));
            })
    } else {
        // load from localStorage
    }
};

betaApp.LoginController = ($scope) => {
    // login
};

betaApp.ProjectController = ($scope) => {
    $scope.message = 'This page is for updating information on projects';

    // var objJSON = window.localStorage.getItem("keatingData");
    $scope.projects = objJSON.projects;

    $scope.saveProject = ($scope) => {
        // saves all projects to localStorage
        window.localStorage.setItem("data", JSON.stringify(objJSON));
        let elems = $(".ng-dirty");
        // clear class once drag ends
        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.remove("ng-dirty");
        }
    };

    $scope.removeProject = (project) => {
        // remove object
    }

    $scope.newProject = () => {
        $scope.projects.push({
            id: "",
            name: "",
            description: "",
            priority: "",
            status: "",
            startDate: "",
            dueDate: "",
            completedDate: "",
            nextSteps: "",
            assignedTeamMembers: [],
            comments: [],
            meetings: [],
            budget: "",
            cost: "",
            predecessors: [],
            tasks: []

        })
    }
};

betaApp.MessageController = ($scope) => {
    let socket = io.connect('http://' + document.domain + ':' + location.port + '/')

    socket.on('connect', () => {
        // connected
    })
}

betaApp.IssueController = ($scope) => {
    // TODO
}