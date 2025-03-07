MEMEDOD

MEMEDOG is an interactive web application built with React that allows users to explore, like, comment on, and download memes. The app fetches memes dynamically from external APIs and provides various functionalities such as filtering, sorting, and pagination.

Features

Meme Exploration

Users can browse trending, new, classic, and random memes.

Memes are dynamically fetched from APIs and displayed in a grid layout.

Search & Filtering

Users can search for memes using a search bar.

Memes can be filtered based on categories like Trending, New, Classic, and Random.

Sorting options allow users to sort memes by likes or date.

Like & Comment System

Users can like memes by clicking the ❤️ button, and the like count updates in real-time.

Users can add comments to memes, which are stored locally and displayed under the respective meme.

Download Memes

Users can download memes by clicking the ⬇️ button.

The app generates a download link for the meme image, allowing users to save it locally.

Infinite Scrolling & Pagination

The app fetches memes in batches to improve performance.

A 'Load More' button allows users to fetch and display additional memes without refreshing the page.

Animations & UI Enhancements

Uses AOS (Animate On Scroll) for smooth animations when memes appear on the screen.

A responsive design ensures a great user experience on all devices.

Tech Stack

Frontend: React.js, CSS

State Management: React Context API (for storing likes & comments)

Animations: AOS (Animate On Scroll)

API Integration: Imgflip API, Memegen API

Installation

Clone the repository:

git clone https://github.com/your-username/MemeVerse.git
cd MemeVerse

Install dependencies:

npm install

Run the development server:

npm start

Open the app in your browser:

http://localhost:3000

Project Structure

MemeVerse/
│── public/         # Static assets
│── src/
│   ├── components/ # Reusable UI components
│   ├── context/    # Global state management (likes & comments)
│   ├── pages/      # App pages (Home, Meme Details)
│   ├── styles/     # CSS stylesheets
│   ├── utils/      # Helper functions
│── package.json    # Project dependencies
│── README.md       # Project documentation

Usage

Liking a Meme: Click the ❤️ button to increase the like count. The like count persists across pages.

Adding a Comment: Enter a comment in the input field and submit it to add a comment below the meme.

Downloading a Meme: Click the ⬇️ button to download the meme to your device.

Filtering & Sorting: Use dropdowns to filter memes by category or sort them by likes or date.

Loading More Memes: Click the "Load More" button to fetch and display more memes dynamically.

API References

Imgflip API - Fetches popular meme templates.

Memegen API - Generates memes dynamically.

Contributing

Fork the repository.

Create a new branch:

git checkout -b feature-name

Make your changes and commit them:

git commit -m "Added new feature"

Push to your forked repository:

git push origin feature-name

Create a pull request.

License

This project is licensed under the MIT License.

Author

👤 Kopperla Vishnu Vardhan Reddy