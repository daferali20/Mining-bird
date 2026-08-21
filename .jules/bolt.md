# Bolt's Journal - Critical Learnings

## 2025-05-18 - Batching Web3 RPC read calls in Ethereum DApps
**Learning:** Sequential `await` calls on `contract.methods.<method>().call()` incur additive RPC network latency overhead (3 * RTT). Using `Promise.all` executes all read calls concurrently in parallel over JSON-RPC.
**Action:** Always wrap independent Web3/Ethers contract read operations in `Promise.all()` to reduce network latency to a single round-trip time (1 * RTT).
