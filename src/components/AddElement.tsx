import { addNewRecord } from '../lib/fetchers';
import { toast } from 'sonner';
import { useState } from 'react';

export function AddElement() {
  const [id, setId] = useState<string>('');
  return (
    <div className='flex items-center gap-2 px-3 border'>
      <label
        htmlFor='filter-right'
        className='block text-sm/6 font-medium text-gray-900 dark:text-white w-28'
      >
        add record
      </label>
      <div className='w-full'>
        <input
          id='filter-right'
          name='filter-right'
          type='text'
          placeholder='enter new id'
          className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 o placeholder:text-gray-400 focus:outline-none  sm:text-sm/6 '
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <button
        className='bg-blue-500 text-white px-4 py-1 rounded-md'
        onClick={async () => {
          const id2 = Number(id.trim());
          if (isNaN(id2)) {
            return;
          }
          const res = await addNewRecord(id2);
          if (res.status === 'success') {
            toast.success(
              `Record id ${res.record.id} name ${res.record.name} added successfully`
            );
          } else if (res.status === 'error') {
            toast.error(res.message);
          }
        }}
      >
        add
      </button>
    </div>
  );
}
