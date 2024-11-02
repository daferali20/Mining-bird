// إعداد Web3
let web3;
let account;
let contract;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable().then(accounts => {
        account = accounts[0];
        // إعداد العقد باستخدام `contractAddress` و `contractABI`
        contract = new web3.eth.Contract(contractABI, contractAddress);
    }).catch(error => {
        console.error("MetaMask connection error: " + error.message);
    });
} else {
    alert("Please install MetaMask to use this DApp!");
}

let web3;
let account;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            console.log("Connected account:", account);

            // إعداد الكائن contract
            if (typeof contractAddress !== 'undefined' && typeof contractABI !== 'undefined') {
                contract = new web3.eth.Contract(contractABI, contractAddress);
                console.log("Contract loaded:", contract);
            } else {
                console.error("contractAddress or contractABI is not defined.");
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    } else {
        alert("Please install MetaMask to use this DApp!");
    }
}

// دالة للتحقق من أن الحساب هو المالك
async function isOwner() {
    try {
        const owner = await contract.methods.owner().call();
        return owner.toLowerCase() === account.toLowerCase();
    } catch (error) {
        console.error("Error checking owner:", error);
        return false;
    }
}

// الدوال الأخرى، مثل approveWithdrawal, withdrawYield, executeWithdrawal, withdrawFunds
async function approveWithdrawal() {
    if (!await isOwner()) {
        alert("Only the owner can approve withdrawal.");
        return;
    }
    try {
        await contract.methods.approveWithdrawal().send({ from: account });
        alert("Withdrawal approved successfully!");
    } catch (error) {
        console.error("Error approving withdrawal:", error);
        alert("Error: " + error.message);
    }
}

// استدعاء connectWallet عند تحميل الصفحة لتحديث الحسابات تلقائيًا
window.addEventListener('load', connectWallet);
