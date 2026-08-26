## 2025-05-18 - Batch Independent Web3 RPC Read Calls
**Learning:** Sequential `await` calls on smart contract view functions in Web3.js UI polling functions create unnecessary latency bottlenecks by performing sequential network round-trips.
**Action:** Use `Promise.all` to fetch independent contract `call()` read requests in parallel, cutting data fetch latency by N-fold (e.g., 3x speedup for 3 calls).
