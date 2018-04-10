import * as React from 'react';
import styled from 'client/styling';
import FadeIn from 'client/components/FadeIn';
import Card from 'client/components/Card';
import { H2 } from 'client/components/Headers';

const ExamplesWrapper = styled.div`
  width: 100%;
  margin: 3rem 0;
`;

const ExampleHeader = H2.extend`
  text-align: center;
  margin: 0 0 1rem 0;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ExampleCard = Card.extend`
  margin: 1rem;
  width: 25rem;

  h3 {
    font-size: 1.2rem;
    font-weight: 300;
    text-align: center;
  }
`;

const Examples = () => (
  <FadeIn>
    <ExamplesWrapper>
      <ExampleHeader>With myForms you can easily...</ExampleHeader>
      <CardsWrapper>
        <ExampleCard>
          <h3>Create and Share Surveys</h3>
        </ExampleCard>
        <ExampleCard>
          <h3>Create and Share Tests</h3>
        </ExampleCard>
      </CardsWrapper>
    </ExamplesWrapper>
  </FadeIn>
);

export default Examples;
