import styled from "styled-components";

interface AgeGateProps {
  handleVerify(verified: string): void;
  sessionVerified: string;
}

export function AgeGate({ handleVerify, sessionVerified }: AgeGateProps) {
  return (
    <Container>
      {sessionVerified === "false" && (
        <p>
          Unfortunately, you need to be over the age of 19 to access this
          website.
        </p>
      )}
      <p>Are you over the age of 19?</p>
      <div>
        <button onClick={() => handleVerify("false")}>0-18</button>
        <button onClick={() => handleVerify("true")}>19+</button>
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
