var UserViewModel = require("../../shared/view-models/user-database");

var user = new UserViewModel();

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = user;
};

exports.press = function() {
    user.putScore().catch(function(error) {
        console.log(error);
        dialogsModule.alert({
            message: "Unfortunately we could not register your score.",
            okButtonText: "OK"
        });
        return Promise.reject();
    })
}; 

/*
//WORK

var config = require("../../shared/config");
var fetchModule = require("fetch");

exports.press = function() {
    sendScore()
    .catch(function(error) {
        console.log(error);
        dialogsModule.alert({
            message: "Unfortunately we could not register your score.",
            okButtonText: "OK"
        });
        return Promise.reject();
    })
};

function sendScore() {
            return fetchModule.fetch(config.apiUrl, {
                method: "PUT",
                body: JSON.stringify({
                    student: "1",
                    spidergraphs: "1"
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(handleErrors);
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

*/