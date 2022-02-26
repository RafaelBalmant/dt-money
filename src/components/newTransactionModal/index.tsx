import { FormEvent, useState } from "react";
import Modal from "react-modal";
import income from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import { useTransaction } from "../../hooks/useTransactionsContext";
import { Container, Radiobox, TransactionTypeContainer } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const { createTransaction } = useTransaction();

  async function handleCreateNewTransaction(ev: FormEvent) {
    ev.preventDefault();
    await createTransaction({
      title,
      amount,
      category,
      type,
    });
    setTitle("");
    setCategory("");
    setAmount(0);
    setType("deposit");
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={(ev) => handleCreateNewTransaction(ev)}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Titulo"
          onChange={(ev) => setTitle(ev.target.value)}
          value={title}
        />
        <input
          type="number"
          placeholder="valor"
          onChange={(ev) => setAmount(Number(ev.target.value))}
          value={amount}
        />
        <TransactionTypeContainer>
          <Radiobox
            isActive={type === "deposit"}
            type="button"
            onClick={() => {
              setType("deposit");
            }}
            activeColor="green"
          >
            <img src={income} alt="entrada" />
            <span>Entrada</span>
          </Radiobox>
          <Radiobox
            isActive={type === "withdraw"}
            type="button"
            onClick={() => {
              setType("withdraw");
            }}
            activeColor="red"
          >
            <img src={outcome} alt="output" />
            <span>Saida</span>
          </Radiobox>
        </TransactionTypeContainer>
        <input
          type="text"
          placeholder="categoria"
          onChange={(ev) => setCategory(ev.target.value)}
          value={category}
        />
        <button type="submit">Enviar</button>
      </Container>
    </Modal>
  );
}
