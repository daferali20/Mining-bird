# Bolt's Journal - Critical Learnings

## 2026-08-20 - Web3 RPC Batching Pattern
**Learning:** Sequential `await` statements on read-only contract calls (`walletBalance`, `investmentBalance`, `yieldRate`) cause sequential network round-trips to Ethereum RPC nodes. Wrapping independent calls in `Promise.all` allows parallel RPC queries, reducing UI balance refresh latency from 3 round-trips down to 1.
**Action:** Always check Web3/Ethers/Ethereum contract view functions for independent calls and execute them concurrently with `Promise.all`.
