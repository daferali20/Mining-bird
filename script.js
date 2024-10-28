let web3;
let contract;
const contractAddress = "0x0DD5C4c9B169317BF0B77D927d2cB1eC3570Dbb3";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_usdtToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_investmentAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "transferFundsToInvestment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "annualReturnRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllInvestors",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "depositAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "depositTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "estimatedReturn",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "investmentAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "investmentPeriod",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "investors",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdtToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "depositAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "depositTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isInvestor",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        document.getElementById("walletStatus").innerText = `Connected: ${accounts[0]}`;
        contract = new web3.eth.Contract(contractABI, contractAddress);
        fetchUSDTBalance(accounts[0]);
    } else {
        alert("Please install MetaMask!");
    }
}

async function fetchUSDTBalance(userAddress) {
    const balance = await contract.methods.balanceOf(userAddress).call();
    document.getElementById("usdtBalance").innerText = web3.utils.fromWei(balance, 'ether') + " USDT";
}

async function depositUSDT() {
    const amount = document.getElementById("depositAmount").value;
    const accounts = await web3.eth.getAccounts();
    const amountInWei = web3.utils.toWei(amount, 'ether');

    await contract.methods.deposit(amountInWei).send({ from: accounts[0] });
    alert(`Deposited ${amount} USDT`);
    fetchUSDTBalance(accounts[0]);
}

async function calculateProjectedReturn(userAddress) {
    const userData = await contract.methods.getUserData(userAddress).call();
    document.getElementById("projectedReturn").innerText = `${web3.utils.fromWei(userData.projectedReturn, 'ether')} USDT`;
}

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}
const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const cryptoInvestmentAddress = "0xbcef5dC979B252c2b0E43119c1e3951B517688D1";

const usdtContract = new web3.eth.Contract(usdtAbi, usdtAddress);

// استدعاء الدالة approve قبل الإيداع
async function approveUSDT(amount, userAddress) {
    try {
        await usdtContract.methods.approve(cryptoInvestmentAddress, amount).send({ from: userAddress });
        console.log("Approval successful");
    } catch (error) {
        console.error("Approval failed", error);
    }
}

// دالة fetchUSDTBalance معدلة
async function fetchUSDTBalance(userAddress) {
    try {
        const balance = await usdtContract.methods.balanceOf(userAddress).call();
        document.getElementById("usdtBalance").innerText = web3.utils.fromWei(balance, 'ether') + " USDT";
    } catch (error) {
        console.error("Fetching balance failed", error);
    }
}

// تعديل دالة depositUSDT
async function depositUSDT() {
    const amount = document.getElementById("depositAmount").value;
    const accounts = await web3.eth.getAccounts();
    const amountInWei = web3.utils.toWei(amount, 'ether');

    // استدعاء approve قبل الإيداع
    await approveUSDT(amountInWei, accounts[0]);

    try {
        await contract.methods.deposit(amountInWei).send({ from: accounts[0] });
        alert(`Deposited ${amount} USDT`);
        fetchUSDTBalance(accounts[0]);
    } catch (error) {
        console.error("Deposit failed", error);
        alert("Deposit failed");
    }
}

// تعديل دالة calculateProjectedReturn
async function calculateProjectedReturn(userAddress) {
    try {
        const userData = await contract.methods.getUserData(userAddress).call();
        document.getElementById("projectedReturn").innerText = `${web3.utils.fromWei(userData.estimatedReturn, 'ether')} USDT`;
    } catch (error) {
        console.error("Calculating projected return failed", error);
    }
}
