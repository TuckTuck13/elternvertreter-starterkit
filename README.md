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

Elternvertreter-Starterkit ist lizenzpflichtig. Der Quellcode ist zur Ansicht öffentlich, damit du Aufbau, Datenschutz und Sicherheit prüfen kannst. Installieren, betreiben, ändern oder weitergeben ist nur mit einer Lizenz erlaubt, siehe [LICENSE](LICENSE). Für den Einsatz fragst du eine Lizenz an: [LIZENZ-ERWERBEN.md](LIZENZ-ERWERBEN.md).

Die Vorlagen und Checklisten der Website dürfen Elternvertretungen für ihre eigene Elternarbeit ausdrucken, ausfüllen und an die eigene Elternschaft weitergeben. Inhalte, die vor der Lizenzänderung unter CC0 veröffentlicht wurden, bleiben in dieser Fassung gemeinfrei.

Beiträge: [CONTRIBUTING.md](CONTRIBUTING.md).

Keine Rechtsberatung. Maßgeblich sind immer die amtlichen Gesetzestexte.
