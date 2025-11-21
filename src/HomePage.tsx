import { Virtuoso } from 'react-virtuoso';
import { useState, useCallback, useEffect } from 'react';
import { addSelectedRecord, getRecords } from './lib/fetchers';
import { DraggableList } from './components/DraggableList';
import { FilterLeft } from './components/FilterLeft';
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
            <div className='border px-3'>add element</div>
          </div>
          <Virtuoso
            style={{ height: '100%', padding: '10px', border: '1px solid red' }}
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
            // components={{ Footer: () => <Loading /> }}
          />
        </div>
        <div className='h-[485px] overflow-y-hidden border w-1/2 border-red-500 flex flex-col'>
          <div className='border'>Filter</div>
          <DraggableList
            items={selectedElements}
            setItems={setSelectedElements}
            elements={elements}
            setElements={setElements}
          />
        </div>
      </div>
    </div>
  );
}
