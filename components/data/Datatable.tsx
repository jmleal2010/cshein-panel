import React, { Fragment } from "react";
import { columnType, dataType } from "../../interfaces";
import Paginator from "@/components/navigation/paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Datatable({
  columns,
  data,
  onView,
}: Readonly<{
  columns: columnType[];
  data: dataType[];
  onView?: (id: string) => void;
}>) {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            {columns.map((column: columnType, i: number) => (
              <th
                key={i}
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item: dataType | any, i: number) => (
            <tr key={i} className="mx-6 items-center">
              {columns.map((column: columnType, j: number) =>
                column.name ? (
                  <Fragment key={j}>
                    {column.type === "link" ? (
                      <td
                        key={j}
                        className="relative py-4 pr-3 text-sm sm:pl-6"
                      >
                        <a
                          href={item[column.name]}
                          className="text-blue-500 hover:text-blue-700"
                          target="_blank"
                        >
                          Ver
                        </a>
                      </td>
                    ) : column.type === "image" ? (
                      <td
                        key={j}
                        className="relative py-4 pr-3 text-sm sm:pl-6"
                      >
                        <Image
                          src={item[column.name]}
                          alt={column.name}
                          width={80}
                          height={80}
                        />
                      </td>
                    ) : (
                      <td
                        key={j}
                        className="relative py-4 pr-3 text-sm sm:pl-6"
                      >
                        {item[column.name]}
                      </td>
                    )}
                  </Fragment>
                ) : (
                  <td key={j}>
                    <div className="flex flex-row items-center">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="cursor-pointer text-green-500"
                        onClick={() => onView!(item.id)}
                      />
                    </div>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator />
    </>
  );
}
