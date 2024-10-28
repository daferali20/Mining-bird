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
