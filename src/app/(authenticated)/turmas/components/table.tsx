"use client";
import { NotificationError } from "@/components/notification-error";
import { NotificationSuccess } from "@/components/notification-success";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { Turma } from "@prisma/client";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useMemo, useState } from "react";
import { TurmasServices } from "../services";
import AddTurma from "./add-turma";
import { columns } from "./data";
import { renderCell } from "./render-cell";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

interface TableTurmasProps {
  turmas: Turma[];
}

export default function TableTurmas({ turmas }: TableTurmasProps) {
  const [filterValue, setFilterValue] = useState("");
  const [turmasState, setTurmas] = useState<Turma[]>(turmas);
  const [page, setPage] = useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const rowsPerPage = 5;
  const { data: session } = useSession();
  const [successText, setSuccessText] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [turmaId, setTurmaId] = useState<number | undefined>(undefined);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const refresh = useCallback(async () => {
    try {
      const turmas = await TurmasServices.getTurmasByProfessorEmail(
        session?.user?.email!
      );
      setTurmas(turmas.result);
    } catch (error) {
      setTurmas([]);
      console.log(error);
      setError(true);
      if (error instanceof AxiosError) {
        setErrorText(error.response?.data?.message);
      }
    } finally {
      setTimeout(() => {
        setError(false);
        setErrorText("");
      }, 5000);
    }
  }, [session]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...turmasState];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nome.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [turmasState, hasSearchFilter, filterValue]);

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

  const onDelete = useCallback((id: number) => {
    onOpen();
    setTurmaId(id);
  }, []);

  const handleDeleteTurma = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        const response = await TurmasServices.deleteTurma(id!);
        if (response.code === 204) {
          await refresh();
          setSuccess(true);
          setSuccessText("Turma deletada com sucesso!");
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setErrorText(
          error instanceof AxiosError
            ? error.response?.data?.message
            : "Erro ao deletar turma"
        );
      } finally {
        setLoading(false);
        setTimeout(() => {
          setError(false);
          setErrorText("");
          setSuccess(false);
          setSuccessText("");
        }, 5000);
      }
    },
    [refresh]
  );

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
            <AddTurma refresh={refresh} />
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, refresh]);

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
      {success && <NotificationSuccess text={successText} />}
      {error && <NotificationError text={errorText} />}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-full  max-h-[600px] max-w-[90vw] md:max-w-md"
        classNames={{
          wrapper: "items-center justify-center",
        }}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>Deletar turma</ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <p className="text-start text-lg">
                      Você tem certeza que deseja deletar essa turma?
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter className="ml-auto">
                  <Button color="default" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    color="danger"
                    onPress={async () => {
                      await handleDeleteTurma(turmaId!);
                      onClose();
                    }}
                    isLoading={loading}
                    disabled={success}
                  >
                    {success ? (
                      <div className="text-white w-full gap-2 flex-1 flex justify-center items-center px-4">
                        Sucesso <FaCheckCircle size={18} color="white" />
                      </div>
                    ) : (
                      <div className="text-white w-full gap-2 flex-1 flex justify-center items-center">
                        Deletar
                      </div>
                    )}
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
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
        <TableBody emptyContent={"Sem turmas cadastradas"} items={items}>
          {(item) => (
            <TableRow key={item.id} className="hover-bg-default ">
              {(columnKey) => {
                if (loading)
                  return (
                    <TableCell>
                      <div className="animate-pulse bg-default-100 rounded h-6"></div>
                    </TableCell>
                  );
                return (
                  <TableCell>
                    {renderCell({
                      turma: item,
                      columnKey: columnKey as string,
                      loading,
                      onDelete,
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
