import { Virtuoso } from 'react-virtuoso';
import { useState, useCallback, useEffect } from 'react';
import { addSelectedRecord, getRecords } from './lib/fetchers';
import { RightWindow } from './components/RightWindow';
import { FilterLeft } from './components/FilterLeft';
import { Toaster } from 'sonner';
import { AddElement } from './components/AddElement';

export type Element = { id: number; name: string };

export function HomePage() {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [filter, setFilter] = useState<number[]>([]);

  const loadMore = useCallback(async () => {
    const batchRecords = await getRecords({ index: elements.length, filter });
    setElements((elements) => [...elements, ...batchRecords]);
  }, [elements, filter]);

  useEffect(() => {
    (async () => {
      const batchRecords = await getRecords({ index: elements.length, filter });
      setElements(batchRecords);
    })();
  }, []);

  return (
    <div className=''>
      <h1 className='py-4 text-center text-2xl font-semibold'>
        Цифровые решения Алексей Грачев
      </h1>

      <div className='mx-auto flex max-w-4xl rounded-lg border border-gray-200 shadow-md'>
        <div className='flex h-[485px] w-1/2 flex-col overflow-y-hidden border-r border-b border-gray-200'>
          <div className=' '>
            <FilterLeft setElements={setElements} setFilter={setFilter} />
            <AddElement />
          </div>
          <Virtuoso
            style={{ height: '100%', padding: '10px' }}
            data={elements}
            endReached={() => {
              loadMore();
            }}
            totalCount={0}
            itemContent={(index, element) => {
              return (
                <div
                  className='border-b border-gray-200 p-2 text-start'
                  onClick={async () => {
                    const data = await addSelectedRecord(element.id);
                    setElements((elements) =>
                      elements.filter((e) => e.id !== element.id),
                    );
                    setSelectedElements((selectedElements) => {
                      if (
                        selectedElements.find((e) => e.id === element.id) ||
                        data.length > selectedElements.length + 1
                      ) {
                        return selectedElements;
                      } else {
                        return [...selectedElements, element];
                      }
                    });
                    if (elements.length < 20) {
                      loadMore();
                    }
                  }}
                >
                  {element.id} - {element.name}
                </div>
              );
            }}
          />
        </div>
        <div className='flex h-[485px] w-1/2 flex-col overflow-y-hidden'>
          <RightWindow
            items={selectedElements}
            setItems={setSelectedElements}
            elements={elements}
            setElements={setElements}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
