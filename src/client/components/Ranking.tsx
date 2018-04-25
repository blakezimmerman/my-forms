import * as React from 'react';
import styled from 'client/styling';
import { RankingResponse } from 'models/forms';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { DragItem, DropZone } from 'client/components/DragNDrop';

interface Props {
  value: RankingResponse;
  onChange: (value: RankingResponse) => void;
}

const Item = styled.div`
  background-color: ${({theme}) => theme.colors.primary};
  color: white;
  border-radius: 0.5rem;
  margin: 0.2rem;
  padding: 0.4rem 0.8rem;
  display: inline-block;
`;

const Ranking = (props: Props) => {
  const onDragStart = () => {
    document.body.classList.add('dragging');
  };

  const onDragEnd = (result: DropResult) => {
    document.body.classList.remove('dragging');

    if (!result.destination) {
      return;
    }

    const temp = Array.from(props.value);
    const [removed] = temp.splice(result.source.index, 1);
    temp.splice(result.destination.index, 0, removed);

    props.onChange(temp);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <DropZone id={'ranking'} disabled={false}>
        <>
        {props.value.map((item, index) =>
          <DragItem key={item} id={item} index={index} usePortal={true}>
            <Item>{item}</Item>
          </DragItem>
        )}
        </>
      </DropZone>
    </DragDropContext>
  );
};

export default Ranking;
