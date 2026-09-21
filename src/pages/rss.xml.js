import rss from "@astrojs/rss";
import { generateRSSFeed } from "../utils/content";
import { getValidLocale } from "../i18n/config";

export async function GET(context) {
  const locale = getValidLocale(
    context.currentLocale || context.preferredLocale,
  );
  const feedData = await generateRSSFeed(locale, context);
  return rss(feedData);
}
