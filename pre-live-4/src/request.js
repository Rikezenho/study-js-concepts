const https = require('https');

class Request {
    constructor() {

    }

    errorTimeout = (reject, urlRequest) => () => reject(new Error(`timeout at [${urlRequest}]`))

    raceTimeoutDelay(url, timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(this.errorTimeout(reject, url), timeout);
        });
    }

    async get(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                const chunks = [];
                res
                    .on('data', data => chunks.push(data))
                    .on('end', () => resolve(JSON.parse(chunks.join(''))));
            })
                .on('error', reject);
        });
    }
    async makeRequest({ url, method, timeout }) {
        return Promise.race([
            this[method](url),
            this.raceTimeoutDelay(url, timeout),
        ]);
    }
}

module.exports = Request;