import * as React from 'react';
import { createPortal } from 'react-dom';
import { Draggable, DraggableProvided, Droppable } from 'react-beautiful-dnd';

interface DragProps {
  id: string;
  index: number;
  children: JSX.Element;
  usePortal?: boolean;
}

export const DragItem = (props: DragProps) => {
  const draggableElem = document.getElementById('draggable');

  const portal = (styles: any, element: JSX.Element) => {
    if (styles && styles.position === 'fixed') {
      return createPortal(element, draggableElem!);
    }
    return element;
  };

  const draggable = (provided: DraggableProvided) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={provided.draggableProps.style || undefined as any} // Workaround until the types are fixed
    >
      {props.children}
    </div>
  );

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div>
          {props.usePortal
            ? portal(provided.draggableProps.style, draggable(provided))
            : draggable(provided)
          }
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

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
