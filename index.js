const request = require('request'),
      isUrl = require("is-url");


function requestUrl(url) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: url,
            "rejectUnauthorized": false,
        }, function(error, response, body) {
            // body is the decompressed response body
            if (error) {
                reject("ERROR");
            }
            resolve(response.headers["x-citizenfx-url"])
        })
    });
}


function tryRequest() {
    if (isUrl(process.argv[2])) {
        requestUrl(process.argv[2]).then(asd => {
            if (!isNaN(asd.charAt(0))) {
                console.log("FOUND: " + asd);
            } else {
                console.log("Couldn't find retrying...")
                tryRequest();
            }
        })
    } else {
        console.log("Argument is not an Url!\nUsage: node filename.js <link to cfx.re>");
        process.exit(69);
    }
}

tryRequest();
