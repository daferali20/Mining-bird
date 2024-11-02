// إعداد Web3
let web3;
let account;
let contract;

// الاتصال بمحفظة MetaMask
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // طلب الاتصال بحساب MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            console.log("Connected account:", account);
		
            // إعداد العقد باستخدام `contractAddress` و `contractABI`
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
//----------
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

async function updateBalances() {
	if (!account || !contract) return;
    try {
        // جلب الأرصدة من العقد
        const walletBalance = BigInt(await contract.methods.walletBalance().call());
        const investmentBalance = BigInt(await contract.methods.investmentBalance().call());
        const yieldRate = parseInt(await contract.methods.yieldRate().call(), 10);

        // العثور على عنصر walletBalance والتحقق من وجوده قبل التحديث
        const walletBalanceElement = document.getElementById("walletBalance");
        if (walletBalanceElement) {
            walletBalanceElement.textContent = (BigInt(walletBalance) / BigInt(1e18)).toString() + " ETH";
        } else {
            console.warn("Element with ID 'walletBalance' not found in HTML.");
        }

        // العثور على عنصر investmentBalance والتحقق من وجوده قبل التحديث
        const investmentBalanceElement = document.getElementById("investmentBalance");
        if (investmentBalanceElement) {
            investmentBalanceElement.textContent = (BigInt(investmentBalance) / BigInt(1e18)).toString() + " ETH";
        } else {
            console.warn("Element with ID 'investmentBalance' not found in HTML.");
        }

        // العثور على عنصر yieldRate والتحقق من وجوده قبل التحديث
        const yieldRateElement = document.getElementById("yieldRate");
        if (yieldRateElement) {
            yieldRateElement.textContent = (yieldRate / 100).toFixed(2) + "%";
        } else {
            console.warn("Element with ID 'yieldRate' not found in HTML.");
        }

        console.log("Balances updated:", {
            walletBalance: (BigInt(walletBalance) / BigInt(1e18)).toString(),
            investmentBalance: (BigInt(investmentBalance) / BigInt(1e18)).toString(),
            yieldRate: yieldRate / 100
        });
    } catch (error) {
        console.error("Error updating balances:", error);
    }
}

// تحديث المعلومات بشكل دوري
setInterval(updateBalances, 9000);
     // دالة السحب
async function withdrawFunds() {
    const amountInput = document.getElementById("withdrawAmount").value;
    const recipient = document.getElementById("recipientAddress").value || "0x0DD5C4c9B169317BF0B77D927d2cB1eC3570Dbb3";

    if (!amountInput || amountInput <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (!web3.utils.isAddress(recipient)) {
        alert("Please enter a valid recipient address.");
        return;
    }

    try {
        const amount = web3.utils.toWei(amountInput, 'ether');
        const gasEstimate = await contract.methods.withdraw(amount, recipient).estimateGas({ from: account });
        
        await contract.methods.withdraw(amount, recipient).send({ from: account, gas: gasEstimate });
        alert("Withdrawal successful!");
    } catch (error) {
        console.error("Error during withdrawal:", error);
        alert("Error: " + error.message);
    }
}

// دالة الموافقة على السحب
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
