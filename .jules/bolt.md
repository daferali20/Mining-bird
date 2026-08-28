## 2025-08-28 - Parallel RPC Calls with Promise.all
**Learning:** Sequential await statements on independent Web3 contract read methods (`call()`) introduce unnecessary RPC network round-trip latency. Executing them concurrently with `Promise.all` improves UI response time and reduces polling overhead.
**Action:** When making multiple contract view calls that do not depend on each other's outputs, execute them in parallel using `Promise.all`.
