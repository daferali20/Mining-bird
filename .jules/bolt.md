# Bolt's Journal - Critical Learnings

## 2025-08-24 - Parallel Web3 Contract Read Calls
**Learning:** In Web3/Ethereum DApps, making sequential `await` calls for independent contract read methods (such as `walletBalance()`, `investmentBalance()`, `yieldRate()`) creates network request waterfalls, multiplying total latency by the number of calls.
**Action:** Always wrap independent Web3 contract read promises in `Promise.all()` to dispatch requests concurrently and reduce latency to a single round-trip time ($1 \times \text{RTT}$).
