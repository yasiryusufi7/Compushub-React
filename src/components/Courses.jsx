import { useEffect, useState } from "react";
import { getCourses } from "../services/courseApi";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchCourses() {
      try {
        const response = await getCourses();

        if (!Array.isArray(response.data)) {
          throw new Error("The courses response is not an array.");
        }

        if (!ignore) {
          setCourses(response.data);
        }
      } catch (requestError) {
        if (!ignore) {
          setError("Unable to load courses. Check the backend and try again.");
          console.error("Error loading courses:", requestError);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchCourses();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section aria-labelledby="courses-heading">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-2 mb-4">
        <div>
          <p className="text-uppercase small fw-semibold text-primary mb-1">
            Academic catalog
          </p>
          <h1 id="courses-heading" className="h2 mb-1">
            Course Management
          </h1>
          <p className="text-secondary mb-0">
            Courses loaded from the CompusHub Spring Boot API.
          </p>
        </div>
        {!loading && !error && (
          <span className="badge rounded-pill text-bg-primary fs-6 align-self-start align-self-sm-auto">
            {courses.length} {courses.length === 1 ? "course" : "courses"}
          </span>
        )}
      </div>

      {loading && (
        <div className="d-flex align-items-center gap-2 py-4" role="status">
          <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true" />
          <span>Loading courses...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="alert alert-info" role="status">
          No courses available.
        </div>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-bottom py-3">
            <h2 className="h5 mb-0">Course List</h2>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Code</th>
                    <th scope="col">Title</th>
                    <th scope="col">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.id}</td>
                      <td className="fw-semibold">{course.code}</td>
                      <td>{course.title}</td>
                      <td>{course.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Courses;
