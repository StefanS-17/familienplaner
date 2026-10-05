// Supabase Edge Function "google-kalender"
// Holt einen Google Kalender über seine geheime iCal-Adresse ab, damit die
// Familien-App die Termine anzeigen kann (Browser dürfen das nicht direkt).
// Nur angemeldete Nutzer des Familienkontos dürfen sie verwenden, und es
// werden ausschließlich Adressen von calendar.google.com abgerufen.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const text = (msg: string, status = 200) =>
  new Response(msg, { status, headers: { ...CORS, 'Content-Type': 'text/plain; charset=utf-8' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  // 1. Ist ein Familienmitglied angemeldet?
  const who = await fetch(`${Deno.env.get('SUPABASE_URL')}/auth/v1/user`, {
    headers: {
      Authorization: req.headers.get('Authorization') ?? '',
      apikey: req.headers.get('apikey') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    },
  });
  if (!who.ok) return text('Nicht angemeldet', 401);

  // 2. Ist es eine Google-Kalender-Adresse?
  let url: URL;
  try { url = new URL((await req.json()).url); } catch { return text('Ungültige Adresse', 400); }
  if (url.protocol !== 'https:' || url.hostname !== 'calendar.google.com' || !url.pathname.startsWith('/calendar/ical/')) {
    return text('Nur Google-Kalender-Adressen sind erlaubt', 400);
  }

  // 3. Kalender bei Google abholen
  const res = await fetch(url);
  if (!res.ok) {
    return text(res.status === 404 ? 'Google kennt diese Adresse nicht – bitte prüfen' : `Google antwortet mit Fehler ${res.status}`, 502);
  }
  return new Response(await res.text(), { headers: { ...CORS, 'Content-Type': 'text/calendar; charset=utf-8' } });
});
