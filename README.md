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

### Log In and Sign Up

![Sign Up](./readme-assets/images/signup.jpg)
![Log In](./readme-assets/images/login.jpg)

### Feed Page

Waveform feed displays most recent songs and playlists
Discover and search for new songs and playlists
![Feed Page](./readme-assets/images/feed.jpg)

### Add Songs

Add a new song to the database
![Add Song](./readme-assets/images/song-add.jpg)
Cancel adding song
![Cancel Add Song](./readme-assets/images/song-add-cancel.jpg)

### Edit Songs

Edit a song in the database
![Edit Song](./readme-assets/images/song-edit.jpg)
Cancel editing song
![Cancel Edit Song](./readme-assets/images/song-edit-cancel.jpg)

### View and Delete Songs

Delete a song from the database
![Delete Song](./readme-assets/images/song-delete.jpg)
Cancel deleting song
![Cancel Delete Song](./readme-assets/images/song-delete-cancel.jpg)

### View Playlist

Single playlist and the songs within it
![Playlist Page](./readme-assets/images/playlist-page.jpg)

### Add Playlists

Add a new playlist to the database
![Add Playlist](./readme-assets/images/playlist-add.jpg)
Cancel adding playlist
![Cancel Add Playlist](./readme-assets/images/playlist-add-cancel.jpg)

### Edit Playlists

Edit a playlist in the database
![Edit Playlist](./readme-assets/images/playlist-edit.jpg)
Cancel adding playlist
![Cancel Edit Playlist](./readme-assets/images/playlist-edit-cancel.jpg)

### Delete Playlists

Delete a playlist from the database
![Edit Playlist](./readme-assets/images/playlist-delete.jpg)
Cancel deleting playlist
![Cancel Edit Playlist](./readme-assets/images/playlist-delete-cancel.jpg)

-   Add any more features here

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

### AWS S3 Image and Song Upload

One challenge that we faced was finding a way to have a user select an audio file on the frontend and for our app to pass it to the backend and store it. We started off attempting to pass the file directly from the input field as JSON to our Flask backend, but we soon realized that the information Flask received was not in an appropriate form to be handled and stored. After some research, we were able to find that the file could be stored into FormData in a manner that would allow us to pass it to the backend in a Flask readable form. From there, we were able to utilize Boto3 to programatically store the songs and album images into AWS S3.

In our React frontend song creation form, we create a new FormData instance and set the song and album image files to properties on it.

```javascript
let songData = new FormData();
songData.set("file", songUrl);
songData.set("image", albumImage);

const data = {
	title,
	artist: artist || null,
	album: album || null,
	genres,
};
```

Here, we send our FormData and other song data to our Redux thunk.

```javascript
const response = await dispatch(uploadSongThunk(data, songData));
```

Our thunk will make a post request to our Flask backend, sending the song data as a file rather than JSON.

```javascript
export const uploadSongThunk = (payload, songData) => async (dispatch) => {
	// Additional code excluded for brevity
			const AWSResponse = await fetch(
				`/api/songs/AWS/${SQLData.songId}`,
				{
					method: "POST",
					body: songData,
				}
			);

			if (AWSResponse.ok) {
				const AWSData = await AWSResponse.json();
				if (AWSData.errors) {
					return AWSData;
				}
			}
			return SQLData;
		}
	}
};
```

Once our data reaches the Flask backend, we verify the file, we verify its type, we upload it to AWS and we receive a url to the AWS stored file to put in our database.

```python
@songs_routes.route("/AWS/<int:id>", methods=['POST'])
@login_required
def post_song_url(id):
    # for song upload
    if "file" not in request.files:
        return {"errors": "song required"}#, 400

    song = request.files['file']

    if not allowed_file(song.filename):
        return {"errors": "file type not permitted"}#, 400

    song.filename = get_unique_filename(song.filename)

    songUpload = upload_file_to_s3(song)

    if "url" not in songUpload:
        return songUpload#, 400

    songUrl = songUpload["url"]

    song_to_update = Song.query.get_or_404(id)
    song_to_update.songUrl = songUrl
    db.session.commit()
```

The process above is repeated for the album image as well, but we only show the song upload snippet for brevity.

## Future Features

1. **Waveform** - background waveform that moves along with the song being played

2. **Liked Songs Playlist** - playlist composed of songs liked by the user

3. **Music Shuffle** - ability to shuffle songs randomly

4. **Order Playlist Songs** - ability to order songs within playlist

## Contact

### Justice Martin

<a href="https://www.linkedin.com/in/justice-martin-34043340/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a><a href="https://github.com/jujmart"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>

<!-- <a href="https://angel.co/u/{angel-list-handle}"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a> -->

jujmart12@gmail.com

### Maxwell Wehner

<a href="https://www.linkedin.com/in/maxwell-wehner-7a2066220/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a><a href="https://github.com/MaxwellWehner"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>

<!-- <a href="https://angel.co/u/{angel-list-handle}"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a> -->

maxwehnerwork@gmail.com

### Andrew Watkins

<a href="https://www.linkedin.com/in/andrew-watkins-533280173/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a><a href="https://github.com/andru17urdna"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>

<!-- <a href="https://angel.co/u/{angel-list-handle}"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a> -->

dr3wwatkins@gmail.com
