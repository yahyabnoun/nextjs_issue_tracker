import { Container } from "@radix-ui/themes";
import Paginition from "./components/Paginition";


export default function Home() {
  return (
    < >
      <Container>
      
        <Paginition itemCount={10} pageSize={2} currentPage={1} />
      </Container>
        
    </>
  );
}
