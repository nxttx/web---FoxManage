import React, { useState, useEffect } from "react"; //
import { connect } from "react-redux";
import { setUsedData, getUsedData } from "../../redux/actions";
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/**
 * Returns the aside for all pages.
 *
 * @author Robert Boudewijn
 * @date 2021/01/20
 * @param {*} props
 * @return {JSX} jsx
 */
function Aside(props) {
  const [usedDataText, setUsedDataText] = useState("Loading...");
  const [usedDataSliderValue, setUsedDataSliderValue] = useState("");
  const [usedDataSliderMax, setUsedDataSliderMax] = useState(100);
  const [usedDataSliderClass, setUsedDataSliderClass] = useState(
    "progress is-primary"
  );

  useEffect(() => {
    /**
     *  This functions handles the used data of the user.
     *  @author Robert Boudewijn
     *  @date 2020-01-17
     *  @async
     */
    async function handleUsedData() {
      if (props.usedData !== -1) {
        if (props.usedData.status === 200) {
          setUsedDataText(
            props.usedData.usedDirSize +
              " / " +
              props.usedData.maxDirSize +
              " MB"
          );
          setUsedDataSliderMax(props.usedData.maxDirSize);
          setUsedDataSliderValue(props.usedData.usedDirSize);

          let percentage =
            (props.usedData.usedDirSize / props.usedData.maxDirSize) * 100;
          if (percentage > 90) {
            setUsedDataSliderClass("progress is-danger");
          } else if (percentage > 75) {
            setUsedDataSliderClass("progress is-warning");
          }
        } else if (props.usedData.status === 401) {
          //nothing user is not logged on so...
        } else {
          setUsedDataSliderValue(100);
          setUsedDataSliderClass("progress");
          setUsedDataText("Request error.");
        }
      }
    }
    handleUsedData();
  }, [props.usedData]);

  /**
   * This function makes sure to start fetching the used data.
   *
   * @author Robert Boudewijn
   * @date 2021/02/04
   * @param {}
   * @return {}
   */
  useEffect(() => {
    props.getUsedData();
    // eslint-disable-next-line
  }, [props.IP]);

  /**
   *  Returns the correct progress component
   *
   * @author Robert Boudewijn
   * @date 2021/01/19
   * @return {JSX} jsx
   */
  function dataSlider() {
    if (usedDataSliderValue !== "") {
      return (
        <progress
          id="usedDataSlider"
          className={usedDataSliderClass}
          max={usedDataSliderMax}
          value={usedDataSliderValue}
        />
      );
    } else {
      return (
        <progress
          id="usedDataSlider"
          className={usedDataSliderClass}
          max={usedDataSliderMax}
        />
      );
    }
  }

  return (
    <aside className="menu">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/Facturen">Facturen</Link>
        </li>
        <li>
          <Link to="/Domains">Domains</Link>
        </li>
        <li>
          <Link to="/Databases">Databases</Link>
        </li>
        <li>
          <Link to="/Mailboxes">MailBoxes</Link>
        </li>
      </ul>
      <p className="menu-label">Data usage:</p>
      {dataSlider()}
      <p id="usedDataText">{usedDataText}</p>
    </aside>
  );
}

const mapStateToProps = (state) => {
  return { usedData: state.usedData };
};

export default connect(mapStateToProps, { setUsedData, getUsedData })(Aside);
