import { IoClose } from "react-icons/io5";
import { Transition } from "react-transition-group";
import { useAppSelector, useAppDispatch } from "../../store";
import {
  Notif,
  NotifHeader,
  NotifBody,
  NotifTitle,
  NotifDescription,
} from "../styles/UI/Notif";
import { hideNotif } from "../../store/notification-slice";

function Notification() {
  const { message, title, show } = useAppSelector(
    (state) => state.notification
  );
  const dispatch = useAppDispatch()

  const closeNotifHandler = () => {
    dispatch(hideNotif());
  }

  return (
    <Transition mountOnEnter unmountOnExit in={show} timeout={400}>
      <Notif $show={show}>
        <NotifHeader $isError={title === "error"}/>
        <NotifBody>
          <NotifTitle>
            <h1>{title}</h1>
            <IoClose onClick={closeNotifHandler}/>
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
