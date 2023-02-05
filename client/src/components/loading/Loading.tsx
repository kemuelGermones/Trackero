import { Transition } from "react-transition-group";
import { useAppSelector } from "../../store";

import {
  CircleLoadingSpinner,
  CircleLoadingSpinnerContainer,
} from "../styles/UI/LoadingSpinner";

function Loading() {
  const show = useAppSelector((state) => state.loading.show);

  return (
    <Transition mountOnEnter unmountOnExit in={show} timeout={400}>
      <CircleLoadingSpinnerContainer $show={show}>
        <CircleLoadingSpinner />
      </CircleLoadingSpinnerContainer>
    </Transition>
  );
}

export default Loading;
