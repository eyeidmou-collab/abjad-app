# Calculateur Abjad — PWA

## Structure des fichiers

```
abjad-pwa/
├── index.html      ← page principale (modifiée pour PWA)
├── style.css       ← styles (inchangé)
├── app.js          ← logique (inchangé)
├── manifest.json   ← ✨ NOUVEAU : description de l'app installable
├── sw.js           ← ✨ NOUVEAU : Service Worker (cache offline)
└── icons/          ← ✨ NOUVEAU : icônes pour tous les appareils
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

## Comment héberger et installer

### Option 1 — GitHub Pages (gratuit, recommandé)
1. Créez un repo GitHub (ex: `abjad-app`)
2. Uploadez tous les fichiers
3. Allez dans Settings → Pages → Source: main branch
4. Votre app sera sur `https://votrenom.github.io/abjad-app`
5. Sur mobile, ouvrez l'URL → "Ajouter à l'écran d'accueil"

### Option 2 — Netlify (drag & drop, gratuit)
1. Allez sur netlify.com
2. Glissez le dossier entier dans "Drag & drop"
3. URL générée automatiquement
4. Installez depuis le navigateur

### Option 3 — Serveur local (test)
```bash
npx serve .
# ou
python3 -m http.server 8080
```
⚠️ Le Service Worker nécessite HTTPS ou localhost.

## Installation sur chaque plateforme

### Android (Chrome)
→ Bannière "Installer" apparaît automatiquement après quelques secondes

### iPhone / iPad (Safari)
→ Bouton Partager → "Sur l'écran d'accueil"

### Windows / Mac (Chrome, Edge)
→ Icône ⊕ dans la barre d'adresse → "Installer"

## Fonctionnalités PWA ajoutées
- ✅ Installable sur écran d'accueil (Android, iOS, Desktop)
- ✅ Fonctionne hors-ligne (cache Service Worker)
- ✅ Plein écran sans barre navigateur
- ✅ Icône personnalisée sur l'écran d'accueil
- ✅ Raccourcis rapides (Mashriqi / Maghribi)
- ✅ Indicateur de connexion offline
- ✅ Mise à jour automatique en arrière-plan
