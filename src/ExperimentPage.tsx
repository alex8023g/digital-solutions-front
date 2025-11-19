import { Virtuoso } from 'react-virtuoso';
import { useState, useCallback, useEffect } from 'react';
import { getRecords } from './lib/getRecords';
import { Loading } from './components/Loading';

export function ExperimentPage() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  const loadMore = useCallback(async () => {
    const batchRecords = await getRecords(users.length);
    setUsers((users) => [...users, ...batchRecords]);
  }, [users]);

  useEffect(() => {
    const interval = setTimeout(async () => {
      await loadMore();
    }, 1000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <div className='h-[485px] overflow-y-auto'>
      <h1>Experiment Page 2</h1>
      <Virtuoso
        style={{ height: '100%' }}
        data={users}
        endReached={loadMore}
        increaseViewportBy={200}
        itemContent={(index, user) => {
          return (
            <div className='text-start'>
              {user.id} - {user.name}
            </div>
          );
        }}
        components={{ Footer: () => <Loading /> }}
      />
    </div>
  );
}
