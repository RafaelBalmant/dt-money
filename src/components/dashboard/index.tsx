import { Summary } from "../summary";
import { TransctionsTable } from "../transactionsTable";
import { Container } from "./styles";

export function Dashboard () {
  return (
    <Container>
      <Summary/>
      <TransctionsTable/>
    </Container>
  )
}