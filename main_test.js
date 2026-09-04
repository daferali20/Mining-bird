Deno.test("updateBalances concurrent calls test", async () => {
  let calls = [];
  const mockCall = (name) => () => {
    calls.push(name);
    return Promise.resolve("1000000000000000000");
  };

  const contract = {
    methods: {
      walletBalance: () => ({ call: mockCall("walletBalance") }),
      investmentBalance: () => ({ call: mockCall("investmentBalance") }),
      yieldRate: () => ({ call: mockCall("yieldRate") })
    }
  };

  const results = await Promise.all([
    contract.methods.walletBalance().call(),
    contract.methods.investmentBalance().call(),
    contract.methods.yieldRate().call()
  ]);

  if (results.length !== 3 || calls.length !== 3) {
    throw new Error("Concurrent contract calls failed");
  }
});
