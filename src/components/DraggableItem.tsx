import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function DraggableItem(props: { item: { id: number; name: string } }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.item.id} - {props.item.name}
    </div>
  );
}
