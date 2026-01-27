import {
  Flag,
  CheckCircle,
  Calendar,
  Plus,
} from "lucide-react";

/* Shared UI control style */
const controlClass =
  "bg-slate-100 px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm";

export default function TaskComposer({
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  status,
  setStatus,
  dueDate,
  setDueDate,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/80 backdrop-blur border rounded-2xl p-6 space-y-4"
    >
      {/* TITLE */}
      <input
        className="w-full text-xl font-semibold outline-none border-b-2 border-transparent focus:border-indigo-600 transition"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* DESCRIPTION */}
      <textarea
        className="w-full resize-none text-sm outline-none border-b-2 border-transparent focus:border-indigo-600 transition"
        placeholder="Add more context (optional)"
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* CONTROLS */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Flag size={16} />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={controlClass}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle size={16} />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={controlClass}
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={controlClass}
          />
        </div>

        <button
          type="submit"
          className="ml-auto flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-xl"
        >
          <Plus size={16} />
          Add task
        </button>
      </div>
    </form>
  );
}
