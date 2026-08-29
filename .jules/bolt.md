## 2025-05-18 - Concurrent Web3 Contract Calls in Polling Loops
**Learning:** Sequential `await` calls on Web3 contract `.call()` methods block execution across multiple network RPC round-trips. Grouping independent read queries into `Promise.all` allows parallel network requests and cuts latency from $T_1 + T_2 + T_3$ to $\max(T_1, T_2, T_3)$.
**Action:** Always check periodic balance update or dashboard refresh functions for sequential contract state fetches and combine them into `Promise.all`.
