import React, { FC, useEffect, useRef } from 'react';
import { Twite } from '../Twite/Twite';
import { TwiteInterface } from '../../Interfaces/TwiteInterface';
import styled from 'styled-components';

interface TwitesProps {
  twites: TwiteInterface[],
  [key: string]: any,
}

export const Twites: FC<TwitesProps> = ({twites, draggable, droppable, onDrop}) => {
  const containerEl: any = useRef(null);
  
  useEffect(() => {
    if (droppable && onDrop) {
      containerEl.current.addEventListener('drop', (ev: any) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("twiteId");
        console.log('drop data:', data);
        onDrop(data);
      });
    }
  }, []);
  
  return <Container ref={containerEl}>
    {
      twites.map((twite, index) => <Twite key={index} {...twite} draggable={draggable}></Twite>)
    }
  </Container>
}

const Container = styled.div`
  border: solid 1px gray;
  margin: 10px;
  height: calc(100vh - 103px);
  overflow: auto;
`
