## 2025-03-07 - Web3 Concurrent Contract Call Batching
**Learning:** Sequential `await` calls on read-only contract methods (such as `walletBalance`, `investmentBalance`, `yieldRate`) introduce significant RPC latency overhead (3x RTT). Executing independent contract reads concurrently with `Promise.all` reduces overall query latency to 1x RTT.
**Action:** When updating dashboard balances or UI states that read multiple contract values, always wrap independent read-only `.call()` promises in `Promise.all`.
