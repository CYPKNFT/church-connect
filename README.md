# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3ede9c4c-4a63-4ab6-a89a-e19abe3065b4

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3ede9c4c-4a63-4ab6-a89a-e19abe3065b4) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Feature-based page structure

Application routes are implemented as React pages under `src/pages`, organized by feature/domain rather than all living in a single flat folder:

- `src/pages/auth` – login, registration, password reset, email verification, pending approval, staff verification
- `src/pages/ministries` – ministries dashboard and detail pages (including specific ministry types and service detail)
- `src/pages/community` – community discovery, moderation, watchlist and wishlist views
- `src/pages/events` – church event hub, event list, and event detail pages
- `src/pages/needs` – posting, browsing, and viewing needs, church-wide needs, and marketplace item details
- `src/pages/dashboard` – member and admin dashboards, browse dashboard, and system settings
- `src/pages/giving` – giving, volunteering, volunteering detail, and charities
- `src/pages/account` – profile, settings, and my church
- `src/pages/info` – marketing, help, guides, and informational pages (landing, about, contact, how it works, quickstart guides, etc.)
- `src/pages/insights` – analytics, activity, and feedback-related pages
- `src/pages/legal` – privacy policy, terms, community guidelines, and safety information
- `src/pages/system` – not-found page, template article page, and internal template utilities

When adding a new page, place it into the feature folder that best matches its main purpose (for example, a new volunteer FAQ should go under `src/pages/info`, while a new admin reporting screen should live under `src/pages/dashboard`). Route paths are defined in `src/App.tsx` and should continue to use the existing URL patterns unless you intentionally change them.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3ede9c4c-4a63-4ab6-a89a-e19abe3065b4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
