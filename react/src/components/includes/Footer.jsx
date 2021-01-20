import React from 'react';

/**
 * Build the footer
 *
 * @author Robert Boudewijn
 * @date 2021/01/20
 * @param {*} props
 * @return {JSX} JSX 
 */
function Footer(props) {

  return (
    <footer className="footer has-background-light">
      <div className="content has-text-centered">
        <p>
          <strong>FoxManage</strong> by <a href="https://robertboudewijn.nl">Robert Boudewijn</a>. The source code is licensed
      <a href="https://opensource.org/licenses/BSD-2-Clause">BSD</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.<br />
      Copyright 2021 Robert Boudewijn
    </p>
      </div>
    </footer>
  );
}
export default Footer;