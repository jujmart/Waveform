# Waveform

Waveform is a Spotify clone where users can come to listen, share, and socialize about music. It is a fullstack React App made with a Redux state manager and a backend using Python, Flask, SQL-Alchemy, PostgresSQL and other technologies.

-   View the <a href='https://waveform-app.herokuapp.com/'>Waveform</a> App Live

-   Reference to the Waveform <a href='https://www.github.com/jujmart/Waveform/wiki'>Wiki Docs</a>

| Table of Contents                                                        |
| ------------------------------------------------------------------------ |
| 1. [Features](#features)                                                 |
| 2. [Installation](#installation)                                         |
| 3. [Technical Implementation Details](#technical-implementation-details) |
| 4. [Future Features](#future-features)                                   |
| 5. [Contact](#contact)                                                   |
| 6. [Special Thanks](#special-thanks)                                     |

## Technologies

-   <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
-   <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL&logoColor=white" /></a>
-   <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"></a>
-   <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
-   <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
-   <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
-   <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=ffd343" /></a>
-   <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" /></a>
-   <a href="https://www.heroku.com/home"><img src="https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white" /></a>
-   <a href="https://alembic.sqlalchemy.org/">Alembic</a>

## Features

### Login and Sign Up
---

<br/><br/>
Login
<!-- ![Sign Up](./readme-assets/images/signup.jpg) -->
<img src="./readme-assets/images/signup.jpg" width="800" align="middle" />
<!-- ![Log In](./readme-assets/images/login.jpg) -->

<br/><br/>
Sign Up
<!--  -->
<img src="./readme-assets/images/login.jpg" width="500" align="middle" />

<br/><br/>

### Feed Page
Waveform feed displays most recent songs and playlists


---
<br/><br/>
<!-- ![Feed Page](./readme-assets/images/feed.jpg) -->
<img src="./readme-assets/images/feed.jpg" width="800" align="middle" />
<br/><br/>

### Add Songs
Add a new song to the database

---
<br/><br/>
<!-- ![Add Song](./readme-assets/images/song-add.jpg) -->
<img src="./readme-assets/images/song-add.jpg" width="800" align="middle" />

<br/><br/>

### Edit Songs
Edit a song in the database

---
<br/><br/>
<!-- ![Edit Song](./readme-assets/images/song-edit.jpg)6 -->
<img src="./readme-assets/images/song-edit.jpg" width="800" align="middle" />

<br/><br/>

### View and Delete Songs
Delete a song from the database

---
<br/><br/>
<!-- ![Delete Song](./readme-assets/images/song-delete.jpg) -->
<img src="./readme-assets/images/song-delete.jpg" width="800" align="middle" />

<br/><br/>

### View Playlist
Single playlist and the songs within it

---
<br/><br/>
<!-- ![Playlist Page](./readme-assets/images/playlist-page.jpg) -->
<img src="./readme-assets/images/playlist-page.jpg" width="800" align="middle" />

<br/><br/>

### Add Playlists
Add a new playlist to the database

---
<br/><br/>
<!-- ![Add Playlist](./readme-assets/images/playlist-add.jpg) -->
<img src="./readme-assets/images/playlist-add.jpg" width="800" align="middle" />

<br/><br/>

### Edit Playlists
Edit a playlist in the database

---
<br/><br/>
<!-- ![Edit Playlist](./readme-assets/images/playlist-edit.jpg) -->
<img src="./readme-assets/images/playlist-edit.jpg" width="800" align="middle" />

<br/><br/>

### Delete Playlists
Delete a playlist from the database

---
<br/><br/>
<!-- ![Edit Playlist](./readme-assets/images/playlist-delete.jpg) -->
<img src="./readme-assets/images/playlist-delete.jpg" width="800" align="middle" />

<br/><br/>

### Follow Users & Followed Users Tower
The "Followed Users" feed displays other users that you have followed


---
<br/><br/>
<!-- ![Edit Playlist](./readme-assets/images/playlist-delete.jpg) -->
<img src="./readme-assets/images/follows.jpg" width="1500" align="middle" />

<br/><br/>

### Search
Discover and search for new Songs, Playlists & Users

---
<br/><br/>
<!-- ![Edit Playlist](./readme-assets/images/playlist-delete.jpg) -->
<img src="./readme-assets/images/search-top.jpg" width="800" align="middle" />
<br/><br/>
<img src="./readme-assets/images/search-bottom.jpg" width="800" align="middle" />

<br/><br/>

## Installation

To build/run project locally, please follow these steps:

1. Clone this repository

```shell
git clone https://github.com/jujmart/Waveform.git
```

2. Install Pipfile dependencies and create the virtual environment

```shell
pipenv install
```

2. Install npm dependencies for the `/react-app`

```shell
cd react-app
npm install
```

3. In the `/` root directory, create a `.env` based on the `.env.example` with proper settings

4. Setup your PostgreSQL user, password and database and ensure it matches your `.env` file

5. Before running any flask commands, confirm you are in the pipenv virtual env. If not, run the command:

```shell
pipenv shell
```

6. In the root folder, migrate tables to the database by running in the terminal:

```shell
flask db upgrade head
```

7. In the root folder, seed the database by running in the terminal:

```shell
flask seed all
```

8. Start the flask backend in the `/` root directory

```shell
flask run
```

9. Start the frontend in the `/react-app` directory

```shell
npm start
```

## Technical Implementation Details

### {Detail 1}

Description 1

Part of code is shown below:

```python
print('add code snippet 1 here')
```

Description 2

```javascript
print("add code snippet 2 here");
```

### {Detail 2}

Description 1

Code snippet is shown here:

```javascript
print("add code snippet 1 here");
```

## Future Features

1. **Search** - search {resource-1-plural}

2. **Music Shuffle** - ability to shuffle songs randomly

3. **Order Playlist Songs** - ability to order songs within playlist

## Contact

### Justice Martin

<a href="https://www.linkedin.com/in/justice-martin-34043340/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a>

<!-- <a href="https://angel.co/u/{angel-list-handle}"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a> -->

<a href="https://github.com/jujmart"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>

jujmart12@gmail.com

### Maxwell Wehner

<a href="https://www.linkedin.com/in/maxwell-wehner-7a2066220/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a>

<!-- <a href="https://angel.co/u/{angel-list-handle}"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a> -->

<a href="https://github.com/MaxwellWehner"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>

maxwehnerwork@gmail.com

### Andrew Watkins

<a href="https://www.linkedin.com/in/andrew-watkins-533280173/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a>

<!-- <a href="https://angel.co/u/{angel-list-handle}"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a> -->

<a href="https://github.com/andru17urdna"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>

dr3wwatkins@gmail.com
