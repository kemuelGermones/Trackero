import Backdrop from "../styles/UI/Backdrop";
import { LoadingSpinner } from "../styles/UI/LoadingSpinner";

function Fallback() {
  return (
    <Backdrop $hasBackground={false}>
      <LoadingSpinner />
    </Backdrop>
  );
}

export default Fallback;
