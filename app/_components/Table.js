"use client";
import { createContext, useContext } from "react";
const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="space-y-10 overflow-hidden">{children}</div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className={`rounded-4xl grid items-center border border-slate-300 px-10 py-6 text-sm font-medium capitalize tracking-wider text-black ${columns} py-4.5 gap-4 px-6`}
    >
      {children}
    </div>
  );
}

function Row({ children, onClick = () => {} }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      onClick={onClick}
      className={`rounded-4xl grid border border-slate-300 px-10 py-6 text-sm font-medium capitalize tracking-wider text-black ${columns} group gap-4 py-3 font-bold tracking-tight transition-all duration-200 hover:bg-white`}
    >
      {children}
    </div>
  );
}

function Body({ data, render, error }) {
  if (!data?.length) return <p>{error || "No data to show at the moment"}</p>;

  return <div className="space-y-10">{data?.map(render)}</div>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
