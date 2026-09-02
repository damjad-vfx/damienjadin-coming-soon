# Damien Jadin — V27

Changes from V25:
- Homepage Visual Effects circle now uses the new supplied `Visual Effects(1).png` artwork.
- About robot arm uses the supplied Beauty image by default.
- On desktop devices with a real mouse/hover pointer, hovering the robot arm crossfades to the supplied Mail image; leaving returns to Beauty.
- Touch/coarse-pointer devices keep the Beauty arm only; no hover swap is applied.
- Desktop hero video remains animated via `assets/video/hero.mp4`.


V27: ajout de 4 projets Motion Design (H&O, BEE Casting, Eddy, Concept.us).


V28: responsive smartphone/tablet pass. V27 desktop CSS preserved; mobile hero video re-enabled.


## V29 mobile note
On some Android browsers, opening `index.html` directly from Downloads uses the `file://` protocol. Tapping another local HTML page can then trigger Android's “Open with” dialog. This is a limitation of local-file preview, not of the website navigation. Once the folder is served by GitHub Pages / a web server over HTTPS, internal links behave as normal website links.


## V30
Corrections smartphone reprises de V29 + correction géométrique du logo abeille sans transform/scale sur écrans <= 600 px. Le rendu desktop reste celui de V27/V29.
