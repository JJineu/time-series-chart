import React, { useEffect, useState } from 'react';

import { useChart } from '../context/ChartContext';

import styled from 'styled-components';
import { COLORS } from '../constants/color';

export default function FilterBtn() {
  const { filterID, setFilterID, data } = useChart();
  const [cities, setCities] = useState<string[]>([]);

  const filterById = (id: string) => {
    setFilterID(id);
  };

  useEffect(() => {
    function setCityArray() {
      const citySet: Set<string> = new Set();
      data.forEach((data) => citySet.add(data.id));
      setCities(Array.from(citySet));
    }
    setCityArray();
  }, [data]);

  return (
    <Container>
      <StyledBtn onClick={() => filterById('')}>Reset</StyledBtn>
      {cities.map((city, idx) => (
        <StyledBtn key={idx} onClick={() => filterById(city)} selected={filterID === city}>
          {city}
        </StyledBtn>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const StyledBtn = styled.button<{ selected?: boolean }>`
  margin: 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.selected ? COLORS.coral : 'transparent')};
  color: ${(props) => (props.selected ? COLORS.white : COLORS.black)};
  border-radius: 5px;

  &:hover {
    background-color: ${COLORS.lightCoral};
    color: ${COLORS.white};
  }
`;
