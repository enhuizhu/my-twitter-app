import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.scss';
import { Twites } from './components/Twites/Twites';
import { Search } from './components/Search/Search';
import { SavedTwitesService } from './services/SavedTwitesService';
import { TwiteInterface } from './Interfaces/TwiteInterface';
import { ApiService } from './services/ApiService';
import styled from 'styled-components';

function App() {
  const [latestTwites, setLatestTwites] = useState([]);
  const [savedTwites, setSavedTwites] = useState(SavedTwitesService.getTwites());

  const stateRef: any = useRef();
  stateRef.current = latestTwites;
  
  useEffect(() => {
    document.addEventListener("dragover", function(event) {
      event.preventDefault();
    });
  }, [])

  const onDropHandler = (id: number) => {
    const twite = stateRef.current.find((latestTwite: TwiteInterface) => {
      return latestTwite.id == id;
    });

    if (twite) {
      const newSavedTwites = SavedTwitesService.addTwite(twite);
      setSavedTwites(newSavedTwites);
    }
  };

  const searchHandler = useCallback((keywords: string) => {
    ApiService.search(keywords).then((twites: any) => {
      setLatestTwites(twites);
    })
  }, []);
  
  return (
    <div className="App">
     <AppTitle>
       <h3>Twitter Saver</h3>
       <hr></hr>
     </AppTitle>
     <div>
      <Search onSearch={searchHandler}></Search>
     </div>
     <div className="list-container">
        <div className="list">
          <Twites twites={latestTwites} draggable={true}/>
        </div>
        <div className="list">
          <Twites twites={savedTwites} droppable={true} onDrop={onDropHandler}/>
        </div>
     </div>
    </div>
  );
}

export default App;

const AppTitle = styled.div`
  h3 {
    padding-left: 10px;
  }
`
