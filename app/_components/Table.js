"use client";
import { createContext, useContext } from "react";
const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <table className="w-full border-collapse border-spacing-0 overflow-hidden">
        {children}
      </table>
    </TableContext.Provider>
  );
}

function Header({ tableRows }) {
  const { columns } = useContext(TableContext);
  return (
    <thead className="block px-10 py-6 shadow-md">
      <tr
        className={`grid-cols-[${columns}] ${columns} py-4.5 grid w-full items-center gap-4 text-sm font-medium capitalize tracking-wider text-gray-800`}
      >
        {tableRows.map((th) => (
          <th key={th} scope="col" className="">
            {th}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Row({ children, onClick = () => {} }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      onClick={onClick}
      className={`grid items-center capitalize tracking-wider grid-cols-[${columns}] ${columns} group items-center gap-4 px-6 py-3 text-sm font-bold tracking-tight text-black transition-all duration-200 hover:bg-white`}
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data?.length)
    return (
      <tbody>
        <tr>
          <th scope="row">No data to show at the moment</th>
        </tr>
      </tbody>
    );

  return (
    <tbody className="divide-dashboard-border divide-y-[1px]">
      {data?.map(render)}
    </tbody>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
