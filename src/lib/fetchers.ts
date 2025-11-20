export async function getRecords(index: number) {
  console.log('🚀 ~ getRecords ~ start, index:', index);
  try {
    const response = await fetch('http://localhost:3000/api/v1/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index }),
    });
    const data: { id: number; name: string }[] = await response.json();
    console.log('🚀 ~ getRecords ~ data:', data);
    return data;
  } catch (error) {
    console.error('🚀 ~ getRecords ~ error:', error);
    return [];
  }
}

export async function getSelectedRecords(index: number) {
  try {
    const response = await fetch('http://localhost:3000/api/v1/selected-records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index }),
    });
    const data: { id: number; name: string }[] = await response.json();
    console.log('🚀 ~ getSelectedRecords ~ data:', data);
    return data;
  } catch (error) {
    console.error('🚀 ~ getSelectedRecords ~ error:', error);
    return [];
  }
}

export async function setSelectedRecords(records: { id: number; name: string }[]) {
  console.log('🚀 ~ setSelectedRecords ~ records:', records);
  try {
    const res = await fetch('http://localhost:3000/api/v1/set-selected-records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ records }),
    });
    console.log('🚀 ~ setSelectedRecords ~ res:', res);
  } catch (error) {
    console.error('🚀 ~ setSelectedRecords ~ error:', error);
    return [];
  }
}

export async function addSelectedRecord(id: number) {
  try {
    const response = await fetch('http://localhost:3000/api/v1/add-selected-record', {
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
