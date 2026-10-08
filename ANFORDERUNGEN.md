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

## Version 4 (08.10.2026) – Wetter
- **Wetter-Widget** auf „Heute“: aktuelle Temperatur, Wetterlage, Uhrzeit, Höchst/Tiefst, Regenrisiko, gefühlte Temperatur, Wind und die nächsten 6 Stunden; bei „Morgen“ die Vorhersage für morgen (6–21 Uhr)
- **Pop-up** beim Antippen: 7 Tage auswählbar, je Tag Kennzahlen (Höchst/Tiefst, Regenrisiko/-menge, Wind, Sonnenauf-/untergang, UV) und stündliche Vorhersage
- Wohnort legt der **Admin** unter Verwaltung fest (Suche nach Ort/PLZ). Daten von Open-Meteo (kostenlos, ohne Konto), Aktualisierung alle 10–30 Min.

## Version 5 (09.10.2026) – Prüfungen
- Neue Termin-Art **📝 Prüfung** (Schulaufgabe, Kurzarbeit, Test/Ex, Referat, Abgabe) mit Fach (Vorschläge aus dem Stundenplan), Datum, optional Uhrzeit, **Stoff/Thema**
- **Countdown** in der Karte des Kindes auf der Startseite für Prüfungen der nächsten **14 Tage** („noch 5 Tage“, ab 7 Tagen orange, ab 2 Tagen rot, „Morgen!“, „Heute!“)
- **Lern-Erinnerung**: ab 3/5/7/10/14 Tagen vorher täglich „Für <Fach> lernen“ in den Aufgaben des Kindes; Kinder haken selbst ab
- Im Kalender rötlich hervorgehoben; Übersicht unter **Schule & Sport → Prüfungen** (kommende + vergangene je Kind)
- Anlegen über: Schule & Sport → Prüfungen, „+“ auf der Startseite, oder im Terminformular Art „Prüfung“ wählen

## Version 6 (09.10.2026) – Sterne & Belohnungen (Gamification, Version 1)
Geplant per /grill-me, Entscheidungen:
- Alle vier sammeln Sterne; **einlösen** können nur die Kinder. **Keine Rangliste**: Kinder sehen nur ihren eigenen Stand, Eltern alle, das Familienziel sehen alle. Start bei 0.
- Sterne nur für **erledigte Aufgaben, Ämtli und Lern-Erinnerungen** (nicht fürs Anlegen). **Vertrauensmodus**: sofort beim Abhaken, Häkchen weg → Sterne weg; Eltern sehen einen **Verlauf** und können einzelne Vergaben zurücknehmen.
- Sterne gehen an die **zugewiesene Person**; „Alle“-Aufgaben darf jeder abhaken, Sterne an den, der abhakt. Vorschläge (noch nicht bestätigt) bringen keine Sterne. Sterne **pro Erledigung**.
- **Themen** mit Standard-Sternen (Admin verwaltet unter Verwaltung): 🏠 Haushalt 2, 🧸 Zimmer 2, 📚 Schule 2 (auch Lern-Erinnerungen), 🌳 Garten 3, 🐾 Tiere 2, 🤝 Mithelfen 1. Pro Aufgabe überschreibbar (beide Eltern); bestehende Aufgaben = Haushalt.
- **Belohnungen**: Eltern legen an (mit Preis), Kinder schlagen Wünsche vor (Eltern setzen beim Bestätigen den Preis). **Einlösen**: Sterne werden reserviert → Freigabe → bei Bestätigung abgezogen, bei Ablehnung zurück. Einlösen nur mit genug Sternen; Stand darf durch Zurücknehmen ins Minus (rot).
- Beispiel-Belohnungen: Extra-Tablet 15, Eis 20, später ins Bett 20, Lieblingsessen 30, Übernachtung 60, Kino 120. Keine Geld-Umrechnung.
- **Familienziel**: ein aktives Ziel (Start: „Familienausflug“, 500 ⭐), zählt alle verdienten Sterne seit Zielstart; Ausgeben verringert es nicht; Feier beim Erreichen, dann neues Ziel.
- Anzeige: ⭐ im Kopf der Personenkarte, Familienziel-Karte unter den Personen, neuer Bereich **⭐ Belohnungen** (Seitenleiste / „Mehr“).
- Später separat planen: Wissens-Quiz, Serien & Abzeichen.

## Version 6.1 (09.10.2026)
- Personenkarten auf Tablets (ab 560 px) immer zwei pro Zeile
- **Aufgaben & Pinnwand** zu einem Bereich zusammengefasst (zwei Reiter ✅ Aufgaben / 📌 Pinnwand); „+“ legt je nach Reiter Aufgabe oder Pinnwand-Eintrag an; auf dem Handy über „Aufgaben“ in der unteren Leiste erreichbar

## Version 7 (09.10.2026) – Migräne & Luftdruck (Teil 1: Warnungen)
- **Verwaltung → 🤕 Migräne & Luftdruck** (nur Admin): Personen auswählen, die die Funktion brauchen; Warnschwelle (3/4/5/6/8/10 hPa in 24 Std., Standard 5) und Richtung (fallend und steigend / nur fallend)
- **Warnung „läuft“** (rot): eine Änderung über der Schwelle ist gerade im Gange (24-Std.-Fenster, das jetzt bzw. in den nächsten 12 Std. endet)
- **Warnung „erwartet“** (gelb): eine Änderung über der Schwelle beginnt innerhalb der nächsten 48 Std. – mit Startzeit und Stärke
- Anzeige oben in der Personenkarte der ausgewählten Personen; Antippen öffnet das Wetter-Pop-up beim neuen Abschnitt **🌀 Luftdruck** (aktueller Wert, Änderung seit gestern, Warnungen, Grafik letzte 24 Std. + nächste 48 Std. mit markierten Zeitfenstern)
- Daten: Open-Meteo (`pressure_msl`, stündlich, inkl. letzter 24 Std.)
- Teil 2 (offen): Migräne-Tagebuch mit Schnell-Erfassung, Kalender, Auswertung, Export

## Stand
- [x] Version 1 gebaut (`index.html`), Testmodus funktioniert
- [x] Supabase eingerichtet (Projekt drwuqnwepaaqlafsktfa, Frankfurt), Familienkonto angelegt, Registrierung gesperrt, Live-Sync getestet
- [x] Online unter https://stefans-17.github.io/familienplaner/
- [x] Edge Function `google-kalender` in Supabase angelegt und getestet (06.10.2026)
- [x] Google Familienkalender verknüpft (geheime Adresse funktioniert)
- [x] Google-Termine kommen an und werden per Name richtig zugeordnet (geprüft 08.10.2026)
- [x] App-Symbole (PNG) für iPhone/iPad und Android
- [ ] App auf den Geräten der Familie installieren
