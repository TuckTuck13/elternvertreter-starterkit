# Elternvertreter-Starterkit

Eine kleine Website für frisch gewählte Elternvertreterinnen und Elternvertreter in Kita und Schule. Checklisten, Vorlagen, ein Ablauf für den Elternabend, Hinweise zu Kommunikation und Datenschutz, die Rechtsgrundlagen aller 16 Bundesländer und kurze Antworten auf häufige Fragen. Alles auf Deutsch, in Du-Form, ohne Behördendeutsch.

Statische Seiten ohne Build-Werkzeuge, ohne Framework und ohne externe Ressourcen. HTML, eine CSS-Datei, eine kleine JavaScript-Datei. Läuft auf GitHub Pages oder jedem anderen Webspace.

## Was drin ist

| Seite | Inhalt |
|---|---|
| `index.html` | Einstieg mit drei Wegen: neu gewählt, Elternabend planen, Vorlage suchen |
| `erstes-jahr.html` | Abhakbare Checkliste für das erste Jahr, Stand bleibt im Browser |
| `elternabend.html` | Ablauf in fünf Schritten, Tagesordnung, schwierige Situationen |
| `vorlagen.html` | Acht Textvorlagen, kopierbar oder als .txt und .md speicherbar |
| `kommunikation.html` | Kontaktliste, Messenger-Gruppen, Fotos, Datenschutz, freie Werkzeuge |
| `recht.html` | Schulgesetz, Kita-Gesetz und Landeselternvertretung je Bundesland |
| `faq.html` | 15 häufige Fragen mit kurzen Antworten |

## Für wen

Für Eltern, die gerade gewählt wurden und wissen wollen, was auf sie zukommt. Keine IT-Kenntnisse nötig, kein Konto, keine App. Die Seite speichert nur auf dem eigenen Gerät (Checklisten-Stand und gewähltes Bundesland im localStorage), nichts wird übertragen.

## Lokal ansehen

Repository herunterladen und `index.html` im Browser öffnen. Für die Download-Knöpfe und saubere Pfade besser über einen kleinen lokalen Server, zum Beispiel:

```
python3 -m http.server 8000
```

Dann `http://localhost:8000` aufrufen.

## Veröffentlichen

Der Workflow in `.github/workflows/pages.yml` veröffentlicht den Inhalt bei jedem Push auf `main` über GitHub Pages. Dafür in den Repository-Einstellungen unter „Pages“ als Quelle „GitHub Actions“ wählen.

## Mitmachen

Korrekturen sind ausdrücklich willkommen, besonders zu den Bundesländern: Paragrafen ändern sich, Portale ziehen um, Gremien werden umbenannt. Wenn du in deinem Land eine Abweichung findest, öffne bitte ein Issue oder einen Pull Request mit Link zur amtlichen Quelle. Einträge, die bei der Recherche nicht sicher bestätigt werden konnten, sind auf der Seite mit „nicht geprüft“ markiert.

Bitte keine Abhängigkeiten, keine Build-Schritte, keine externen Skripte oder Schriften. Details in [CONTRIBUTING.md](CONTRIBUTING.md).

## Lizenz

Der Quelltext der Website steht unter der [PolyForm Noncommercial License 1.0.0](LICENSE), siehe auch [NOTICE](NOTICE) und [COMMERCIAL-LICENSE.md](COMMERCIAL-LICENSE.md) für die zusätzliche Erlaubnis für Vereine, Elternvertretungen, Schulen und Kitas sowie für kommerzielle Anfragen.

Die Inhaltstexte, also Vorlagen, Checklisten und Erklärtexte, sind davon ausgenommen und stehen unter [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/deed.de). Eltern dürfen sie ohne Nachdenken kopieren, verändern und weitergeben.

Keine Rechtsberatung. Maßgeblich sind immer die amtlichen Gesetzestexte.
