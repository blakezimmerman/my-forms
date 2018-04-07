import * as React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface DragProps {
  id: string;
  index: number;
  children: JSX.Element;
}

export const DragItem = (props: DragProps) => (
  <Draggable draggableId={props.id} index={props.index}>
    {(provided, snapshot) => (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style || undefined}
        >
          {props.children}
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);

interface DropProps {
  id: string;
  disabled: boolean;
  children: JSX.Element;
}

export const DropZone = (props: DropProps) => (
  <Droppable droppableId={props.id} isDropDisabled={props.disabled}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
      >
        {props.children}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);
