import React from 'react';

import FilterBtn from '../components/FilterBtn';
import Charting from '../components/Charting';

import styled from 'styled-components';
import { registChart } from '../utils/registChart';

registChart();

export default function ChartPage() {
  return (
    <Container>
      <FilterBtn />
      <ChartBox>
        <Charting />
      </ChartBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const ChartBox = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  height: 100%;
`;
