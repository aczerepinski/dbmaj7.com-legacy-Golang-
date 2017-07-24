# dbmaj7.com
[Dbmaj7.com](http://www.dbmaj7.com) is a website that I build & maintain to stay connected to music education.
The website has two primary types of content:
- Articles: music theory articles, album reviews, etc
- Resources: highly interactive tools, such as a keyboard that demonstrates chords & scales

## Frontend
The front end is written in JavaScript/React, and targets modern browsers that implement the fetch api.
- Everything is kicked off at `/static/source/js/app.js`
- No semicolons because this is a side project and I want to learn about ASI
- All routing except `/api` and `/static` is handled on the front end (react-router-dom 4+)
- Most of the interesting music theory stuff is in `/static/source/js/lib` and the `AudioContext` React component

## Backend
The backend (everything except `/static` and `/node_modules`) is written in Go (1.8.3+). The app is structured like this:
- dbmaj7.go is `package main`. The `main()` function kicks everything off
- the important structs are all defined in `/domain`
- controllers (i.e. `/api/controller`) handle http concerns (request/response, cookies, etc)
- services (i.e. `/api/service`) sit in-between a controller and repository, and are a placeholder for business logic
- repositories (i.e. `/repository/article`) query the database and marshal results to Go structs