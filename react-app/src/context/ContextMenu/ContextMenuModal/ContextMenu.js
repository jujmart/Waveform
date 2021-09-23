import React, { useContext, useCallback, useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './menu.css'



const ContextMenuContext = React.createContext();

export function ContextMenuProvider({ children }) {
  const contextMenuRef = useRef();
  const [value, setValue] = useState();
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");
  const [menu, showMenu] = useState(false);
  const [dynamic, setDynamic] = useState({});
  const [playlistDropDown, setPlaylistDropDown] =useState(false);

  const user = useSelector((state) => state.session.user);
  const userPlaylistIds = useSelector(
		(state) => state.userMusicInfo.playlists
	);

  const handleContextMenu = useCallback(
    event => {
      if (dynamic !== {}) setDynamic({})
      if (event.target) {

        if (!!event.target.attributes.getNamedItem('data-tag')) {
          setDynamic(JSON.parse(event.target.attributes.getNamedItem('data-tag').value))

        }

        event.preventDefault();
          setXPos(`${event.pageX}px`);
          setYPos(`${event.pageY}px`);
          showMenu(true);

      } else {
			  showMenu(false);
		  }

    }, [showMenu, setXPos, setYPos]
	);



  const handleClick = useCallback(() => {
    setDynamic(null)
    setPlaylistDropDown(false)
    showMenu(false);
  }, [showMenu]);


  useEffect(() => {
    setValue(contextMenuRef.current);
  }, [])


  useEffect(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("contextmenu", handleContextMenu);
		return () => {
		  document.removeEventListener("click", handleClick);
		  document.removeEventListener("contextmenu", handleContextMenu);
		};
	  }, []);


  return (
    <>
      <ContextMenuContext.Provider value={value}>
        {children}
      </ContextMenuContext.Provider>
      <div ref={contextMenuRef} />

      {menu &&
        <div>
          {dynamic?.hasOwnProperty('song') ?
          <ul className="menu" style={{ top: yPos, left: xPos }}>
            <li onMouseEnter={() => setPlaylistDropDown(false)}>Play Song</li>
            <li onMouseEnter={() => setPlaylistDropDown(false)}>Add song to Queue</li>
            {user.id === dynamic.createdById ?
            <>
              <li>Remove from Playlist</li>
            </>
              :
            <>

                <li></li>
                <li onMouseEnter={() => setPlaylistDropDown(true)}
                    >Add Song To Playlist

                      {playlistDropDown?
                      <ul className='playlist-dropdown-ul'>
                        <li>Playlist 1</li>
                        <li>Playlist 2</li>
                        <li>Playlist 3</li>
                        <li>Playlist 4</li>
                        <li>Playlist 5</li>
                      </ul> :
                       <></> }
                </li>

            </>
            }
            </ul>
          : <ul className="menu" style={{ top: yPos, left: xPos }}>
          <li>Item1</li>
          <li>Item2</li>
          <li>Item3</li>
          <li></li>
        </ul>}

        </div>
          }
    </>
  );
}
