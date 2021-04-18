

import React from 'react';
import './App.css';
import List from './components/List.js';
import Inputdata from './components/Inputdata.js';
import Title from './components/Title.js';

import Container from '@material-ui/core/Container';

export default function App() {
  return (
    <Container color="primary">

      <Title />
      <Inputdata/>
      <List />

    </Container>
  );
}


