export function ListItem({
  record,
}: // innerRef,
{
  record: { id: number; name: string };
  // ref: (node?: Element | null) => void | undefined;
}) {
  // if (innerRef) {
  //   return (
  //     <li data-id={record.id} key={record.id} className='h-6' ref={innerRef}>
  //       {record.id} - {record.name}
  //     </li>
  //   );
  // } else {
  return (
    <li data-id={record.id} key={record.id} className='h-6'>
      {record.id} - {record.name}
    </li>
  );
  // }
}
