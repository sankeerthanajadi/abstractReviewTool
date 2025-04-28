import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GuideDashboard = () => {
  const guideName = "Mrs G. Mythili Sharvani";
  const [projects, setProjects] = useState([
    {
      id: 1,
      groupName: "Automated Abstract Review Tool",
      teamMembers: ["Aarushi", "Ishita", "Meera"],
      abstractLink: "https://example.com/ai_research",
      submissionDate: "2024-02-01T10:30:00Z",
      year: "3rd",
      semester: "6th",
    },
    {
      id: 2,
      groupName: "Blockchain Innovators",
      teamMembers: ["Riya", "Sneha", "Tanvi"],
      abstractLink: "https://example.com/blockchain_innovators",
      submissionDate: "2024-01-25T15:45:00Z",
      year: "2nd",
      semester: "4th",
    },
    {
      id: 3,
      groupName: "Exoplanet Detection using Machine Learning",
      teamMembers: ["Pooja", "Ananya", "Neha"],
      abstractLink: "https://example.com/quantum_computing",
      submissionDate: "2024-03-10T08:20:00Z",
      year: "3rd",
      semester: "5th",
    },
  ]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Guide - {guideName}</h1>
      <div className="table-responsive bg-light shadow p-4 rounded">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Project Group</th>
              <th>Team Members</th>
              <th>Abstract</th>
              <th>Submission Date</th>
              <th>Year</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.groupName}</td>
                  <td>{project.teamMembers.join(", ")}</td>
                  <td>
                    <a
                      href={project.abstractLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      View Abstract
                    </a>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }).format(new Date(project.submissionDate))}
                  </td>
                  <td>{project.year}</td>
                  <td>{project.semester}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No projects available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuideDashboard;
