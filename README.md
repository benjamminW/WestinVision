# Westin Vision

A responsive, cinematic portfolio site for a video-production business. It is built with plain HTML, CSS, and JavaScript, so there is no build step and no package installation. YouTube projects are managed from one catalog file and open in an accessible, responsive player.

## Customize before publishing

Search the files for `Westin Vision` and replace the email address, location, statistics, and social links with your real business details.

## Add or edit YouTube projects

Open `projects.js`. Each object inside `window.WESTIN_PROJECTS` creates one portfolio card. Each item's `videos` array creates the film choices shown in that project's player.

To add a project:

1. Copy the commented project template at the bottom of `projects.js`.
2. Paste it above the template comment, after the existing project.
3. Separate project objects with a comma.
4. Give the project a unique lowercase `id` using hyphens instead of spaces.
5. Replace the title, category, description, and YouTube IDs.
6. Use the first video's ID in the thumbnail URL, or replace the URL with a custom image saved in `assets/`.

For a standard YouTube link such as `https://www.youtube.com/watch?v=ABC123`, the ID is `ABC123`. For `https://youtu.be/ABC123`, the ID is also `ABC123`.

Keep every video public or unlisted and make sure embedding is allowed in YouTube Studio.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload or push this project to the `main` branch.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source.
5. The included workflow publishes the site automatically. Future pushes to `main` will redeploy it.

To preview locally, open `index.html` in a browser or serve the folder with any basic local web server.

## Image credits

Portfolio photography is from Unsplash. Replace it with your own production stills and project frames before launch for the strongest result.
