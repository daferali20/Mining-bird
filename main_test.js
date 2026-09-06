import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";

Deno.test("main script sanity check", () => {
  assertEquals(1 + 1, 2);
});
