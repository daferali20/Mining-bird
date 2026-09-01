## 2026-03-31 - Parallelizing Web3 Contract Read Requests
**Learning:** Sequential `await` calls on Web3 contract methods (`walletBalance`, `investmentBalance`, `yieldRate`) force serial HTTP/RPC round-trips over network latency, adding significant delay (especially in recurring polling intervals like `setInterval`).
**Action:** Always batch independent Web3 `.call()` read operations using `Promise.all([ ... ])` to execute them concurrently and reduce net latency down to a single network round-trip.
