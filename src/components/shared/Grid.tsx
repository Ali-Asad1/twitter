import Container from "./Container";

export default function Grid({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="h-full grid grid-cols-4">{children}</div>
    </Container>
  );
}
