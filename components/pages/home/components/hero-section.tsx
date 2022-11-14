import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export function HeroSection(): JSX.Element {
  return (
    <Container>
      <Link href="/shop">
        <Image src="/gday-bud.png" width={1480} height={492} />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  padding: var(--space-6);
  background-color: var(--brand-accent-blue);
`;
