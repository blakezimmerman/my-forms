import * as React from 'react';
import * as styles from './questions.styles.scss';
import { RankingResponse } from 'models/forms';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { DragItem, DropZone } from 'client/shared/UI/components/dnd';

interface Props {
  value: RankingResponse;
  onChange: (value: RankingResponse) => void;
}

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
    <div className={styles.ranking}>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <DropZone id={'ranking'} disabled={false}>
          <>
          {props.value.map((item, index) =>
            <DragItem key={item} id={item} index={index}>
              <div className={styles.item}>{item}</div>
            </DragItem>
          )}
          </>
        </DropZone>
      </DragDropContext>
    </div>
  );
};

export default Ranking;
