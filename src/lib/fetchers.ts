import type { Element } from '../HomePage';

const host = import.meta.env.HOST || 'http://localhost';
const port = import.meta.env.PORT || 3000;
const baseUrl = `${host}:${port}/api/v1`;

export async function getRecords({
  index,
  filter,
}: {
  index: number;
  filter: number[];
}) {
  console.log('🚀 ~ getRecords ~ start, index:', index);
  try {
    const response = await fetch(`${baseUrl}/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index, filter }),
    });
    const data: { id: number; name: string }[] = await response.json();
    console.log('🚀 ~ getRecords ~ data:', data);
    return data;
  } catch (error) {
    console.error('🚀 ~ getRecords ~ error:', error);
    return [];
  }
}

export async function getSelectedRecords({
  index,
  filter,
}: {
  index: number;
  filter: number[];
}) {
  try {
    const response = await fetch(`${baseUrl}/selected-records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index, filter }),
    });
    const data: { id: number; name: string }[] = await response.json();
    console.log('🚀 ~ getSelectedRecords ~ data:', data);
    return { data, hasMore: data.length === 20 };
  } catch (error) {
    console.error('🚀 ~ getSelectedRecords ~ error:', error);
    return { data: [], hasMore: false };
  }
}

export async function saveSelectedOrder({
  records,
  filter,
}: {
  records: { id: number; name: string }[];
  filter: number[];
}) {
  console.log('🚀 ~ setSelectedRecords ~ records:', records);
  try {
    const res = await fetch(`${baseUrl}/save-selected-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ records, filter }),
    });
    console.log('🚀 ~ setSelectedRecords ~ res:', res);
  } catch (error) {
    console.error('🚀 ~ setSelectedRecords ~ error:', error);
    return [];
  }
}

export async function addSelectedRecord(id: number) {
  try {
    const response = await fetch(`${baseUrl}/add-selected-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data: { id: number; name: string }[] = await response.json();
    console.log('🚀 ~ addRecord ~ data:', data);
    return data;
  } catch (error) {
    console.error('🚀 ~ addRecord ~ error:', error);
    return [];
  }
}

export async function removeSelectedRecord(id: number) {
  try {
    const response = await fetch(`${baseUrl}/remove-selected-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data: { status: string } = await response.json();
    if (data.status !== 'ok') {
      console.error(
        '🚀 ~ removeSelectedRecord ~ error:',
        'Failed to remove record',
      );
    }
  } catch (error) {
    console.error('🚀 ~ addRecord ~ error:', error);
    return [];
  }
}

type ResponseT =
  | {
      status: 'error';
      message: string;
    }
  | {
      status: 'success';
      record: Element;
    };

export async function addNewRecord(id: number) {
  try {
    const response = await fetch(`${baseUrl}/add-new-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const res: ResponseT = await response.json();
    console.log('🚀 ~ addRecord ~ res:', res);
    return res;
  } catch (error) {
    console.error('🚀 ~ addRecord ~ error:', error);
    const res: ResponseT = { status: 'error', message: 'Failed to add record' };
    return res;
  }
}
