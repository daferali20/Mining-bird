## 2025-03-03 - Concurrent Web3 Contract Calls

**Learning:** Sequential `await` calls on independent Web3 contract read methods (`walletBalance`, `investmentBalance`, `yieldRate`) multiply network latency per poll/refresh. Executing them concurrently with `Promise.all` reduces total RPC fetch latency to the maximum single call duration (~66% latency reduction).
**Action:** Always wrap independent read-only smart contract view calls in `Promise.all` when updating dashboard state in Web3 DApps.
