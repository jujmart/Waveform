import React from 'react';
import { useSelector } from 'react-redux';

const HomePageLoggedIn = () =>{

    const user = useSelector(state => state.session.user)



    
    return (
        <div id='homepage-container_div'>
    {/* Current Users Playlist divider */}
            <div>
                <h2>{user.username} Playlists</h2>
                    <div>
                        <p>Name of playlist</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of playlist</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of playlist</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of playlist</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of playlist</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
            </div>

{/* Recently Added Songs Divider */}
            <div>
                <h2>Recently Added Songs</h2>
                    <div>
                        <p>Name of Song</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of Song</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of Song</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of Song</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of Song</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of Song</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
            </div>


{/* Checkout Other Playlists Divider */}
            <div>
                <h2> Playlists</h2>
                    <div>
                        <p>Name of playlist</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of playlist</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of playlist</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of playlist</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
                    <div>
                        <p>Name of playlist</p>
                        <img src='' alt='Album Image' />
                        <button>Stuff</button>
                    </div>
            </div>



        </div>
    )
}

export default HomePageLoggedIn
