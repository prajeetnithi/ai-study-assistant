 "use client";

import { useEffect, useState } from "react";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) {
          throw new Error("Failed to load courses");
        }
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        setError(err.message || "Could not fetch courses");
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  async function handleSelectCourse(courseId) {
    setSelectedCourseId(courseId);
    setMaterials([]);
    setAssignments([]);

    try {
      const [materialsRes, assignmentsRes] = await Promise.all([
        fetch(`/api/courses/materials?courseId=${courseId}`),
        fetch(`/api/courses/assignments?courseId=${courseId}`),
      ]);

      if (materialsRes.ok) {
        const data = await materialsRes.json();
        setMaterials(data.materials || []);
      }

      if (assignmentsRes.ok) {
        const data = await assignmentsRes.json();
        setAssignments(data.assignments || []);
      }
    } catch {
      // ignore for now
    }
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
        Loading courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-xs text-red-400">
        {error}
        <p className="mt-1 text-[10px] text-zinc-500">
          Make sure you configured Google Classroom API and scopes.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1 text-sm">
      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course.id}>
            <button
              type="button"
              onClick={() => handleSelectCourse(course.id)}
              className={`flex w-full flex-col rounded-2xl border px-4 py-3 text-left text-sm transition shadow-sm ${
                selectedCourseId === course.id
                  ? "border-sky-500/60 bg-sky-500/10"
                  : "border-zinc-800 bg-zinc-900/70 hover:border-zinc-700 hover:bg-zinc-900"
              }`}
            >
              <span className="font-semibold text-zinc-100">
                {course.name || "Untitled course"}
              </span>
              {course.section && (
                <span className="text-xs text-zinc-400">
                  {course.section}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {selectedCourseId && (
        <div className="mt-3 space-y-4 border-t border-zinc-800 pt-3 text-sm">
          <div>
            <h3 className="mb-1 text-sm font-semibold text-zinc-200">
              Recent materials
            </h3>
            {materials.length === 0 && (
              <p className="text-xs text-zinc-500">No materials found.</p>
            )}
            <ul className="space-y-1.5">
              {materials.slice(0, 5).map((m) => (
                <li
                  key={m.id}
                  className="truncate rounded-xl bg-gradient-to-r from-sky-500/15 via-emerald-500/10 to-violet-500/15 px-3 py-1.5 text-zinc-100"
                >
                  {m.title || "Material"}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-zinc-200">
              Recent assignments
            </h3>
            {assignments.length === 0 && (
              <p className="text-xs text-zinc-500">No assignments found.</p>
            )}
            <ul className="space-y-1.5">
              {assignments.slice(0, 5).map((a) => (
                <li
                  key={a.id}
                  className="truncate rounded-xl bg-gradient-to-r from-violet-500/15 via-sky-500/10 to-emerald-500/15 px-3 py-1.5 text-zinc-100"
                >
                  {a.title || "Assignment"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

