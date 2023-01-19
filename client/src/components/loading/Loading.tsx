import { Transition } from "react-transition-group";
import { useAppSelector } from "../../store";

import {
  LoadingSpinner,
  LoadingSpinnerContainer,
} from "../styles/UI/LoadingSpinner";

function Loading() {
  const show = useAppSelector((state) => state.loading.show);

  return (
    <Transition mountOnEnter unmountOnExit in={show} timeout={400}>
      <LoadingSpinnerContainer $show={show}>
        <LoadingSpinner />
      </LoadingSpinnerContainer>
    </Transition>
  );
}

export default Loading;
