import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskComposer from "../components/tasks/TaskComposer";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskList from "../components/tasks/TaskList";



import api from "../api/api";

/* ======================
   DATE DISPLAY HELPERS
   (DISPLAY ONLY)
====================== */
const timeAgo = (date) => {
  const diff = Math.floor(
    (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
};

const dueLabel = (date) => {
  if (!date) return "No due date";
  const diff = Math.ceil(
    (new Date(date) - new Date()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  if (diff < 0) return `Overdue by ${Math.abs(diff)} days`;
  return `Due in ${diff} days`;
};

/* ======================
   SHARED UI CONTROL STYLE
====================== */
const controlClass =
  "bg-slate-100 px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  // CREATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Todo");
  const [dueDate, setDueDate] = useState("");

  // EDIT
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // FILTERS
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");

  useEffect(() => {
    fetchTasks();
  }, [search, filterStatus, filterPriority, sortBy]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks", {
      params: {
        search: search || undefined,
        status: filterStatus || undefined,
        priority: filterPriority || undefined,
        sort: sortBy,
      },
    });
    setTasks(res.data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await api.post("/tasks", {
      title,
      description,
      priority,
      status,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("Todo");
    setDueDate("");
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditData({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate?.slice(0, 10) || "",
    });
  };

  const saveEdit = async (id) => {
    await api.put(`/tasks/${id}`, editData);
    setEditingId(null);
    fetchTasks();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-slate-600 mt-1">
            A clean, focused workspace for your tasks
          </p>
        </div>

        {/* TASK COMPOSER */}
        <TaskComposer
  title={title}
  setTitle={setTitle}
  description={description}
  setDescription={setDescription}
  priority={priority}
  setPriority={setPriority}
  status={status}
  setStatus={setStatus}
  dueDate={dueDate}
  setDueDate={setDueDate}
  onSubmit={createTask}
/>


        {/* SEARCH + FILTER */}
        <TaskFilters
  search={search}
  setSearch={setSearch}
  setFilterStatus={setFilterStatus}
  setFilterPriority={setFilterPriority}
  setSortBy={setSortBy}
/>


        {/* TASK LIST */}
        
        <TaskList
  tasks={tasks}
  editingId={editingId}
  editData={editData}
  setEditData={setEditData}
  startEdit={startEdit}
  saveEdit={saveEdit}
  cancelEdit={cancelEdit}
  deleteTask={deleteTask}
/>


      </div>
    </>
  );
}
