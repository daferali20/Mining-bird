## 2025-05-15 - Parallelize Web3 async read requests
**Learning:** Sequential `await` calls on Web3 contract read methods (`walletBalance()`, `investmentBalance()`, `yieldRate()`) introduce unnecessary RPC round-trip delays in periodic UI refresh loops (`setInterval(updateBalances, 9000)`). Using `Promise.all` executes these read queries concurrently, reducing network latency by ~66% (from 3 RPC RTTs down to 1).
**Action:** Always batch independent Web3 or network read operations with `Promise.all` in dashboard data-fetching functions.
