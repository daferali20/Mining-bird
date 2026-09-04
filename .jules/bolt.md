## 2025-09-04 - Concurrent Web3 Contract Calls
**Learning:** Independent read-only Web3 contract calls executed sequentially with `await` accumulate RPC network latency additively ($T_1 + T_2 + T_3$).
**Action:** Always group independent read-only contract calls in `Promise.all` to execute them in parallel, reducing RPC fetching time to $\max(T_1, T_2, T_3)$.
