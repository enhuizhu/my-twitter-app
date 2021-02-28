import React, {FC, useCallback, useRef} from 'react';
import styled from 'styled-components';

interface SearchProps {
  onSearch: Function,
}

export const Search: FC<SearchProps> = ({
  onSearch
}) => {
  const inputEl: any = useRef(null);
  
  const onSearchHandler = useCallback(() => {
    const keywords = inputEl.current?.value;
    inputEl.current.value = '';
    onSearch(keywords);
  }, []);
  

  return <SearchContainer>
    <input type='text' ref={inputEl} placeholder='search keywords'/>
    <button onClick={onSearchHandler}>Search</button>
  </SearchContainer>
};

const SearchContainer = styled.div`
  display: flex;
  padding-left: 10px;
  input {
    width: calc(100vw - 150px);
    margin-right: 10px;
  }

`
