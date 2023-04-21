//webapp/src/components/ClaimForm.js

import React, { useState } from "react";

const ClaimForm = ({ onSubmit, disabled }) => {
  const [nric, setNric] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(nric);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nric" className="form-label">
          NRIC:
        </label>
        <input
          type="text"
          id="nric"
          value={nric}
          onChange={(event) => setNric(event.target.value)}
          required
          className="form-input"
        />
      </div>

      <button type="submit" disabled={disabled} className="form-btn">
        Submit
      </button>
    </form>
  );
};

export default ClaimForm;

