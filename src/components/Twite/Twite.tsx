import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment'
import { TwiteInterface } from '../../Interfaces/TwiteInterface';

export const Twite: FC<TwiteInterface> = ({
  avatarUrl,
  fullName,
  text,
  date,
  draggable,
  id
}) => {
  const twiteEl: any = useRef(null);

  useEffect(() => {
    if (draggable) {
      const handler = (event: any) => {
        event.dataTransfer.setData("twiteId", id)
      };

      twiteEl.current.addEventListener('dragstart', handler);

      return () => {
        twiteEl.current?.removeEventListener('dragstart', handler);
      }
    }
  }, []);


  return <TwiteContainer draggable={draggable} ref={twiteEl}>
    <div className='avatar'>
      <img src={avatarUrl}></img>
    </div>
    <div className='content'>
      <div className='basic-info'>
        <strong>{fullName}</strong>
        <span>{moment(date).format('LLLL')}</span>
      </div>
      <div>
        {text}
      </div>
    </div>
  </TwiteContainer>;
}

const TwiteContainer = styled.div`
  margin: 10px;
  margin-bottom: 20px;
  display: flex;
  border-bottom: solid 1px gray;
  padding-bottom: 8px;
  
  .avatar {
    width: 70px;
    padding: 10px;
    
    img {
      width: 100%;
      border-radius: 50%;
    }  
  }

  .basic-info {
    display: flex;
    justify-content: space-between;
  }
`