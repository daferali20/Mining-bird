// إعداد Web3
let web3;
let account;
let contract;

// Helper function لعرض إشعارات ناعمة للأخطاء والنجاح
function showToast(message, isError = false) {
    const toast = document.getElementById("toastNotification");
    if (!toast) {
        alert(message);
        return;
    }
    toast.textContent = message;
    toast.style.backgroundColor = isError ? "#ef4444" : "#10b981";
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 4000);
}

// الاتصال بمحفظة MetaMask
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // طلب الاتصال بحساب MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
            console.log("Connected account:", account);

            const walletAddressElem = document.getElementById("walletAddress");
            if (walletAddressElem) {
                walletAddressElem.textContent = "Wallet Address: " + account.substring(0, 6) + "..." + account.substring(account.length - 4);
            }

            // إعداد العقد باستخدام `contractAddress` و `contractABI`
            if (typeof contractAddress !== 'undefined' && typeof contractABI !== 'undefined') {
                contract = new web3.eth.Contract(contractABI, contractAddress);
                console.log("Contract loaded:", contract);
                updateBalances();
            } else {
                console.error("contractAddress or contractABI is not defined.");
            }

            // الاستماع لتغيير الحسابات والشبكة
            if (window.ethereum.on) {
                window.ethereum.on('accountsChanged', (newAccounts) => {
                    if (newAccounts.length === 0) {
                        account = null;
                        if (walletAddressElem) walletAddressElem.textContent = "Wallet Address: Not Connected";
                        showToast("Wallet disconnected.", true);
                    } else {
                        account = newAccounts[0];
                        if (walletAddressElem) walletAddressElem.textContent = "Wallet Address: " + account.substring(0, 6) + "..." + account.substring(account.length - 4);
                        showToast("Account changed: " + account.substring(0, 6) + "...");
                        updateBalances();
                    }
                });

                window.ethereum.on('chainChanged', () => {
                    window.location.reload();
                });
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            showToast("Failed to connect wallet: " + error.message, true);
        }
    } else {
        showToast("Please install MetaMask to use this DApp!", true);
    }
}

// دالة للتحقق من أن الحساب هو المالك
async function isOwner() {
    try {
        if (!contract || !account) return false;
        const owner = await contract.methods.owner().call();
        return owner.toLowerCase() === account.toLowerCase();
    } catch (error) {
        console.error("Error checking owner:", error);
        return false;
    }
}

// دالة الإيداع
async function deposit() {
    const amountInput = document.getElementById("amountInput").value;
    const amount = parseFloat(amountInput);

    if (!amount || amount <= 0) {
        showToast("Please enter a valid amount.", true);
        return;
    }

    try {
        const gasEstimate = await contract.methods.deposit().estimateGas({
            from: account,
            value: web3.utils.toWei(amount.toString(), 'ether')
        });

        await contract.methods.deposit().send({
            from: account,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gas: gasEstimate
        });

        showToast("Deposit successful!");
        updateBalances();
    } catch (error) {
        console.error("Error during deposit:", error);
        showToast("Transaction failed: " + error.message, true);
    }
}

// دالة بدء الاستثمار
async function startInvestment() {
    if (!account) {
        showToast("Please connect your wallet first.", true);
        return;
    }
    try {
        const gasEstimate = await contract.methods.startInvestment().estimateGas({ from: account });
        await contract.methods.startInvestment().send({ from: account, gas: gasEstimate });
        showToast("Investment started successfully!");
        updateBalances();
    } catch (error) {
        console.error("Error in starting investment:", error);
        showToast("Error: " + error.message, true);
    }
}

async function updateBalances() {
    if (!account || !contract) return;
    try {
        // ⚡ Bolt Optimization: Fetch contract states concurrently using Promise.all instead of sequential await calls.
        // Impact: Reduces RPC round-trip delay from 3 * T latency to 1 * T latency (~66% performance boost on balance polling).
        const [walletBalance, investmentBalance, rawYieldRate] = await Promise.all([
            contract.methods.walletBalance().call(),
            contract.methods.investmentBalance().call(),
            contract.methods.yieldRate().call()
        ]);
        const yieldRate = parseInt(rawYieldRate, 10);

        const walletBalanceElement = document.getElementById("walletBalance");
        if (walletBalanceElement) {
            walletBalanceElement.textContent = web3.utils.fromWei(walletBalance.toString(), 'ether') + " ETH";
        }

        const investmentBalanceElement = document.getElementById("investmentBalance");
        if (investmentBalanceElement) {
            investmentBalanceElement.textContent = web3.utils.fromWei(investmentBalance.toString(), 'ether') + " ETH";
        }

        const yieldRateElement = document.getElementById("yieldRate");
        if (yieldRateElement) {
            yieldRateElement.textContent = (yieldRate / 100).toFixed(2) + "%";
        }
    } catch (error) {
        console.error("Error updating balances:", error);
    }
}

setInterval(updateBalances, 9000);

// دالة سحب الأرباح/العائد
async function withdrawYield() {
    if (!account || !contract) {
        showToast("Please connect your wallet first.", true);
        return;
    }
    try {
        const gasEstimate = await contract.methods.withdrawYield().estimateGas({ from: account });
        await contract.methods.withdrawYield().send({ from: account, gas: gasEstimate });
        showToast("Yield withdrawn successfully!");
        updateBalances();
    } catch (error) {
        console.error("Error withdrawing yield:", error);
        showToast("Error: " + error.message, true);
    }
}

// دالة تنفيذ السحب
async function executeWithdrawal() {
    const amountInput = document.getElementById("withdrawAmount") ? document.getElementById("withdrawAmount").value : prompt("Enter amount in ETH to withdraw:");
    if (!amountInput || parseFloat(amountInput) <= 0) {
        showToast("Please enter a valid amount.", true);
        return;
    }
    try {
        const amount = web3.utils.toWei(amountInput.toString(), 'ether');
        const gasEstimate = await contract.methods.executeWithdrawal(amount).estimateGas({ from: account });
        await contract.methods.executeWithdrawal(amount).send({ from: account, gas: gasEstimate });
        showToast("Withdrawal executed successfully!");
        updateBalances();
    } catch (error) {
        console.error("Error executing withdrawal:", error);
        showToast("Error: " + error.message, true);
    }
}

// دالة السحب
async function withdrawFunds() {
    const amountInput = document.getElementById("withdrawAmount").value;
    const recipient = document.getElementById("recipientAddress").value || "0x0DD5C4c9B169317BF0B77D927d2cB1eC3570Dbb3";

    if (!amountInput || amountInput <= 0) {
        showToast("Please enter a valid amount.", true);
        return;
    }

    if (!web3.utils.isAddress(recipient)) {
        showToast("Please enter a valid recipient address.", true);
        return;
    }

    try {
        const amount = web3.utils.toWei(amountInput, 'ether');
        const gasEstimate = await contract.methods.withdraw(amount, recipient).estimateGas({ from: account });
        
        await contract.methods.withdraw(amount, recipient).send({ from: account, gas: gasEstimate });
        showToast("Withdrawal successful!");
    } catch (error) {
        console.error("Error during withdrawal:", error);
        showToast("Error: " + error.message, true);
    }
}

// دالة الموافقة على السحب
async function approveWithdrawal() {
    if (!await isOwner()) {
        showToast("Only the owner can approve withdrawal.", true);
        return;
    }
    try {
        await contract.methods.approveWithdrawal().send({ from: account });
        showToast("Withdrawal approved successfully!");
    } catch (error) {
        console.error("Error approving withdrawal:", error);
        showToast("Error: " + error.message, true);
    }
}

window.addEventListener('load', connectWallet);
