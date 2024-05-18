import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const rowsCount = 10;
const colCount = 6;

export function OrderTableSkeleton() {
  return (
    <SkeletonTheme highlightColor="#000">
      <TableSkeleton colCount={colCount} rowsCount={rowsCount} />
    </SkeletonTheme>
  );
}

type TableSkeletonProps = {
  colCount: number;
  rowsCount: number;
};

const TableSkeleton = ({ colCount, rowsCount }: TableSkeletonProps) => {
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
