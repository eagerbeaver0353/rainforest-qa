const https = require("https");

const getResponse = (url) =>
    new Promise((resolve, reject) => {
        console.log(url)
        https
            .get(
                url,
                {
                    headers: {
                        accept: "application/json",
                    },
                },
                (resp) => {
                    let data = "";

                    // A chunk of data has been received.
                    resp.on("data", (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                    resp.on("end", () => {
                        resolve(JSON.parse(data));
                    });
                }
            )
            .on("error", (err) => {
                reject(err);
            });
    });

const solveProblem = async () => {
    let baseUrl = "https://www.letsrevolutionizetesting.com/challenge";
    while (true) {
        try {
            let result = await getResponse(baseUrl);
            console.log(result);
            baseUrl = result["follow"];
        } catch (error) {
            break;
        }
    }
};

solveProblem();
