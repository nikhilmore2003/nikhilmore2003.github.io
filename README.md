# Nikhil More — Data Analyst Portfolio

Personal portfolio website built with plain HTML, CSS and JavaScript.

Live site: https://nikhilmore2003.github.io

## Files

```
index.html                    ← page content
style.css                     ← design and dark/light colours
script.js                     ← theme button, animations, Learning Log entries
assets/profile.jpg            ← profile photo
assets/Nikhil_More_Resume.pdf ← downloadable resume
```

## How to make it live on GitHub Pages

1. Sign in to GitHub and click **New repository**.
2. Name it exactly **nikhilmore2003.github.io**, set it to **Public**, and click **Create repository**.
3. On the new repo page, click **uploading an existing file**.
4. Drag in `index.html`, `style.css`, `script.js`, `README.md` and the whole `assets` folder. Click **Commit changes**.
5. Go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**, then **Save**.
6. Wait 1–2 minutes and open **https://nikhilmore2003.github.io**.

## How to update

- **Add something you learned:** open `script.js`, copy one `{ ... }` block at the top of `LEARNING_LOG`, paste it above the others and edit the text.
- **Add a project link:** in `index.html`, find the project and replace the `Code coming soon` line with a `View on GitHub` link (copy one from another project).
- **Project screenshots:** take a screenshot of your dashboard or output, save it with the name below, and upload it to an `assets/projects/` folder. The drawing is replaced automatically.
  - Blinkit → `assets/projects/blinkit.png`
  - Netflix → `assets/projects/netflix.png`
  - Psychologist Assistant → `assets/projects/psychologist.png`
  - Stock Predictor → `assets/projects/stock.png`
  (Names must match exactly, lowercase, `.png`. A wide image, about 1280×680, looks best.)
- **Link a certificate:** in `index.html`, search for `CERTIFICATE LINKS` and replace the `href="..."` on that certificate's card.
- **Replace the resume or photo:** upload a new file with the same name into `assets/`.
- **Change the main colour:** edit `--accent` in `style.css` (one value for dark, one for light).

After editing a file on GitHub, click **Commit changes**; the live site updates in a minute or two.
