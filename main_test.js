Deno.test("sanity test", () => {
    const isOk = Boolean(1 + 1 === 2);
    if (!isOk) {
        throw new Error("Sanity check failed");
    }
});
