const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });

export default async () => {
  const inviteCode = process.env.DISCORD_INVITE_CODE;
  if (!inviteCode) {
    return json(200, { count: null });
  }

  let res;
  try {
    res = await fetch(
      `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`
    );
  } catch {
    return json(502, { count: null });
  }

  if (!res.ok) {
    return json(502, { count: null });
  }

  const data = await res.json();
  const rawCount = data.approximate_member_count;
  const rawOnline = data.approximate_presence_count;
  const count = typeof rawCount === "number" ? rawCount : null;
  const onlineCount = typeof rawOnline === "number" ? rawOnline : null;

  return json(200, { count, onlineCount }, { "Cache-Control": "public, max-age=3600" });
};

export const config = {
  path: "/api/discord-count",
};
