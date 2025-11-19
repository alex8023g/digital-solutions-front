import React, { useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { DraggableItem } from './components/DraggableItem';
import type { Element } from './HomePage';
import { setSelectedRecords } from './lib/fetchers';

export function DraggableList({
  items,
  setItems,
}: {
  items: Element[];
  setItems: React.Dispatch<React.SetStateAction<Element[]>>;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    console.log('🚀 ~ ExperimentPage2 ~ items:', items);
    // setSelectedRecords(items);
  }, [items]);

  return (
    <div className='h-[485px] border '>
      <h2>drag and drop</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log('🚀 ~ handleDragEnd ~ active:', active, over);

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setSelectedRecords(newItems);
        return newItems;
      });
    }
  }
}
