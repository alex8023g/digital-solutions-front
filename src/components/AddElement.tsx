import { addNewRecord } from '../lib/fetchers';
import { toast } from 'sonner';
import { useState } from 'react';

export function AddElement() {
  const [id, setId] = useState<string>('');
  return (
    <div className='flex items-center gap-2 border-b border-gray-200 px-3'>
      <label
        htmlFor='filter-right'
        className='block w-28 text-sm/6 font-medium text-gray-900 dark:text-white'
      >
        add record
      </label>
      <div className='w-full'>
        <input
          id='filter-right'
          name='filter-right'
          type='text'
          placeholder='enter new id'
          className='o block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <button
        className='rounded-md bg-black px-4 py-1 text-white shadow-md'
        onClick={async () => {
          const id2 = Number(id.trim());
          if (isNaN(id2)) {
            return;
          }
          const res = await addNewRecord(id2);
          if (res.status === 'success') {
            toast.success(
              `Record id ${res.record.id} name ${res.record.name} added successfully`,
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
