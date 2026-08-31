# Bolt's Performance Journal ⚡

## 2026-03-31 - Parallelizing RPC calls for DApp balance updates
**Learning:** Sequential `await` statements for Web3 contract `view` function calls create noticeable RPC round-trip network latency, as each call waits for the previous call's response before sending the next. Using `Promise.all()` executes requests concurrently, reducing total wait time to approximately the max latency of a single request instead of the sum of all requests.
**Action:** Always batch or execute independent Web3 RPC/smart contract view calls concurrently using `Promise.all()`.
