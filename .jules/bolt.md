# Bolt's Performance Journal ⚡

## 2026-08-22 - Concurrent RPC Contract Calls in Web3 Frontend
**Learning:** Sequential `await` calls for independent Web3 contract read methods (`call()`) create network latency bottlenecks where the total wait time is the sum of all RPC round-trips ($3 \times T$). Using `Promise.all` allows web3 provider requests to execute concurrently, cutting latency down to $1 \times T$ (~66% improvement).
**Action:** Always batch or execute independent Web3 contract view queries concurrently using `Promise.all`.
