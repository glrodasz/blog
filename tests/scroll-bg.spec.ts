import { test, expect } from "@playwright/test";

test.describe("scroll-tinted page background", () => {
  test("toggles at-top and footer-visible on <body>", async ({ page }) => {
    await page.goto("/");

    const body = page.locator("body");

    await expect(body).toHaveClass(/\bat-top\b/);
    await expect(body).not.toHaveClass(/\bfooter-visible\b/);

    const vh = await page.evaluate(() => window.innerHeight);
    await page.evaluate((y) => window.scrollTo(0, y), Math.ceil(vh * 0.2));
    await expect(body).not.toHaveClass(/\bat-top\b/);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(body).toHaveClass(/\bfooter-visible\b/);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(body).toHaveClass(/\bat-top\b/);
    await expect(body).not.toHaveClass(/\bfooter-visible\b/);
  });

  test("body background changes between top and bottom", async ({ page }) => {
    await page.goto("/");

    const readBg = () =>
      page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    await expect(page.locator("body")).toHaveClass(/\bat-top\b/);
    const bgAtTop = await readBg();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("body")).toHaveClass(/\bfooter-visible\b/);
    const bgAtBottom = await readBg();

    expect(bgAtBottom).not.toBe(bgAtTop);
  });
});
