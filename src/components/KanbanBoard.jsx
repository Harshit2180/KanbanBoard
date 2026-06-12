import React, { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import ColumnContainer from "./ColumnContainer";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  console.log(columns);

  const createNewColumn = () => {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 1001);
  };

  const deleteColumn = (id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  };

  const onDragStart = () => {

  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext onDragStart={onDragStart}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} />
              ))}
            </SortableContext>
          </div>
          <button onClick={() => createNewColumn()} className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-[#0D117] border-2 border-[161C22] p-4 ring-rose-500 hover:ring-2 flex gap-2">
            <PlusIcon /> Add Column
          </button>
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
