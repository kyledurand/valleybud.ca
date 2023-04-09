import styled from "styled-components";
import {Logo} from "./shared/svg/logo";

interface AgeGateProps {
  sessionVerified: string;
  onVerify(verified: string): void;
}

export function AgeGate({onVerify, sessionVerified}: AgeGateProps) {
  return (
    <Container>
      <Logo width={400} height={188} color="var(--text)" />
      {sessionVerified === "false" && (
        <ErrorText>
          Unfortunately, you need to be over the age of 19 to access this
          website.
        </ErrorText>
      )}
      <p style={{margin: 0}}>Are you over the age of 19?</p>
      <ButtonGroup>
        <Button onClick={() => onVerify("false")}>0-18</Button>
        <Button onClick={() => onVerify("true")}>19+</Button>
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-3);
  height: 100vh;
  padding: 0 var(--space-4);
`;

const ErrorText = styled.p`
  color: var(--text);
  background-color: var(--background-error);
  border-radius: var(--radius-1);
  margin: 0;
  padding: var(--space-4);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--space-1);

  button:first-child {
    border: 1px solid var(--brand-accent-orange);
  }

  button:last-child {
    border: 1px solid var(--brand-accent-blue);
  }
`;

const Button = styled.button`
  background-color: var(--button-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-1);
`;
