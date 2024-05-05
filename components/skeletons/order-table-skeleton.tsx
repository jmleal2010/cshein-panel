import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const rowsCount = 5;
const colCount = 3;

export default function OrderTableSkeleton() {
  return (
 
     <SkeletonTheme highlightColor="#fff">
       <TableSkeleton colCount={colCount} rowsCount={rowsCount} />
     </SkeletonTheme>
  );
}

const TableSkeleton = ({
  colCount,
  rowsCount,
}: {
  colCount: number;
  rowsCount: number;
}) => {
  const columns = Array.from({ length: colCount }, (_, i) => {
    return (
      <th key={i}>
        <h1 style={{ margin: "0px" }}>
          <Skeleton />
        </h1>
      </th>
    );
  });

  const rowColumns = Array.from({ length: colCount }, (_, i) => {
    return (
      <td key={i}>
        <Skeleton />
      </td>
    );
  });

  const rows = Array.from({ length: rowsCount }, (_, i) => {
    return <tr key={i}>{rowColumns}</tr>;
  });

  return (
    <table width="100%">
      <thead>
        <tr>{columns}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
