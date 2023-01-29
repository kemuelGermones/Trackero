import { useEffect } from "react";
import { Transition } from "react-transition-group";
import { useAppSelector, useAppDispatch } from "../../store";
import { hideNotif } from "../../store/notification-slice";

import {
  Notif,
  NotifHeader,
  NotifBody,
  NotifTitle,
  NotifDescription,
  NotifCloseButton,
} from "../styles/UI/Notif";

let timer: number;

function Notification() {
  const { message, title, show } = useAppSelector(
    (state) => state.notification
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (show) {
      timer = setTimeout(() => {
        dispatch(hideNotif());
      }, 3000);
    } else {
      clearTimeout(timer);
    }
  }, [show]);

  const closeNotifHandler = () => {
    dispatch(hideNotif());
  };

  return (
    <Transition mountOnEnter unmountOnExit in={show} timeout={400}>
      <Notif $show={show}>
        <NotifHeader $isError={title === "error"} />
        <NotifBody>
          <NotifTitle>
            <h1>{title}</h1>
            <NotifCloseButton onClick={closeNotifHandler} />
          </NotifTitle>
          <NotifDescription>{message}</NotifDescription>
        </NotifBody>
      </Notif>
    </Transition>
  );
}

export default Notification;
