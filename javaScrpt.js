 
        let web3;
        let account;
        let contract;

        const contractAddress = "0xd1977eEF9c4941820ef2bEe8AB896Be1534578Bc"; // ضع عنوان العقد هنا
        const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "approveWithdrawal",
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
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
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
		"name": "startInvestment",
		"outputs": [],
		"stateMutability": "nonpayable",
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

// دالة بدء الاستثمار
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
//----------
console.log("Contract Address:", contractAddress);
console.log("Contract ABI:", contractABI);
// تحديث المعلومات بشكل دوري
setInterval(updateBalances, 9000);
// إعداد العقد
                contract = new web3.eth.Contract(contractABI, contractAddress);
            }).catch(error => {
                displayError("MetaMask connection error: " + error.message);
            });
        } else {
            alert("Please install MetaMask to use this DApp!");
        }

        // عرض رسائل الخطأ
        function displayError(message) {
            const errorDisplay = document.getElementById("errorDisplay");
            errorDisplay.style.display = "block";
            errorDisplay.innerText = message;
            console.error(message);
        }

        // التحقق من أن الحساب هو المالك
        async function isOwner() {
            try {
                const owner = await contract.methods.owner().call();
                return owner.toLowerCase() === account.toLowerCase();
            } catch (error) {
                displayError("Error checking owner: " + error.message);
                return false;
            }
        }

        // دالة الموافقة على السحب
        async function approveWithdrawal() {
            if (!await isOwner()) {
                displayError("Only the owner can approve withdrawal.");
                return;
            }
            try {
                await contract.methods.approveWithdrawal().send({ from: account });
                alert("Withdrawal approved successfully!");
            } catch (error) {
                displayError("Error approving withdrawal: " + error.message);
            }
        }

        // دالة سحب العوائد
        async function withdrawYield() {
            if (!await isOwner()) {
                displayError("Only the owner can withdraw yield.");
                return;
            }
            try {
                await contract.methods.withdrawYield().send({ from: account });
                alert("Yield withdrawn successfully!");
            } catch (error) {
                displayError("Error withdrawing yield: " + error.message);
            }
        }

        // دالة تنفيذ السحب
        async function executeWithdrawal() {
            if (!await isOwner()) {
                displayError("Only the owner can execute withdrawals.");
                return;
            }
            const amount = document.getElementById("withdrawAmountEth").value;
            if (!amount || amount <= 0) {
                displayError("Please enter a valid amount.");
                return;
            }
            try {
                await contract.methods.executeWithdrawal(web3.utils.toWei(amount, 'mwei')).send({ from: account });
                alert("Withdrawal executed successfully!");
            } catch (error) {
                displayError("Error executing withdrawal: " + error.message);
            }
        }

        // دالة سحب الأموال
        async function withdrawFunds() {
            if (!await isOwner()) {
                displayError("Only the owner can withdraw funds.");
                return;
            }
            const amount = document.getElementById("withdrawAmountEth").value;
            const recipient = document.getElementById("recipientAddress").value;
            if (!amount || !recipient) {
                displayError("Please enter both amount and recipient address.");
                return;
            }
            try {
                await contract.methods.withdraw(web3.utils.toWei(amount, "ether"), recipient).send({ from: account });
                alert("Funds withdrawn successfully!");
            } catch (error) {
                displayError("Error withdrawing funds: " + error.message);
            }
        }

       
