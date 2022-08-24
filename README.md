# Technically A Blog
This project was created by Ryan Reeves - click [here](mailto:ryan_reeves@live.com) to email the creator


## Project Description
CMS Style blog website using Handlebars, Express, and Sequelize

## Usage
To use, log in to MySQL "mysql -u root -p" and source the schema by inputting "SOURCE db/schema.sql". You can then exit MySQL and seed the comment, post, and user seeds by inputting "npm run seed" in node. To start the server, simply type "node server" to start the server on localhost:3001.
### Features:
- Login/registration
- View current posts and add your own posts
- View, edit, or delete your previous posts
- View post comments and comment on posts
- Persistent database that stores users, posts, and comments
- Mobile friendly interface

## App Preview
[App preview](https://user-images.githubusercontent.com/102436216/186249284-501aa4dc-70b5-46ab-bfc3-26b91fb23819.png)

## Live demo/Heroku deployment
Click [here](https://tranquil-shore-42404.herokuapp.com/) to view the heroku deployment and demo the app