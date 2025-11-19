export async function getRecords(index: number) {
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
}
