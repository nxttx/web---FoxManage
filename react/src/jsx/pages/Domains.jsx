import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDomains } from "../../redux/actions";

function Domains(props) {
  const domains = useSelector((state) => state.domains);
  const dispatch = useDispatch();

  useEffect(() => {
    if (domains === -1) {
      dispatch(getDomains());
    } // eslint-disable-next-line
  }, [domains]);

  return (
    <>
      <h1 className="title">Domains</h1>
      {domains}
    </>
  );
}
export default Domains;
