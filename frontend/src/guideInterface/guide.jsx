import React, { useEffect } from "react";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportGenerator = () => {
  useEffect(() => {
    // Load saved status when page loads
    document.querySelectorAll(".student-detail").forEach((detail) => {
      const projectTitle = detail.querySelector(".project-title").textContent;
      const savedStatus = JSON.parse(localStorage.getItem(projectTitle));
      if (savedStatus) {
        const checkboxes = detail.querySelectorAll(".status-check");
        savedStatus.forEach((state, i) => (checkboxes[i].checked = state));
      }
    });
  }, []);

  const handleTrackClick = (e) => {
    const button = e.target;
    const statusSection = button.nextElementSibling;
    statusSection.style.display =
      statusSection.style.display === "block" ? "none" : "block";
  };

  const handleSaveStatus = (e) => {
    const button = e.target;
    const projectTitle = button
      .closest(".student-detail")
      .querySelector(".project-title").textContent;
    const checkboxes = button
      .closest(".status-section")
      .querySelectorAll(".status-check");
    const status = Array.from(checkboxes).map((cb) => cb.checked);
    localStorage.setItem(projectTitle, JSON.stringify(status));
    alert(`Status saved for "${projectTitle}"`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Project Details Report", 14, 20);

    let y = 30;
    const students = document.querySelectorAll(".student-detail");

    students.forEach((student, index) => {
      const projectTitle = student.querySelector(".project-title").innerText;
      const guideName = student.querySelector(".guide-name").innerText;
      const abstract = student.querySelector(".abstract").innerText;

      doc.setFontSize(14);
      doc.text(`Project ${index + 1}: ${projectTitle}`, 14, y);
      y += 8;
      doc.setFontSize(12);
      doc.text(`Year & Class: ${guideName}`, 14, y);
      y += 8;
      doc.text(`Students: ${abstract}`, 14, y);
      y += 8;

      const checkboxes = student.querySelectorAll(".status-check");
      const statuses = Array.from(checkboxes).map((cb) => ({
        label: cb.parentElement.innerText.trim(),
        done: cb.checked,
      }));

      doc.text("Status:", 14, y);
      y += 6;
      statuses.forEach((s) => {
        const symbol = s.done ? "✔️" : "❌";
        doc.text(`  ${symbol} ${s.label}`, 18, y);
        y += 6;
      });

      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("project_report.pdf");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">
        Student Project Details - Mrs. Mythili Sharvani
      </h2>

      <div id="studentDetails" className="mt-4">
        {/* Project 1 */}
        <div className="student-detail mb-4 p-3 border rounded">
          <h3>
            Project Title:{" "}
            <span className="project-title">AI-based Student Tracker</span>
          </h3>
          <p>
            Students:{" "}
            <span className="abstract">Anu, Sri, Lasya, Mouni</span>
          </p>
          <p>
            Year & Class: <span className="guide-name">IV, CSE-C</span>
          </p>
          <button className="btn btn-success track-btn" onClick={handleTrackClick}>
            Track Status
          </button>

          <div className="status-section mt-2" style={{ display: "none" }}>
            <h5>Project Progress</h5>
            <label>
              <input type="checkbox" className="status-check" /> Abstract
              Completed
            </label>
            <label>
              <input type="checkbox" className="status-check" /> Objective 1
              Completed
            </label>
            <label>
              <input type="checkbox" className="status-check" /> Objective 2
              Completed
            </label>
            <label>
              <input type="checkbox" className="status-check" /> Implementation
              Started
            </label>
            <label>
              <input type="checkbox" className="status-check" /> Final Report
              Submitted
            </label>
            <button className="btn btn-primary mt-2" onClick={handleSaveStatus}>
              Save Status
            </button>
          </div>
        </div>

        {/* Project 2 */}
        <div className="student-detail mb-4 p-3 border rounded">
          <h3>
            Project Title:{" "}
            <span className="project-title">Smart Healthcare System</span>
          </h3>
          <p>
            Students:{" "}
            <span className="abstract">Manu, Sai, Hasya, Siri</span>
          </p>
          <p>
            Year & Class: <span className="guide-name">III, CSE-C</span>
          </p>
          <button className="btn btn-success track-btn" onClick={handleTrackClick}>
            Track Status
          </button>

          <div className="status-section mt-2" style={{ display: "none" }}>
            <h5>Project Progress</h5>
            <label>
              <input type="checkbox" className="status-check" /> Abstract
              Completed
            </label>
            <label>
              <input type="checkbox" className="status-check" /> Objective 1
              Completed
            </label>
            <label>
              <input type="checkbox" className="status-check" /> Objective 2
              Completed
            </label>
            <label>
              <input type="checkbox" className="status-check" /> Implementation
              Started
            </label>
            <label>
              <input type="checkbox" className="status-check" /> Final Report
              Submitted
            </label>
            <button className="btn btn-primary mt-2" onClick={handleSaveStatus}>
              Save Status
            </button>
          </div>
        </div>
      </div>

      {/* Generate Report Button */}
      <button className="btn btn-dark mt-4" id="generateReport" onClick={generatePDF}>
        Generate Report
      </button>

      {/* Inline Styles */}
      <style>{`
        .status-section {
          background: #f8f9fa;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }
        .status-section label {
          display: block;
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default ReportGenerator;
