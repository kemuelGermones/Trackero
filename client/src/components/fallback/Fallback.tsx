import Backdrop from "../styles/UI/Backdrop";
import { SquareLoadingSpinner } from "../styles/UI/LoadingSpinner";

function Fallback() {
  return (
    <Backdrop $hasBackground={false}>
      <SquareLoadingSpinner />
    </Backdrop>
  );
}

export default Fallback;
