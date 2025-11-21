import React, { useEffect, useRef, useState } from 'react';
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
import { DraggableItem } from './DraggableItem';
import type { Element } from '../HomePage';
import { getSelectedRecords, saveSelectedOrder } from '../lib/fetchers';
import { useIntersectionObserver } from '@react-hooks-library/core';
import { FilterRight } from './FilterRight';

export function RightWindow({
  items,
  setItems,
  elements,
  setElements,
}: {
  items: Element[];
  setItems: React.Dispatch<React.SetStateAction<Element[]>>;
  elements: Element[];
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
}) {
  const [filter, setFilter] = useState<number[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const outer = useRef(null);
  const inner = useRef(null);

  const { inView } = useIntersectionObserver(inner, {
    root: outer,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      getSelectedRecords({ index: items.length, filter }).then((records) => {
        console.log(records.data);
        setItems((items) => [...items, ...records.data]);
      });
    }
  }, [inView, filter]);

  return (
    <>
      <FilterRight setElements={setItems} setFilter={setFilter} />
      <div className='border py-[6px]'>
        {inView ? <span>inView</span> : <span>not in view</span>}
      </div>
      <div ref={outer} className='h-[485px] overflow-y-scroll'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <div key={item.id}>
                <DraggableItem
                  key={item.id}
                  item={item}
                  elements={elements}
                  setElements={setElements}
                  setItems={setItems}
                />
              </div>
            ))}
          </SortableContext>
        </DndContext>
        <div ref={inner} className='opacity-0'>
          Load more...
        </div>
      </div>
    </>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log('🚀 ~ handleDragEnd ~ active:', active, over);

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        console.log('🚀 ~ handleDragEnd ~ newItems:', newItems);
        saveSelectedOrder({ records: newItems, filter });
        return newItems;
      });
    }
  }
}
