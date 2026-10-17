# 🌍 Travel Explorer

**Discover countries, explore cities, and find interesting places around the world.**

[**🚀 Live Demo**](https://shakh9.github.io/travel-explorer/) · [GitHub Repository](https://github.com/Shakh9/travel-explorer)

Travel Explorer is a web application for discovering destinations around the world. It brings together country information, city data, and attractions through external APIs in one place.

## ✨ Features

- 🌐 **Countries** — browse countries and explore their information.
- 🏙️ **Cities** — discover cities around the world.
- 📍 **Attractions** — explore interesting places and read about them.
- 🔎 **Detailed pages** — navigate from catalogs to individual country, city, and attraction pages.
- 🧭 **Client-side routing** — navigate between pages without full-page reloads.
- ⚡ **Asynchronous data fetching** — load external data with TanStack Query.
- 🚀 **Live deployment** — automatically build and publish the application using GitHub Actions.

## 🛠️ Tech Stack

| Technology         | Purpose                                  |
| ------------------ | ---------------------------------------- |
| React              | UI development                           |
| TypeScript         | Static typing                            |
| Vite               | Development server and production builds |
| React Router       | Client-side routing                      |
| TanStack Query     | Server state and asynchronous data       |
| REST Countries API | Country data                             |
| GeoNames           | Geographic and city data                 |
| Wikipedia API      | Attraction information                   |
| GitHub Pages       | Hosting                                  |
| GitHub Actions     | CI/CD and automated deployment           |
| Yarn               | Package management                       |

## 🔗 Live Application

**[Open Travel Explorer](https://shakh9.github.io/travel-explorer/)**

The application is hosted on GitHub Pages. New changes pushed to the configured branch are published automatically through GitHub Actions.

## 💻 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shakh9/travel-explorer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd travel-explorer
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Create a `.env.local` file in the project root and configure the required environment variables:

   ```env
   VITE_REST_COUNTRIES_API_KEY=your_rest_countries_api_key
   VITE_GEONAMES_USERNAME=your_geonames_username
   ```

   Replace the example values with your own credentials. Do not commit your actual environment file.

5. Start the development server:

   ```bash
   yarn dev
   ```

6. Open the local URL printed in your terminal.

## 🧪 Available Scripts

| Command        | Description                                    |
| -------------- | ---------------------------------------------- |
| `yarn dev`     | Start the development server                   |
| `yarn lint`    | Run ESLint                                     |
| `yarn build`   | Check TypeScript and create a production build |
| `yarn preview` | Preview the production build locally           |

## 🌐 Deployment

Travel Explorer is deployed to GitHub Pages using GitHub Actions.

The Vite configuration uses the repository base path, and React Router is configured to support the deployed application.

To deploy a new version:

1. Commit and push your changes to the configured branch.
2. Open the **Actions** tab in the GitHub repository.
3. Wait for the deployment workflow to complete successfully.
4. Visit the [live application](https://shakh9.github.io/travel-explorer/).

The API-related environment variables must also be configured for the production build where required.

> **Note:** Vite variables prefixed with `VITE_` are included in the client-side bundle and are not secret at runtime. Restrict API keys by origin where supported, and never put private credentials in frontend code.

## 👨‍💻 Author

**Ravin Shakhmuradov**

- [GitHub](https://github.com/Shakh9)
- [Travel Explorer — Live Demo](https://shakh9.github.io/travel-explorer/)
- [Travel Explorer — Source Code](https://github.com/Shakh9/travel-explorer)
