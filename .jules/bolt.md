# Bolt's Performance Journal

## 2026-09-08 - Concurrent Web3 Contract Calls
**Learning:** Sequential `await` calls on Web3 contract `call()` methods in periodic update loops (e.g., `updateBalances`) multiply RPC network latency linearly (N x RTT).
**Action:** Use `Promise.all` to batch independent read-only smart contract view calls concurrently, reducing total update latency to 1 x RTT.
