## 2025-08-27 - Parallel Web3 RPC Contract Calls
**Learning:** Sequential `await` calls on Web3 contract methods (`walletBalance`, `investmentBalance`, `yieldRate`) cause network request waterfalling over RPC provider connections.
**Action:** Use `Promise.all()` to batch independent Web3 contract read calls concurrently, reducing fetch latency by ~66%.
