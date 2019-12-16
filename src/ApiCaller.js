// Call apis through proxy.
// Apis can be external blockchain.info api, backend server api

class ApiCaller {

    // This call points to blockchain.info api through proxy server
    static getHash(hash = "0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103") {
        console.log("apiCAll : ", hash);
        return fetch("http://127.0.0.1:8081/proxy/rawblock/" + hash).then(res => res.json());

    }

    // This call points to blockchain.info api through proxy server
    static getLastHashBlock() {
        return fetch("http://127.0.0.1:8081/proxy/q/latesthash").then(function (response) {
            return response.text();
        }).then(function (data) {
            return data// this will be a string
        });
    }

    // This call points to local backend server api through proxy server
    static getLastBlocks() {
        return fetch("http://127.0.0.1:8081/proxyLocal/getLastBlocks",{method : 'POST'}).then(function (response) {
            return response.json();
        })
    }
}

export default ApiCaller;