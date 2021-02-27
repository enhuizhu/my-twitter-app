import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Twites } from './components/Twites/Twites';
import { SavedTwitesService } from './services/SavedTwitesService';
import { TwiteInterface } from './Interfaces/TwiteInterface';
import styled from 'styled-components';

function App() {
  let twites = require('./mockTwitterData.json');
  
  twites = twites.statuses.map((status: any) => ({
    avatarUrl: status.user.profile_image_url,
    fullName: status.user.name,
    text: status.text,
    date: status.created_at,
    id: status.id,
  }));

  const [latestTwites, setLatestTwites] = useState(twites);
  const [savedTwites, setSavedTwites] = useState(SavedTwitesService.getTwites());

  document.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  const onDropHandler = (id: number) => {
    const twite = latestTwites.find((latestTwite: TwiteInterface) => {
      return latestTwite.id == id;
    });

    if (twite) {
      const newSavedTwites = SavedTwitesService.addTwite(twite);
      setSavedTwites(newSavedTwites);
    }
  }
  
  return (
    <div className="App">
     <AppTitle>
       <h3>Twitter Saver</h3>
       <hr></hr>
     </AppTitle>
     <div>

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
