import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Element } from '../HomePage';
import { removeSelectedRecord } from '../lib/fetchers';

export function DraggableItem({
  item,
  elements,
  setElements,
  setItems,
}: {
  item: { id: number; name: string };
  elements: Element[];
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  setItems: React.Dispatch<React.SetStateAction<Element[]>>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className='flex w-96 items-center justify-between border-b border-gray-200 bg-white p-2'
      onClick={async () => {
        const less = elements
          .filter((e) => e.id < item.id)
          .sort((a, b) => a.id - b.id);
        const clone = structuredClone(elements);
        clone.splice(less.length, 0, item);
        setElements(clone);
        await removeSelectedRecord(item.id);
        setItems((items) => {
          const res = items.filter((i) => i.id !== item.id);
          return res;
        });
      }}
    >
      <span>
        {item.id} - {item.name}
      </span>
      <div {...listeners}>drag me</div>
    </div>
  );
}
