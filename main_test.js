Deno.test("sanity test", () => {
    const isOk = Boolean(1 + 1 === 2);
    if (isOk !== true) {
        throw new Error("Sanity check failed");
    }
});
