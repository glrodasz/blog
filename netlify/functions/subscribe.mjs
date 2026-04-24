const BREVO_CONTACTS_ENDPOINT = "https://api.brevo.com/v3/contacts";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });

const parseListIds = (raw) => {
  if (!raw) return undefined;
  const ids = raw
    .split(",")
    .map((value) => Number.parseInt(value.trim(), 10))
    .filter((value) => Number.isFinite(value));
  return ids.length > 0 ? ids : undefined;
};

export default async (req) => {
  if (req.method !== "POST") {
    return json(405, { error: "method_not_allowed" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return json(500, { error: "missing_api_key" });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const email = typeof payload?.email === "string" ? payload.email.trim() : "";
  if (!email || !EMAIL_PATTERN.test(email)) {
    return json(400, { error: "invalid_email" });
  }

  const body = {
    email,
    updateEnabled: true
  };
  const listIds = parseListIds(process.env.BREVO_LIST_IDS);
  if (listIds) body.listIds = listIds;

  const response = await fetch(BREVO_CONTACTS_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify(body)
  });

  if (response.ok) {
    return json(200, { ok: true });
  }

  // Brevo returns 400 with code "duplicate_parameter" when the contact already exists
  // and updateEnabled is false. With updateEnabled: true this shouldn't happen, but
  // treat it as success so the user still sees a confirmation.
  const detail = await response.json().catch(() => ({}));
  if (response.status === 400 && detail?.code === "duplicate_parameter") {
    return json(200, { ok: true, alreadySubscribed: true });
  }

  console.error("Brevo subscribe failed", response.status, detail);
  return json(502, { error: "upstream_error" });
};

export const config = {
  path: "/api/subscribe"
};
