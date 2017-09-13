var config = require("../../shared/config");
var fetchModule = require("fetch");
var observableModule = require("data/observable");


function User(info) {
    
        // You can add properties to observables on creation
        let viewModel = new observableModule.fromObject();

        viewModel.putScore = function() {
            return fetchModule.fetch(config.apiUrl + "students/1/spidergraphs/1", {
                method: "PUT",
                body: JSON.stringify({
                    _id: "1",
                    student_id: "1",
                    value1:1,
                    value2:0,
                    value3:0,
                    value4:0,
                    value5:0
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