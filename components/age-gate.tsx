import styled from "styled-components";
import { Logo } from "./shared/svg/logo";

interface AgeGateProps {
  onVerify(verified: string): void;
  sessionVerified: string;
}

export function AgeGate({ onVerify, sessionVerified }: AgeGateProps) {
  return (
    <Container>
      <Logo width={400} height={188} color="var(--text)" />
      {sessionVerified === "false" && (
        <p>
          Unfortunately, you need to be over the age of 19 to access this
          website.
        </p>
      )}
      <p>Are you over the age of 19?</p>
      <div>
        <button onClick={() => onVerify("false")}>0-18</button>
        <button onClick={() => onVerify("true")}>19+</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
