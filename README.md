# complenet.github.io

Official website for **CompleNet 2027** — the 18th International Conference on Complex Networks,
hosted at the University of Rochester, Rochester, NY, USA (March 9–12, 2027).

Published via GitHub Pages at **https://complenet.github.io/**.

## Structure

Static HTML/CSS site — no build step, no framework.

| File | Page |
|------|------|
| `index.html` | Home (hero, about, host/supporting institutions) |
| `speakers.html` | Keynote Speakers |
| `committee.html` | Organizing, Steering & Program Committees |
| `program.html` | Program & Program at a Glance |
| `cfp.html` | Call for Contributions |
| `venue.html` | Venue (Wegmans Hall) |
| `past-editions.html` | Past Editions (2009–2026) |
| `registration.html` | Registration |
| `style.css` | **Single shared stylesheet for all pages** |
| `Logos/`, `Images/` | Image assets |

## Editing

- All styling lives in **`style.css`** — there are no per-page `<style>` blocks. Add new rules there.
- The navbar, footer, and mobile-menu script are duplicated in each page; when changing one, apply the
  same change to every page for consistency.
- Colors use CSS variables (`--blue` UR navy `#001E5F`, `--gold` UR gold `#FFD100`) defined at the top of `style.css`.

## Contributing — before you edit

**Multiple people commit to this repo (sometimes directly on GitHub), so always sync before editing:**

```
git fetch origin        # see if anything is new
git pull --no-rebase    # merge in remote changes before you start
```

Then make your changes, and when done:

```
git add -A
git commit -m "your message"
git push
```

If you forget to pull first and your push is rejected, run `git pull --no-rebase` to merge, resolve any
conflicts, then push again.

## Deployment

Pushing to the `main` branch publishes the site automatically via GitHub Pages (root of `main`).
All asset paths are relative, so the site works from the domain root.
