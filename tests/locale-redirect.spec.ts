import { test, expect } from "@playwright/test";
import { LOCALE_STORAGE_KEY } from "../src/i18n/config";

const SAMPLE_POST = "/posts/ai-became-part-of-my-life/";

async function clearLocaleStorage(page: import("@playwright/test").Page) {
  await page.addInitScript((key) => {
    localStorage.removeItem(key);
  }, LOCALE_STORAGE_KEY);
}

test.describe("locale redirect", () => {
  test("skips negotiation on explicit post URLs", async ({ page }) => {
    await clearLocaleStorage(page);
    await page.goto(SAMPLE_POST);

    await expect(page).toHaveURL(SAMPLE_POST);
    await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "");
    await expect(page.locator("html")).not.toHaveAttribute("data-locale-pending", "");
  });

  test("redirects saved Spanish preference from / to /es/", async ({ page }) => {
    await page.addInitScript(
      ({ key, value }) => {
        localStorage.setItem(key, value);
      },
      { key: LOCALE_STORAGE_KEY, value: "es" }
    );

    await page.goto("/");

    await expect(page).toHaveURL(/\/es\/?$/);
    await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "");
  });

  test("does not redirect explicit post URLs when saved preference is Spanish", async ({
    page,
  }) => {
    await page.addInitScript(
      ({ key, value }) => {
        localStorage.setItem(key, value);
      },
      { key: LOCALE_STORAGE_KEY, value: "es" }
    );

    await page.goto(SAMPLE_POST);

    await expect(page).toHaveURL(SAMPLE_POST);
    await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "");
  });

  test("does not redirect English tag URLs when saved preference is Spanish", async ({
    page,
  }) => {
    await page.addInitScript(
      ({ key, value }) => {
        localStorage.setItem(key, value);
      },
      { key: LOCALE_STORAGE_KEY, value: "es" }
    );

    await page.goto("/tags/learn-to-program/");

    await expect(page).toHaveURL("/tags/learn-to-program/");
    await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "");
  });

  test("persists locale when using the language toggle", async ({ page }) => {
    await clearLocaleStorage(page);
    await page.goto("/es/");

    const toggle = page.locator(".language-toggle");
    await expect(toggle).toBeVisible();

    await toggle.dispatchEvent("mousedown");
    const storedLocale = await page.evaluate(
      (key) => localStorage.getItem(key),
      LOCALE_STORAGE_KEY
    );
    expect(storedLocale).toBe("en");

    await toggle.click();
    await expect(page).toHaveURL("/");
  });

  test("shows skeleton gate briefly on negotiable paths", async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.setItem(key, "en");
    }, LOCALE_STORAGE_KEY);

    await page.goto("/about");

    await expect(page).toHaveURL("/about");
    await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "");
    await expect(page.locator("html")).not.toHaveAttribute("data-locale-pending", "");
  });
});

test.describe("locale redirect with Spanish locale", () => {
  test.use({ locale: "es-ES" });

  test("redirects Spanish browser from / to /es/", async ({ page, context }) => {
    await context.clearCookies();
    await clearLocaleStorage(page);

    await page.goto("/");

    await expect(page).toHaveURL(/\/es\/?$/);
    await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "");
  });

  test("redirects Spanish browser from /about to /es/about", async ({ page }) => {
    await clearLocaleStorage(page);
    await page.goto("/about");

    await expect(page).toHaveURL("/es/about");
    await expect(page.locator("html")).toHaveAttribute("data-locale-ready", "");
  });
});
