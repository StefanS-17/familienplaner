# Familienplaner – Einrichtung

Die App läuft sofort im **Testmodus**: `index.html` öffnen (Doppelklick), PINs festlegen, ausprobieren. Im Testmodus bleiben die Daten auf dem jeweiligen Gerät.

Damit **alle Familienmitglieder auf ihren Handys und Tablets dieselben Daten** sehen, braucht es zwei kostenlose Dienste:

| Dienst | Wofür | Kosten |
|---|---|---|
| **Supabase** | speichert die Daten online und synchronisiert alle Geräte | kostenlos |
| **GitHub Pages** | macht die App unter einer Internet-Adresse erreichbar | kostenlos |

Dauer: ca. 20 Minuten, einmalig. Claude hilft bei jedem Schritt.

---

## Schritt 1 – Supabase-Projekt anlegen

1. Auf **supabase.com** gehen und kostenloses Konto erstellen (z. B. „Continue with GitHub“).
2. **New project** klicken.
   - Name: `familienplaner`
   - Database Password: ein sicheres Passwort ausdenken und notieren (wird später kaum gebraucht)
   - Region: **Frankfurt (eu-central-1)**
   - **Enable Data API:** an lassen (nötig)
   - **Automatically expose new tables:** an lassen (der Text in Schritt 2 funktioniert aber auch, wenn es aus ist)
3. Warten, bis das Projekt fertig ist (ca. 2 Minuten).

## Schritt 2 – Datentabelle anlegen

1. Links im Menü **SQL Editor** öffnen → **New query**.
2. Den folgenden Text komplett einfügen und auf **Run** klicken:

```sql
create table items (
  id text primary key,
  type text not null,
  data jsonb not null,
  updated_at timestamptz default now()
);

grant select, insert, update, delete on items to authenticated;

alter table items enable row level security;

create policy "Nur angemeldete Familie" on items
  for all to authenticated using (true) with check (true);

alter table items replica identity full;
alter publication supabase_realtime add table items;
```

Es sollte „Success“ erscheinen.

## Schritt 3 – Familienkonto anlegen

Das Familienkonto ist **ein gemeinsames Login für alle Geräte**. Es wird pro Gerät nur einmal eingegeben. Danach wählt jede Person sich wie gewohnt mit Name + PIN aus.

1. Links **Authentication** → **Users** → **Add user** → **Create new user**.
2. E-Mail: deine E-Mail-Adresse (oder eine eigene Familien-Adresse).
3. Passwort: ein sicheres Passwort, das nur Eltern kennen.
4. Haken bei **Auto Confirm User** setzen → **Create user**.
5. Unter **Authentication → Sign In / Providers** den Punkt **Allow new users to sign up** **ausschalten**. So kann sich niemand Fremdes ein Konto anlegen.

## Schritt 4 – Zugangsdaten für die App kopieren

1. Links **Project Settings** (Zahnrad) → **API** (bzw. „Data API“ / „API Keys“).
2. Kopieren:
   - **Project URL** (z. B. `https://abcd1234.supabase.co`)
   - **anon / public key** (langer Text, beginnt meist mit `eyJ…` oder `sb_publishable_…`)
3. Beides an Claude geben. Claude trägt es oben in `index.html` ein:

```js
const CLOUD = { url: 'https://abcd1234.supabase.co', key: 'eyJ…' };
```

Dieser Schlüssel darf öffentlich sein. Ohne das Familienkonto-Passwort kommt niemand an die Daten.

## Schritt 5 – Online stellen mit GitHub Pages

1. Auf **github.com** ein neues Repository anlegen: Name `familienplaner`.
   **Wichtig:** README, .gitignore und License **nicht** ankreuzen (leer anlegen).
2. Mit **GitHub Desktop** den Ordner `dev/familien-app` hinzufügen und veröffentlichen (Claude hilft).
3. Im Repository auf GitHub: **Settings → Pages** → Source: **Deploy from a branch** → Branch **main** / **root** → **Save**.
4. Nach 1–2 Minuten ist die App erreichbar unter:
   `https://stefans-17.github.io/familienplaner/`

> Hinweis: Bei einem kostenlosen GitHub-Konto muss das Repository für GitHub Pages **öffentlich** sein. Das ist unkritisch: Im Code stehen keine Familiendaten. Die liegen geschützt bei Supabase.

## Schritt 6 – Auf Handys und Tablets installieren

Auf jedem Gerät die Adresse aus Schritt 5 öffnen und dann:

- **iPhone / iPad (Safari):** Teilen-Symbol → **Zum Home-Bildschirm**
- **Android (Chrome):** Menü ⋮ → **App installieren** bzw. **Zum Startbildschirm hinzufügen**

Beim ersten Start: Familienkonto-E-Mail + Passwort eingeben (einmalig). Danach erscheint die Personenauswahl mit PIN.

---

## Wie es funktioniert

- Der **Admin** (ein Elternteil) verwaltet: Personen anlegen, Rollen, Farben und PINs ändern (Menü **Verwaltung**).
- **Eltern** dürfen alles anlegen, bearbeiten und löschen.
- **Kinder** sehen alles und dürfen Einträge anlegen. Diese erscheinen als **Vorschlag** und müssen von einem Elternteil unter **Freigaben** bestätigt oder abgelehnt werden. Eigene Aufgaben dürfen Kinder selbst abhaken.
- **Datensicherung:** unter Verwaltung → „Sicherung herunterladen“ (ab und zu machen).

**Zur Sicherheit:** Die PIN dient zur Auswahl der Person innerhalb der Familie. Sie ist kein Schutz gegen technisch versierte Angreifer. Vor Fremden schützt das Familienkonto-Passwort.

---

## Schritt 7 – Google Kalender anzeigen (optional)

Jede Person kann unter **Meine Einstellungen** einen oder mehrere Google Kalender verknüpfen. Die Termine erscheinen dann in ihrer Farbe in der App. Das ist **nur lesen**: Geändert wird weiter direkt in Google.

### 7a – Einmalig: Helfer-Funktion in Supabase anlegen

Der Browser darf Google-Kalender nicht direkt abrufen. Deshalb holt eine kleine Supabase-Funktion die Termine ab.

1. In Supabase links **Edge Functions** öffnen → **Deploy a new function** → **Via Editor**.
2. Den Beispielcode im Editor komplett löschen und den Inhalt der Datei `supabase/google-kalender/index.ts` hineinkopieren.
3. Unten als Namen **`google-kalender`** eintragen (genau so) → **Deploy function**.
4. Danach in der Funktion auf **Details** bzw. **Settings** gehen. Die Option **Verify JWT** (auch: „Enforce JWT verification“) **ausschalten** und speichern. Die Funktion prüft die Anmeldung selbst.

### 7b – Pro Person: Google Kalender verknüpfen

1. **Am Computer** calendar.google.com öffnen (in der Handy-App gibt es diese Einstellung nicht).
2. Oben rechts ⚙️ → **Einstellungen**.
3. Links unter **Einstellungen für meine Kalender** den gewünschten Kalender anklicken.
4. Nach unten zu **Kalender integrieren** scrollen → **Geheime Adresse im iCal-Format** kopieren.
5. In der Familien-App: oben rechts auf den eigenen Namen → **Meine Einstellungen** → Adresse einfügen → **Verknüpfen**.

Die App aktualisiert die Google-Termine automatisch alle 15 Minuten und beim Öffnen.
Die geheime Adresse bitte nicht weitergeben: Wer sie kennt, kann den Kalender lesen.
