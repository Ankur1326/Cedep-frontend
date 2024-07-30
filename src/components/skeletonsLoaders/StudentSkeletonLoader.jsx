import React from 'react';
import Skeleton from 'react-loading-skeleton';

const StudentSkeletonLoader = ({
  rowCount = 5,
  columnWidths = ['6%', '20%', '15%', '15%', '25%', '30%'], // Default percentage widths for each column
  rowHeight = 40,
  rowStyle = {},
  columnStyle = {}
}) => {
  const rows = Array.from({ length: rowCount }, (_, index) => index);

  return (
    <tbody className="divide-y divide-gray-100">
      {rows.map((row) => (
        <tr key={row} className="animate-pulse">
          {columnWidths.map((width, columnIndex) => (
            <td
              key={columnIndex}
              className="p-[7px] border-r"
              style={{ width: width, ...rowStyle }}
            >
              <Skeleton height={rowHeight} width="" style={{ ...columnStyle }} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default StudentSkeletonLoader;
