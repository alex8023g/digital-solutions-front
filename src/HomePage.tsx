import { Virtuoso } from 'react-virtuoso';
import { useState, useCallback, useEffect } from 'react';
import { addSelectedRecord, getRecords, getSelectedRecords } from './lib/fetchers';
import { Loading } from './components/Loading';
import { DraggableList } from './DraggableList';

export type Element = { id: number; name: string };

export function HomePage() {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const loadMore = useCallback(async () => {
    console.log('🚀 ~ loadMore ~ start');
    const batchRecords = await getRecords(elements.length);
    setElements((elements) => [...elements, ...batchRecords]);
  }, [elements]);

  useEffect(() => {
    const interval = setTimeout(async () => {
      await loadMore();
      const selectedRecords = await getSelectedRecords();
      setSelectedElements(selectedRecords);
    });
    return () => clearTimeout(interval);
  }, []);

  return (
    <div className=''>
      <h1>Experiment Page 2</h1>

      <div className=' border flex'>
        <div className='h-[485px] overflow-y-auto border w-1/2'>
          <div className=' border'>
            <div className='border'>Filter</div>
            <div className='border'>add element</div>
          </div>
          <Virtuoso
            style={{ height: '100%' }}
            data={elements}
            endReached={loadMore}
            increaseViewportBy={200}
            itemContent={(index, element) => {
              return (
                <div
                  className='text-start'
                  onClick={async () => {
                    await addSelectedRecord(element.id);
                    setElements((elements) =>
                      elements.filter((e) => e.id !== element.id)
                    );
                    setSelectedElements((selectedElements) => [
                      ...selectedElements,
                      element,
                    ]);
                  }}
                >
                  {element.id} - {element.name}
                </div>
              );
            }}
            components={{ Footer: () => <Loading /> }}
          />
        </div>
        <div className='h-[485px] overflow-y-auto border w-1/2'>
          <div className=' border'>
            <div className='border'>Filter</div>
          </div>
          <DraggableList items={selectedElements} setItems={setSelectedElements} />
        </div>
      </div>
    </div>
  );
}
