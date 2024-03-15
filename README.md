# # Northcoders News
Northcoders News is a social news aggregation, web content rating, and discussion website inspired by real-world social platforms. It's designed as a C.R.U.D (Create, Read, Update, Delete) application from a front-end perspective, using React. 

## Deployed Application
Visit the deployed version of Northcoders News at https://ncnewsplatform.netlify.app/ to see it in action.

### Features
- Articles divided into topics for easy navigation.
- User-curated ratings for articles through upvotes and downvotes.
- Commenting functionality for user discussions on articles.
- Responsive design for an optimal viewing experience across various devices.

### Technologies
- React for building the user interface.
- Axios for promise-based HTTP requests.
- React Router for client-side routing.
- Sass for advanced styling.
- Vite as the front-end build tool.
- ESLint for code analysis and linting.

## Related Projects

### Back-End Repository

This front-end application is designed to work with a specific back-end server, which provides the API endpoints used to fetch and manipulate data. You can find the source code for the back-end server at the following repository:

- https://github.com/elenatrr/nc-news

## Getting Started

### Prerequisites

- Node.js ^v20.7.0
- npm ^10.1.0

### Installation

Clone the repository:
```
git clone https://github.com/elenatrr/fe-nc-news.git 
```
Navigate to the project directory:
```
cd fe-nc-news
```
Install the dependencies:
```
npm install
```

## Running the Development Server

To start the development server, run:
```
npm run dev
```

## Building for Production

To create a production build, use:
```
npm run build
```

### Redeployment

To redeploy the application after making changes:

1. Create an updated build version of the code:
```
npm run build
```
2. Deploy to a draft URL to preview changes:
```
netlify deploy
```
3. Deploy to the production URL to go live:
```
netlify deploy --prod
```

## Linting

To lint the project and automatically fix issues, run:
```
npm run lint
```

## Contributing
Contributions are welcome! Please feel free to submit a pull request or create an issue for any bugs or feature suggestions.
