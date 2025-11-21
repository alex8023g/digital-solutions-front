import { getSelectedRecords } from '../lib/fetchers';
import type { Element } from '../HomePage';

export function FilterRight({
  setElements,
  setFilter,
}: {
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  setFilter: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  return (
    <div className='flex items-center gap-2 px-3'>
      <label
        htmlFor='filter-right'
        className='block text-sm/6 font-medium text-gray-900 dark:text-white'
      >
        Filter
      </label>
      <div className='w-full'>
        <input
          id='filter-right'
          name='filter-right'
          type='text'
          placeholder='id`s comma separated list (1, 3, 87, ...)'
          className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 o placeholder:text-gray-400 focus:outline-none  sm:text-sm/6 '
          onChange={async (e) => {
            const rawData = e.target.value.trim();
            const ids = rawData
              .split(',')
              .filter((id) => id.trim() !== '')
              .filter((id) => !isNaN(Number(id.trim())))
              .map((id) => Number(id.trim()))
              .filter((id) => !isNaN(id));
            const batchRecords2 = await getSelectedRecords({
              index: 0,
              filter: ids,
            });
            setElements(batchRecords2.data);
            setFilter(ids);
          }}
        />
      </div>
    </div>
  );
}
