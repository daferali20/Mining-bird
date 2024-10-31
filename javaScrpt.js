 
        let web3;
        let account;
        let contract;

        const contractAddress = "0x0524371A8549Cf197c0F31E320bB48608b3A4cC9"; // ضع عنوان العقد هنا
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
        // الاتصال بالمحفظة
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            document.getElementById("walletAddress").innerText = `Wallet Address: ${account}`;

            contract = new web3.eth.Contract(contractABI, contractAddress);
            updateBalances();
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            alert("Could not connect to wallet. Please try again.");
        }
    } else {
        alert("Please install MetaMask to connect your wallet.");
    }
}
const gasEstimate = await contract.methods.myFunction().estimateGas({ from: account });
const result = await contract.methods.myFunction().send({ from: account, gas: gasEstimate });
// دالة الإيداع باستخدام ETH
async function deposit() {
    const amountInput = document.getElementById("amountInput").value;
    const amount = parseFloat(amountInput);
    
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        // تأكد من إعداد `value` بشكل صحيح كجزء من كائن `send`
       await web3.eth.sendTransaction({
            from: account,
	    to: contractAddress,
            value: web3.utils.toWei(amount.toString(), 'ether') // هنا يتم تحديد `value` بالقيمة الصحيحة
        });
        
        alert("Deposit successful!");
        updateBalances();
    } catch (error) {
        console.error("Error during deposit:", error);
        alert("Error: " + error.message);
    }
}
async function startInvestment() {
    console.log("Start Investment button clicked"); // تشخيص النقر على الزر

    if (!account) {
        alert("Please connect your wallet first.");
        return;
    }
    try {
        console.log("Calling startInvestment on contract..."); // تشخيص الوصول إلى العقد

        // استدعاء الدالة startInvestment من العقد
        await contract.methods.startInvestment().send({ from: account });

        alert("Investment started successfully!");
        updateBalances(); // تحديث الأرصدة بعد بدء الاستثمار
    } catch (error) {
        console.error("Error in starting investment:", error);
        alert("Error: " + error.message);
    }
}
// تحديث الأرصدة
async function updateBalances() {
    try {
	console.log("Fetching balances from contract...");
	    
        const walletBalance = await contract.methods.walletBalance().call({ from: account });
        const investmentBalance = await contract.methods.investmentBalance().call({ from: account });
        const yieldRate = await contract.methods.yieldRate().call({ from: account });

        document.getElementById("walletBalance").textContent = web3.utils.fromWei(walletBalance, 'ether') + " ETH";
        document.getElementById("investmentBalance").textContent = web3.utils.fromWei(investmentBalance, 'ether') + " ETH";
        document.getElementById("yieldRate").textContent = (yieldRate / 100).toFixed(2) + "%";
	    console.log("Balances updated:", {
            walletBalance: web3.utils.fromWei(walletBalance, 'ether'),
            investmentBalance: web3.utils.fromWei(investmentBalance, 'ether'),
            yieldRate: yieldRate / 100
        });
    } catch (error) {
        console.error("Error updating balances:", error);
    }
}
async function withdrawFunds() {
    const amount = web3.utils.toWei("0.0014", "ether"); // أو أي مبلغ تريده
    const recipient = "0x0DD5C4c9B169317BF0B77D927d2cB1eC3570Dbb3"; // ضع عنوان المستلم هنا

    try {
        await contract.methods.withdraw(amount, recipient).send({ from: account });
        console.log("Withdrawal successful!");
    } catch (error) {
        console.error("Error during withdrawal:", error);
    }
}


        // تحديث المعلومات بشكل دوري
        setInterval(updateBalances, 9000);
    
