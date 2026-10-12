# Media Server Zero

Made with React & Express JS v5.

Media Server Zero is a piece of software intended for hosting your own files on a local server as an alternative to online hosting. You can download your files from it, host some movies, music and pictures. Highly recommended to use in LAN in its current state.

Media Server Zero has been tested to run on old Android devices from 9 years ago. These devices can be granted new purpose like this.

# Notes

node_modules is NOT included in the folder; I removed it to free up some space. If you plan on running this, make sure to reinstall node_modules, alongside one of the only dependencies the project depends on, ExpressJS. (this project was built on version 5 if you're wondering.)

The frontend-source-code only contains the React code; no node_modules. Again, install it if you're attempting to run.

`npm install express`

A huge mistake I made while working on this project was not using Git. It could have prevented some issues.

# How to use

Since Github doesn't allow adding empty folders, create a new folder named 'root' in the root directory of the project, and create 4 other folders inside it, pictures, music, and movies. An artworks folder is added inside the movies folder if you want to personalize your library.

If you have a movie and an artwork, make sure they have the same name, with the movie inside the movies folder, and the artwork in artworks. Most formats should work. (with different file extensions of course.)

> [!WARNING]
> The artworks are required for every movie you host! A fix is planned!

The project runs on port 3001, preferably LAN, I don't believe its secure otherwise in its current state. The pictures, music, and movie folders available are used to present content the moment you open the site. You can also add folders and files to access, as long as they're in the root folder.

Then, just run it with `node index.js`

# Next to do:

Add Authentication, even if its pretty simple.
Maybe a dark/light mode switch

## Fixed:
* Fixed critical security issues relating to accessing the server outside the root context. This patch limits the download and fetching from the fileExplorer to only from inside the root folder. Previously, you'd be able to traverse the whole system.
* Removed unused dependencies.
