## 2026-03-31 - Parallelize Sequential Web3 RPC Calls

**Learning:** Sequential `await` calls on smart contract read methods (`contract.methods.x().call()`) introduce multiple round-trip network delays (RTT), causing noticeable latency when updating UI states. Grouping independent read requests with `Promise.all` executes RPC calls concurrently and cuts down loading delays to a single network RTT.

**Action:** Whenever reading multiple independent state fields from smart contracts via Web3/Ethers, use `Promise.all` to fetch them concurrently instead of awaiting each sequentially.
