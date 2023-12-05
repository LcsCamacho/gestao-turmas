"use client";
import { NotificationError } from "@/components/notification-error";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { AtividadesServices } from "../services";

export default function AddAtividade({
  refresh,
  turmaId,
}: {
  refresh: () => Promise<void>;
  turmaId: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const descricaoRef = useRef<HTMLInputElement>(null);
  const tituloRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleAddAtividade = async (e: FormEvent) => {
    e.preventDefault();
    const descricao = descricaoRef.current?.value;
    const titulo = tituloRef.current?.value;
    try {
      if (!descricao || !titulo)
        throw new Error("Campos obrigatórios não preenchidos");
      setLoading(true);
      const response = await AtividadesServices.createAtividade({
        descricao,
        titulo,
        turmaId: turmaId,
      });
      if (response.code === 201) {
        await refresh();
        setSuccess(true);
      }
    } catch (error: any) {
      setError(true);
      setErrorText(error.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setErrorText("");
        setError(false);
      }, 5000);
    }
  };
  const handleClose = () => {
    setSuccess(false);
    setError(false);
    setErrorText("");
  };

  return (
    <>
      {error && <NotificationError text={errorText} />}

      <Button onClick={() => onOpen()} color="primary">
        Adicionar <BsPlus size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-full  max-h-[600px] max-w-[90vw] md:max-w-md"
        closeButton
        onClose={handleClose}
        classNames={{
          wrapper: "items-center justify-center",
        }}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>Adicionar Atividade</ModalHeader>
                <ModalBody>
                  <form
                    id="form-add-atividade"
                    className="flex flex-col gap-4"
                    onSubmit={handleAddAtividade}
                  >
                    <Input
                      required
                      isRequired
                      ref={tituloRef}
                      placeholder="Titulo"
                    />
                    <Input
                      required
                      isRequired
                      ref={descricaoRef}
                      placeholder="Descricao"
                    />
                  </form>
                </ModalBody>
                <ModalFooter className="ml-auto">
                  <Button
                    form="form-add-atividade"
                    type="reset"
                    color="danger"
                    onClick={() => {
                      onClose();
                      handleClose();
                    }}
                    variant="light"
                  >
                    Fechar
                  </Button>
                  <Button
                    form="form-add-atividade"
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
