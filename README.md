# dbmaj7.com
[Dbmaj7.com](http://www.dbmaj7.com) is a website that I build & maintain to stay connected to music education.
The website has two primary types of content:
- Articles: music theory articles, album reviews, etc
- Resources: highly interactive tools, such as a keyboard that demonstrates chords & scales

## (There is no) License:
DbMaj7.com is intended to be the only deployment of this app, and as such I am not offering a license of any kind at this time.

## Frontend
The front end is written in JavaScript/React, and targets modern browsers that implement the fetch api and web audio interface.
- Everything is kicked off at `/static/source/js/app.js`
- Semicolons only where needed because this is a fun side project and I want to learn about ASI
- All routing except `/api` and `/static` is handled on the front end (react-router-dom 4+)
- CSS is generated in JS by [styled-components](https://github.com/styled-components/styled-components)
- Most of the interesting music theory/audio stuff is in `/static/source/js/lib` and the `AudioContext` React component

## Backend
The backend (everything except `/static`, `/db`, and `/node_modules`) is written in Go (1.8.3+). The app is structured like this:
- dbmaj7.go is `package main`. As with any Go app, the `main()` function gets everything started
- the important structs are all defined in `/domain`
- controllers (i.e. `/api/controller`) handle http concerns (request/response, cookies, etc)
- services (i.e. `/api/service`) sit in-between a controller and repository, and are a placeholder for business logic
- repositories (i.e. `/repository/article`) query the database and marshal Postgres and JSON values to Go structs

## Database
PostgreSQL 9.4+
```
initial seed:
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
createdb dbmaj7
psql dbmaj7 < ./db/migrate_article_schema.sql
psql dbmaj7 < ./db/seed_blues_reharm.sql
```