import React from 'react';

import ChartPage from './pages/ChartPage';

import GlobalStyle from './styles/style.js';
import styled from 'styled-components';

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <ChartPage />
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin: 40px auto;
`;
