// Basic test file for Deno test runner in CI environment

function add(a, b) {
  return a + b;
}

if (typeof Deno !== "undefined" && Deno.test) {
  Deno.test("sample addition test", () => {
    if (add(2, 3) !== 5) {
      throw new Error("add(2, 3) should equal 5");
    }
  });
}
