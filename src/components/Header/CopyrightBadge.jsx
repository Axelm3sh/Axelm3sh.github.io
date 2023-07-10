// CopyrightBadge.jsx

import React, { useState, useEffect } from 'react';

const CopyrightBadge = (props) => {
  const [copyright, setCopyright] = useState("");
  const START_YEAR = 2019;  // Define this ideally in a constants file

  useEffect(() => { // Similar to componentDidMount() in a class
    createCopyright();
  }, []);  // Empty array means this effect runs once on mount

  const createCopyright = async () => {
    // If an API call is needed:
    // const data = await yourAPICall();

    const currYear = new Date().getFullYear();
    const stringCopyright = "\u00A9 " + START_YEAR + (currYear > START_YEAR ? 
      "-" + currYear : "") + ", Daniel Phan";
    
    setCopyright(stringCopyright);
  };

  return (
    <div id="timestamp" className="badge">
      { copyright }
    </div>
  );
};

export default CopyrightBadge;