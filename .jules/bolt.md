## 2026-09-06 - Concurrent Web3 Contract Reads with Promise.all
**Learning:** In Web3 DApps, calling multiple read-only smart contract methods sequentially using `await` introduces cumulative network latency for each RPC round-trip. Running independent read calls concurrently via `Promise.all` reduces overall latency to the duration of the single slowest request (~66% latency reduction for 3 requests).
**Action:** Always wrap independent read-only Web3 smart contract calls (e.g. balance queries, rate checks) in `Promise.all` instead of sequential `await`s.
