## 2026-09-11 - Concurrent Read-Only Web3 Contract Calls

**Learning:** In DApps using Web3.js, executing independent `view` contract calls sequentially causes multi-round-trip RPC latency. Concurrent execution via `Promise.all` collapses network latency from N * RTT to 1 * RTT.
**Action:** Always wrap independent read-only Web3/Ethers contract queries in `Promise.all` when updating dashboard stats or balances.
