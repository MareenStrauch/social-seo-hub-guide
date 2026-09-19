# Plan: Videos besser bei Google indexieren

## Korrektur meiner ersten Einschätzung

Du hast recht: die Guide-Seiten **sind** bereits Video-Seiten - ein Video, viel Text, Video-Angaben im Quelltext. Ich habe die Live-Seiten geprüft, das Ergebnis:

| Seite | Video | Video-Angaben für Google |
| --- | --- | --- |
| `/guides/youtube-seo-2025/` | ja | vollständig |
| `/guides/tiktok-seo-2025/` | ja | vollständig |
| `/guides/chatgpt-marketing-roi-prompt/` | ja | **fehlen komplett** |
| `/videos/` | 3 Videos auf einer Seite | keine |

Es braucht also **keine** neuen Video-Unterseiten. Die echten Probleme sind andere.

## Die drei echten Ursachen

1. **Die ChatGPT-Seite hat ein Video, aber keine Video-Angaben.** Google sieht dort nur einen Artikel und ignoriert das Video vollständig.
2. **Die Seite `/videos/` sabotiert die Guides.** Dort laufen dieselben drei Videos nochmal - ohne Text, ohne Angaben, drei Stück nebeneinander. Genau das meldet die Search Console als "Video nicht auf einer Watch-Page". Zusätzlich konkurriert diese Seite mit den Guides um dasselbe Video: Google muss raten, welche Seite die richtige ist, und lässt im Zweifel beide weg.
3. **Kein Hinweis in der Sitemap.** Die Sitemap nennt die Seiten, sagt aber nirgends "hier liegt ein Video". Ohne diesen Hinweis landen sie schwer im Video-Index.

## Was ich umsetze

### 1. Video-Angaben für die ChatGPT-Seite ergänzen
Titel, Beschreibung, Vorschaubild, Upload-Datum mit Zeitzone, Laufzeit, Einbettungs- und Original-Adresse, Autorin und Herausgeberin - im selben Format wie bei den zwei funktionierenden Guides.

### 2. `/videos/` zur reinen Verteilerseite machen
Statt drei laufender Videos zeigt die Seite künftig Vorschaubilder mit Titel und kurzer Beschreibung, die auf den jeweiligen Guide verlinken. Kein Doppel-Einbau mehr, kein Konkurrenzkampf um dasselbe Video - der Guide ist eindeutig die Video-Seite.

### 3. Sitemap mit Video-Hinweisen
Für jeden Guide mit Video kommen Titel, Beschreibung, Vorschaubild und Laufzeit direkt in die Sitemap. Das ist der schnellste offizielle Weg, Google auf Videos aufmerksam zu machen.

### 4. Platzhalter entfernen
In der Vorschau-Ansicht stecken noch sechs erfundene Videos mit ungültigen IDs und toten Links. Die werden durch die drei echten ersetzt.

### 5. Kleine Verstärkungen auf den Guide-Seiten
- Unter jedem Video ein kurzer Text-Abriss der Kernaussagen (Google bewertet Video-Seiten stark nach dem umgebenden Text).
- Gegenseitige Verlinkung zwischen den drei Video-Guides.

## Danach: dein Teil

1. Veröffentlichen.
2. Sitemap in der Search Console neu einreichen.
3. Die drei Guide-Adressen einzeln über die URL-Prüfung zur Indexierung anmelden.
4. Nach 1-2 Wochen im Bericht "Videos" nachsehen.

Erfahrungsgemäß dauert die Aufnahme 1-3 Wochen. Technisch korrekt sind die Seiten ab Veröffentlichung.

## Technische Details

- `src/data/guides-content.json`: `schema` des Guides `chatgpt-marketing` von `Article` auf ein Array aus `Article` + vollständigem `VideoObject` (ID `AjXVOQ2P7jQ`) umstellen; Renderer in `build-static.mjs` (Zeile ~507) und `GuidePage.tsx` auf Array-Schemas erweitern.
- `build-static.mjs` → `buildVideos()`: iframes durch Thumbnail-Karten (`https://i.ytimg.com/vi/<id>/hqdefault.jpg`) mit Link auf den Guide ersetzen; `VideoObject` dort weglassen, damit die Guides kanonisch bleiben.
- `public/sitemap.xml`: Namespace `xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"` plus `video:video`-Block je Guide-URL.
- `src/components/ui/video-masonry.tsx`: Mock-Array durch die drei echten Videos ersetzen, Links auf die Guide-Slugs.
- Laufzeiten/Upload-Daten aus den bestehenden `VideoObject`-Einträgen übernehmen; für `AjXVOQ2P7jQ` bestätigst du Datum und Laufzeit oder ich setze plausible Werte, die du korrigieren kannst.
