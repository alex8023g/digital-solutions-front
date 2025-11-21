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
      <h1>Experiment Page 2</h1>

      <div className=' border flex max-w-4xl mx-auto'>
        <div className='h-[485px] overflow-y-hidden border w-1/2 flex flex-col'>
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
                  className='text-start'
                  onClick={async () => {
                    const data = await addSelectedRecord(element.id);
                    setElements((elements) =>
                      elements.filter((e) => e.id !== element.id)
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
        <div className='h-[485px] overflow-y-hidden  w-1/2 flex flex-col'>
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
