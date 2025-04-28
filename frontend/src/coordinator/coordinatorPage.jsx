import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GuideActions = () => {
  return (
    <div className="container vh-100 d-flex flex-column bg-light">
      <h2 className="text-center mt-4 mb-5 text-dark">Coordinator</h2>
      <div className="d-flex flex-column align-items-center">
      <div className="d-flex align-items-center gap-3 mb-3">
          <button className="btn btn-dark btn-lg">2 YR 2 SEMESTER</button>
          <button className="btn btn-outline-dark btn-lg">Generate Report</button>
        </div>
        <div className="d-flex align-items-center gap-3 mb-3">
          <button className="btn btn-dark btn-lg">3 YR 3 SEMESTER</button>
          <button className="btn btn-outline-dark btn-lg">Generate Report</button>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-dark btn-lg">4 YR 4 SEMESTER</button>
          <button className="btn btn-outline-dark btn-lg">Generate Report</button>
        </div>
      </div>
    </div>
  );
};

export default GuideActions;
