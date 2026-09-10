# Bolt's Journal - Critical Learnings

## 2026-08-20 - Batching Independent Web3 Contract Call Requests
**Learning:** Sequential `await` calls for independent read-only smart contract methods (`walletBalance`, `investmentBalance`, `yieldRate`) introduce cumulative network latency for every RPC round-trip. Using `Promise.all` executes these calls concurrently, cutting total RPC latency by up to ~66%.
**Action:** Always wrap independent Web3 contract `.call()` promises in `Promise.all` when fetching dashboard metrics or balances concurrently.
