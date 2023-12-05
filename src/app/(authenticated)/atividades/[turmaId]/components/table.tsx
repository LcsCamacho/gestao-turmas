"use client";
import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Atividade } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";
import { AtividadesServices } from "../services";
import AddAtividade from "./add-atividade";
import AddTurma from "./add-atividade";
import { columns } from "./data";
import { renderCell } from "./render-cell";

export interface AtividadeWithIndice extends Atividade {
  indice?: number;
}

interface TableAtividadesProps {
  atividades: Atividade[];
  turmaId: string;
}

export default function TableAtividades({
  atividades,
  turmaId,
}: TableAtividadesProps) {
  const [filterValue, setFilterValue] = useState("");
  const [atividadesState, setAtividades] =
    useState<AtividadeWithIndice[]>(atividades);
  const [page, setPage] = useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const rowsPerPage = 5;

  const refresh = useCallback(async () => {
    const turmas = await AtividadesServices.getAtividadesByTurmaId(turmaId);
    setAtividades(turmas.result);
  }, [turmaId]);

  const filteredItems = useMemo(() => {
    let filtered = atividadesState.map((atividade, index) => {
      atividade.indice = index + 1;
      return atividade;
    });

    if (hasSearchFilter) {
      filtered = filtered.filter((atividade) => {
        return atividade.titulo
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    }

    return filtered;
  }, [atividadesState, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Procurar por nome..."
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            size="sm"
          />
          <div className="flex gap-3">
            <AddAtividade turmaId={turmaId} refresh={refresh} />
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, turmaId, refresh, onClear]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <>
      <Table
        aria-label="Tabela de turmas"
        classNames={{
          wrapper: "max-h-[480px]",
        }}
        topContent={topContent}
        bottomContent={bottomContent}
        border={1}
        bottomContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={"start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Sem atividades cadastradas"} items={items}>
          {(item) => (
            <TableRow key={item.id} className="hover-bg-default ">
              {(columnKey) => {
                return (
                  <TableCell>
                    {renderCell({
                      atividade: item,
                      columnKey: columnKey as string,
                    })}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
