import { useEffect, useState } from 'react';
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

import { SortableItem } from './components/SortableItem';

export function ExperimentPage2() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    console.log('🚀 ~ ExperimentPage2 ~ items:', items);
  }, [items]);

  return (
    <div className='h-[485px] border'>
      <h2>drag and drop</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
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
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over?.id as number);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
