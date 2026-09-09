## 2025-05-10 - Concurrent Web3 Contract Calls
**Learning:** Sequential `await` calls on independent smart contract read methods (`call()`) in Ethereum frontend applications introduce cumulative RPC latency overhead.
**Action:** Always wrap independent Web3 contract read calls in `Promise.all` to execute network requests concurrently, reducing latency by ~66%.
