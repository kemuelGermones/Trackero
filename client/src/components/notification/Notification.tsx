import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Transition } from "react-transition-group";
import { useAppSelector, useAppDispatch } from "../../store";
import {
  Notif,
  NotifHeader,
  NotifBody,
  NotifTitle,
  NotifDescription,
  NotifCloseButton
} from "../styles/UI/Notif";
import { hideNotif } from "../../store/notification-slice";

let timer: number;

function Notification() {
  const { message, title, show } = useAppSelector(
    (state) => state.notification
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    timer = setTimeout(() => {
      dispatch(hideNotif());
    }, 3000);

    return () => {
      clearTimeout(timer);
    }
  }, [show]);

  const closeNotifHandler = () => {
    clearTimeout(timer);
    dispatch(hideNotif());
  }

  return (
    <Transition mountOnEnter unmountOnExit in={show} timeout={400}>
      <Notif $show={show}>
        <NotifHeader $isError={title === "error"}/>
        <NotifBody>
          <NotifTitle>
            <h1>{title}</h1>
            <NotifCloseButton onClick={closeNotifHandler}/>
          </NotifTitle>
          <NotifDescription>
            {message}
          </NotifDescription>
        </NotifBody>
      </Notif>
    </Transition>
  );
}

export default Notification;
