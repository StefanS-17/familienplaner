# Familien-App – Anforderungen

Stand: 05.10.2026 · Idee angelehnt an den Familienkalender „Daely“

## Ziel
Gemeinsames Tool für die Familie, um Themen und Aufgaben zu verwalten, einzutragen, zu dokumentieren und zu kommunizieren. Nutzbar auf Tablet und Handy.

## Technik
- **App:** eine einzelne HTML-Datei (`index.html`), auf Handy/Tablet als „App“ zum Startbildschirm hinzufügbar
- **Daten & Logins:** Supabase (kostenloser Cloud-Dienst, Änderungen erscheinen sofort auf allen Geräten)
- **Hosting:** GitHub Pages (kostenlos)
- Keine Anbindung an Google/Apple-Kalender in Version 1

## Bereiche (Version 1)
1. **Kalender & Termine**, farbig pro Person
2. **Aufgaben & Ämtli**: To-dos und wiederkehrende Haushaltsaufgaben, Personen zuweisen, abhaken
3. **Einkaufsliste & Essensplan** (Woche)
4. **Pinnwand & Notizen**: Nachrichten an die Familie, Dokumentation wichtiger Infos
5. **Schule & Sport**
   - Wochen-Stundenplan pro Kind
   - Wiederkehrende Trainings (erscheinen automatisch im Kalender)
   - Spiele, Turniere, Ausflüge als Einzeltermine (Ort, Mitbringliste)
   - Ferien & schulfreie Tage (Stundenplan pausiert)

## Zugänge & Rechte
- **Login:** Person antippen + 4-stellige PIN
- **Admin:** verwaltet Personen, PINs und Rechte
- **Eltern:** sehen alles, dürfen alles anlegen, bearbeiten und löschen, bestätigen oder lehnen Vorschläge der Kinder ab
- **Kinder:** sehen alles, dürfen Einträge anlegen. Diese gelten als **Vorschlag**, bis ein Elternteil sie bestätigt oder ablehnt. Kein Bearbeiten/Löschen.

## Familie
2 Elternteile (einer davon **Admin**) und 2 Kinder, jede Person mit eigener Farbe.

Farben, Rollen und PINs lassen sich in der App unter **Verwaltung** ändern.

## Vorbild Daely – was übernommen wird
- Farbliche Kennzeichnung pro Person (Filter-Leiste, Personenkarten, Termin-Balken)
- Klare Navigation (Seitenleiste auf Tablet, Leiste unten auf dem Handy)
- Einfachheit: wenige Felder, große Tippflächen

## Ergänzende Regeln
- Kinder dürfen **eigene Aufgaben selbst abhaken**, ohne Bestätigung.
- Einkaufsliste abhaken: nur Eltern (Kinder setzen Einträge als Vorschlag drauf).

## Version 2 (06.10.2026)
- **Meine Einstellungen** pro Person (gilt auf allen Geräten): eigene Farbe, Hintergrundfarbe (Auswahl oder eigene), Hell/Dunkel/Automatisch
- **Google Familienkalender anzeigen** (nur lesen): nur der **Admin** verknüpft Kalender unter Verwaltung (geheime iCal-Adresse). Name im Termintitel → Farbe dieser Person, sonst „Ganze Familie“ (abschaltbar, Standard-Zuordnung wählbar). Abruf über Supabase Edge Function `google-kalender`, Aktualisierung alle 15 Min.

## Version 3 (08.10.2026) – Einkauf & Essen
- **Rezepte** (neuer Reiter): Name + Zutaten (eine pro Zeile, Mengen wie „500 g“, „2 EL“, „1 Dose“)
- **Essensplan**: Beim Eintragen werden passende Rezepte vorgeschlagen und deren Zutaten übernommen. Neue Gerichte mit Zutaten werden automatisch als Rezept gemerkt.
- **Einkaufsliste „Für den Essensplan“**: rechnet die Zutaten aller Mahlzeiten der nächsten 3/7/14 Tage automatisch zusammen (gleiche Zutaten + Einzahl/Mehrzahl zusammengefasst, g/kg und ml/l umgerechnet), zeigt pro Zutat, für welches Gericht sie ist, aktualisiert sich bei jeder Änderung am Essensplan.
- Abhaken nur Eltern; Vorschläge der Kinder (Gericht/Rezept) erst nach Freigabe auf der Liste.
- Die bisherige Liste heißt jetzt „Weitere Einkäufe“.

## Stand
- [x] Version 1 gebaut (`index.html`), Testmodus funktioniert
- [x] Supabase eingerichtet (Projekt drwuqnwepaaqlafsktfa, Frankfurt), Familienkonto angelegt, Registrierung gesperrt, Live-Sync getestet
- [x] Online unter https://stefans-17.github.io/familienplaner/
- [x] Edge Function `google-kalender` in Supabase angelegt und getestet (06.10.2026)
- [x] Google Familienkalender verknüpft (geheime Adresse funktioniert)
- [x] Google-Termine kommen an und werden per Name richtig zugeordnet (geprüft 08.10.2026)
- [x] App-Symbole (PNG) für iPhone/iPad und Android
- [ ] App auf den Geräten der Familie installieren
