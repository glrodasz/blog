import fs from "node:fs";

type Redirect = Record<
  string,
  {
    destination: string;
    status: 301;
  }
>;

export const getRedirects = async (): Promise<Redirect> => {
  const redirectsContent = fs.readFileSync("_redirects", "utf-8");

  const redirects: Redirect = {};

  redirectsContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .forEach((line) => {
      const [from, to, status] = line.split(" ");
      if (from && to && status === "301") {
        redirects[from] = {
          destination: to,
          status: 301,
        };
      }
    });

  return redirects;
};
