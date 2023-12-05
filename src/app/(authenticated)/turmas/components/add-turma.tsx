"use client";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import { BsPlus } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { TurmasServices } from "../services";
import { FormEvent, useRef, useState } from "react";
import { NotificationError } from "../../../../components/notification-error";
import { NotificationSuccess } from "../../../../components/notification-success";
import { FaCheckCircle } from "react-icons/fa";

export default function AddTurma({
  refresh,
}: {
  refresh: () => Promise<void>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const turmaRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleAddTurma = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await TurmasServices.createTurma(
        turmaRef.current?.value!,
        session?.user?.email!
      );
      if (response.code === 201) {
        await refresh();
        setSuccess(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(false);
        setSuccess(false);
      }, 5000);
    }
  };

  return (
    <>
      {error && <NotificationError text="Erro ao adicionar turma" />}
      {/* {success && <NotificationSuccess text="Turma adicionada com sucesso!" />} */}

      <Button onClick={() => onOpen()} color="primary">
        Adicionar <BsPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-full  max-h-[600px] max-w-[90vw] md:max-w-md"
        closeButton
        classNames={{
          wrapper: "items-center justify-center",
        }}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>Adicionar Turma</ModalHeader>
                <ModalBody>
                  <form id="form-add-turma" onSubmit={handleAddTurma}>
                    <Input
                      required
                      isRequired
                      ref={turmaRef}
                      placeholder="Nome da turma"
                    />
                  </form>
                </ModalBody>
                <ModalFooter className="ml-auto">
                  <Button
                    form="form-add-turma"
                    type="reset"
                    color="danger"
                    onClick={() => {
                      onClose();
                    }}
                    variant="light"
                  >
                    Fechar
                  </Button>
                  <Button
                    form="form-add-turma"
                    className="w-fit"
                    type="submit"
                    color={success ? "success" : "primary"}
                    isLoading={loading}
                    isIconOnly={success}
                    disabled={loading || success}
                  >
                    {success ? (
                      <div className="text-white w-full gap-2 flex-1 flex justify-center items-center px-4">
                        Sucesso <FaCheckCircle size={18} color="white" />
                      </div>
                    ) : (
                      "Adicionar"
                    )}
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
