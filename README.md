# The API Project Frontend, Vue 3 (Vite), Pinia, shadcn-vue, Tailwind CSS

TheAPIProject is a versatile and affordable API platform designed to provide developers with easy access to a diverse range of services. Initially conceived as a "Random Quote Generator API" the project is expanding its vision to encompass a rich collection of data services. Upcoming releases include GIFs, Dummy or Mock APIs for testing, Jokes, and more. With a focus on affordability and simplicity, TheAPIProject stands as the go-to solution for developers seeking dynamic content.

## Backend Repository

For the corresponding backend, visit the [The API Project](https://github.com/HamidByte/The-API-Project).

## API Documentation on Postman

Explore the API documentation [API Documentation](https://documenter.getpostman.com/view/11546737/2sA2r55Rev) and [Postman Workspace](https://www.postman.com/hamidbyte/workspace/the-api-project/overview).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (https://nodejs.org/)
- Git (optional, but recommended)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Environment Variable Configuration

Create two files: `.env.development` and `.env.production.` and populate these files with the following variables, replacing the placeholder values with your actual values.

**.env.development:**

```bash
APP_BASE_URL_SERVER=http://127.0.0.1:3000
```

**.env.production:**

```bash
APP_BASE_URL_SERVER=your-base-url
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

and

```sh
npm run preview
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format

```sh
npm run format
```

## Acknowledgments

We express our gratitude to the open-source community for their invaluable contributions, which have played a pivotal role in enhancing our project by providing essential tools and libraries.
