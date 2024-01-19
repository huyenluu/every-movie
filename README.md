# Every Movie

Every Movie is a lobby type application that showcases movies from the [TMDB API](https://www.themoviedb.org/documentation/api). It allows users to browse movies, add them to their favorites, search for specific movies, filter movies by multiple genres, and more. The application also features an infinite scroll for an enhanced user experience.

## Demo

Check out the live demo of the application [HERE](https://every-movie.vercel.app/).

## Installation

To install and run the project, follow these steps:

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Create a `.env` file in the root directory of the project
4. Inside the `.env` file, add your TMDB API key like this: `VITE_API_KEY=your_api_key_here`
5. Start the project by running `npm run dev`

## Usage

After setting up the project, you can:

- Browse movies on the homepage
- Add movies to your favorites by clicking on the heart icon
- Search for specific movies using the search bar
- Filter movies by multiple genres using the genre filter
- Scroll down on the homepage to load more movies

The list of your favorite movies is saved on the client side using local storage.

## Scripts

The following scripts are available:

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run lint`: Lints the codebase
- `npm run preview`: Serves the production build for preview

## Dependencies

The project uses the following dependencies:

- `lodash.debounce`: For debouncing functions
- `react` and `react-dom`: For building the user interface
- `react-icons`: For displaying icons
- `react-router-dom`: For routing
- `react-select`: For the genre filter select input
- `vite-plugin-eslint`: For linting with ESLint in Vite

## Contributing

Contributions are welcome! Please feel free to submit a pull request.
