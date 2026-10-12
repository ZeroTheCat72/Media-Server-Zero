# Media Server Project

Made with React & Express JS v5.

# Notes

node_modules is NOT included in the folder; I removed it to free up some space. If you plan on running this, make sure to reinstall node_modules, alongside one of the only dependencies the project depends on, ExpressJS. (this project was built on version 5 if you're wondering.)

The frontend-source-code only contains the React code; no node_modules. Again, install it if you're attempting to run.

`npm install express`

A huge mistake I made while working on this project was not using Git. It could have prevented some issues, but alas. And now the history of the project is long gone.

# How to use

The project runs on port 3001, preferably LAN, I don't believe its secure otherwise in its current state. Any files you want put them inside root, make your own folders inside, whatever. The pictures, music, and movie folders already available are used to present content the moment you open the site.

The movies folder also has an artwork folder inside, so if you have a movie and an artwork, make sure they have the same name. (with different file extensions of course.)

# Next to do:

Add Authentication, even if its pretty simple.
Maybe a dark/light mode switch

## Fixed:
* Fixed critical security issues relating to accessing the server outside the root context. This patch limits the download and fetching from the fileExplorer to only from inside the root folder. Previously, you'd be able to traverse the whole system.
* Removed unused dependencies.
