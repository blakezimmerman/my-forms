import * as React from 'react';
import styled from 'client/styling';
import * as R from 'ramda';
import { MatchingResponse } from 'models/forms';
import Select from './Select';

interface Props {
  setA: string[];
  setB: string[];
  value: MatchingResponse;
  onChange: (value: MatchingResponse) => void;
}

const ColumnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div`
  margin-right: 1rem;

  &:last-of-type {
    margin: 0;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 1.4rem;
  margin: 0.3rem 0;
`;

const Letter = styled.div`
  display: inline-block;
  color: ${({theme}) => theme.colors.primary};
  font-weight: bold;
  margin-right: 0.3rem;
`;

const MatchingSelect = Select.extend`
  height: 1.4rem;
  margin-right: 0.3rem;
`;

const Matching = (props: Props) => {
  const onChange = (index: number) => (event: React.SyntheticEvent<HTMLSelectElement>) => {
    const temp = props.setB.map((item, i) => props.value[i]);
    props.onChange(R.update(index, parseInt(event.currentTarget.value, 10), temp));
  };

  return (
    <>
      <ColumnWrapper>
        <Column>
          {props.setA.map((item, index) =>
            <Row key={item}>
              <Letter>
                {`${String.fromCharCode(index + 65)}.`}
              </Letter>
              {item}
            </Row>
          )}
        </Column>
        <Column>
          {props.setB.map((item, index) =>
            <Row key={item}>
              <MatchingSelect
                value={props.value[index]}
                onChange={onChange(index)}
              >
                <option value={undefined}>-</option>
                {props.setA.map((option, i) =>
                  <option key={option} value={i}>{String.fromCharCode(i + 65)}</option>
                )}
              </MatchingSelect>
              {item}
            </Row>
          )}
        </Column>
      </ColumnWrapper>
    </>
  );
};

export default Matching;
