import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMailboxes } from "../../redux/actions";

function Mailboxes(props) {
  const mailboxes = useSelector((state) => state.mailboxes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mailboxes === -1) {
      dispatch(getMailboxes());
    }
    // eslint-disable-next-line
  }, [mailboxes]);

  return (
    <>
      <h1 className="title">Mailboxes</h1>
      {mailboxes}
    </>
  );
}
export default Mailboxes;
