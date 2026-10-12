# Media Server Zero

Made with React & Express JS v5.

Media Server Zero is a piece of software intended for hosting your own files on a local server as an alternative to Cloud hosting. You can download your files from it, host some movies, music and pictures.

> [!WARNING]
> No authentication is implemented yet; It is planned! Use on a trusted LAN.

Media Server Zero has been tested to run on old, budget Android devices from 9 years ago. These devices can be granted new purpose like this.

# Notes

node_modules is NOT included in the folder; I removed it to free up some space.

Install node_modules in project root with `npm install` to run the backend. `npm install` inside frontend-source-code if you plan on experimenting with it.

A huge mistake I made while working on this project was not using Git. It could have prevented some issues.

# How to use

Since GitHub doesn't allow adding empty folders, create a new folder named 'root' in the root directory of the project, and create 4 other folders inside it, pictures, music, and movies. An artwork folder is added inside the movies folder if you want to personalize your library.

If you have a movie and an artwork, make sure they have the same name, with the movie inside the movies folder, and the artwork in artwork. Most formats should work.

> [!WARNING]
> The artworks are required for every movie you host! A fix is planned!

The project runs on port 3001, preferably LAN. The pictures, music, and movie folders available are used to preview some of the content available. You can also add folders and files to access, as long as they're in the root folder.

Then, just run it with `node index.js`

# Next to do:

Add Authentication, even if its pretty simple.
Maybe a dark/light mode switch.
remove dependency on the artwork folder to render movies correctly.

## Fixed:
* Fixed critical security issues relating to accessing the server outside the root context. This patch limits the download and fetching from the fileExplorer to only from inside the root folder. Previously, you'd be able to traverse the whole system.
* Removed unused dependencies.
