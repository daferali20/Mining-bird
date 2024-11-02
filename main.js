// إعداد Web3
let web3;
let account;
let contract;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable().then(accounts => {
        account = accounts[0];
        // إعداد العقد باستخدام `contractAddress` و `contractABI` من `contractInfo.js`
        contract = new web3.eth.Contract(contractABI, contractAddress);
    }).catch(error => {
        console.error("MetaMask connection error: " + error.message);
    });
} else {
    alert("Please install MetaMask to use this DApp!");
}

