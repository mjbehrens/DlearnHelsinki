var config = require("../../shared/config");
var fetchModule = require("fetch");
var observableModule = require("data/observable");


function User(info) {
    
        // You can add properties to observables on creation
        let viewModel = new observableModule.fromObject();

        viewModel.putScore = function() {
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
        };

        return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

// Export the module User 
module.exports = User;