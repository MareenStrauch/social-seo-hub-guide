# Plan: Videos besser bei Google indexieren

## Warum es aktuell nicht klappt

1. **Keine eigenen Video-Seiten.** Google indexiert Videos nur von einer "Watch-Page": eine Seite, auf der genau **ein** Video der Hauptinhalt ist. Aktuell liegen auf `/videos/` drei Videos nebeneinander - Google wertet das als "Video ist nicht auf einer Watch-Page" und indexiert keines davon.
2. **Kein Video-Datensatz im Quelltext.** Die fertigen HTML-Seiten enthalten die Video-Angaben (Titel, Beschreibung, Vorschaubild, Upload-Datum, Dauer) nicht in maschinenlesbarer Form. Ohne diese Angaben kann Google das Video nicht in die Videosuche aufnehmen.
3. **Die Videos fehlen in der Sitemap.** Es gibt keine Einträge, die Google auf die Videos hinweisen.
4. **Veraltete Platzhalter.** Die Videoübersicht im Vorschaumodus zeigt noch sechs erfundene Videos mit ungültigen IDs. Solche toten Links schaden dem Vertrauen in die Domain.

## Was ich baue

### 1. Eine eigene Seite pro Video
Für jedes echte Video entsteht eine Unterseite, z. B.:

```text
/videos/youtube-titel-40-zeichen/
/videos/tiktok-seo-3-schritte/
/videos/roi-promptformel/
```

Jede Seite enthält: das Video groß oben, Titel als Überschrift, eine Beschreibung in Textform, das Transkript bzw. die Kernaussagen als Text, und einen Link zum passenden ausführlichen Guide. So hat Google echten Inhalt zum Bewerten, nicht nur ein eingebettetes Fenster.

### 2. Vollständige Video-Angaben im Quelltext
Auf jeder Video-Seite und auf jeder Guide-Seite mit Video werden alle von Google geforderten Felder hinterlegt: Titel, Beschreibung, Vorschaubild, Upload-Datum im vollen Zeitformat, Laufzeit, Einbettungs-Adresse. Genau diese Felder hat die Search Console bisher vermisst.

### 3. Videoübersicht wird zur Verteilerseite
`/videos/` zeigt künftig Vorschaubilder mit Titel, die auf die jeweilige Einzelseite verlinken - kein Sammel-Embed mehr. Die erfundenen Platzhalter fliegen raus, es bleiben nur die echten Videos.

### 4. Sitemap erweitern
Alle Video-Seiten kommen in die Sitemap, zusätzlich mit den Video-spezifischen Angaben (Titel, Beschreibung, Vorschaubild, Laufzeit), damit Google sie direkt findet.

### 5. Interne Verlinkung
Jeder Guide verlinkt auf seine Video-Seite und umgekehrt. Das beschleunigt das Auffinden deutlich.

## Danach: dein Teil

1. Neue Version veröffentlichen.
2. Sitemap in der Search Console erneut einreichen.
3. Je eine Video-Seite über die URL-Prüfung anfordern (Indexierung beantragen).
4. Nach ca. 1-2 Wochen im Bericht "Videos" prüfen, ob die Seiten als indexiert geführt werden.

Realistisch dauert es 1-3 Wochen, bis Google Videos aufnimmt - technisch korrekt sind sie ab Veröffentlichung.

## Was ich von dir brauche

Für jedes Video: eine kurze Beschreibung (2-3 Sätze), die Laufzeit und das Veröffentlichungsdatum. Falls du das nicht parat hast, ziehe ich Titel und Vorschaubild automatisch von YouTube und setze eine sinnvolle Beschreibung aus dem zugehörigen Guide - die kannst du danach überschreiben.

## Technische Details

- `build-static.mjs`: neue Funktion `buildVideoWatchPage(video)`, Rendering-Loop über eine neue Datenquelle `src/data/videos.json` (ID, Slug, Titel, Beschreibung, Dauer ISO 8601, `uploadDate` mit Zeitzone, Transkript-Abschnitte, zugehöriger Guide-Slug).
- JSON-LD `VideoObject` pro Watch-Page inkl. `name`, `description`, `thumbnailUrl`, `uploadDate`, `duration`, `embedUrl`, `contentUrl`, plus `BreadcrumbList`.
- `public/sitemap.xml` um `video:video`-Namespace und Einträge erweitern.
- `src/components/ui/video-masonry.tsx`: Mock-Array durch Import aus `videos.json` ersetzen, Links auf `/videos/<slug>/`.
- Neue React-Route `/videos/:slug` in `App.tsx` für die Vorschau-Parität.
