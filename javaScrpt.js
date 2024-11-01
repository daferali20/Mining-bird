 
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
        // تقدير الغاز لدالة `deposit` بدون تمرير `amount` كمدخل
        const gasEstimate = await contract.methods.deposit().estimateGas({
            from: account,
            value: web3.utils.toWei(amount.toString(), 'ether')
        });

        // استدعاء دالة `deposit` من خلال `contract.methods` وإرسال `msg.value` فقط
        await contract.methods.deposit().send({
            from: account,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gas: gasEstimate
        });

        alert("Deposit successful!");
        updateBalances(); // تحديث الأرصدة بعد الإيداع
    } catch (error) {
        console.error("Error during deposit:", error);
        alert("Transaction failed: " + error.message);
    }
}



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
    try {
        // جلب الأرصدة من العقد
        const walletBalance = BigInt(await contract.methods.walletBalance().call());
        const investmentBalance = BigInt(await contract.methods.investmentBalance().call());
        const yieldRate = parseInt(await contract.methods.yieldRate().call(), 10);

        // تحويل BigInt إلى String عند العرض
        document.getElementById("walletBalance").textContent = (walletBalance / BigInt(1e18)).toString() + " ETH";
        document.getElementById("investmentBalance").textContent = (investmentBalance / BigInt(1e18)).toString() + " ETH";
        document.getElementById("yieldRate").textContent = (yieldRate / 100).toFixed(2) + "%";

        console.log("Balances updated:", {
            walletBalance: (walletBalance / BigInt(1e18)).toString(),
            investmentBalance: (investmentBalance / BigInt(1e18)).toString(),
            yieldRate: yieldRate / 100
        });
    } catch (error) {
        console.error("Error updating balances:", error);
    }
}

// دالة السحب
async function withdrawFunds() {
    const amountInput = document.getElementById("withdrawAmount").value;
    const recipientInput = document.getElementById("recipientAddress").value;
    const amount = web3.utils.toWei(amountInput.toString(), 'ether');

    try {
        await contract.methods.withdraw(amount, recipientInput).send({ from: account });
        alert("Withdrawal successful!");
        updateBalances();
    } catch (error) {
        console.error("Error during withdrawal:", error);
        alert("Error: " + error.message);
    }
}

// تحديث المعلومات بشكل دوري
setInterval(updateBalances, 9000);
    
