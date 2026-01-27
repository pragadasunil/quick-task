import { Search } from "lucide-react";

/* Shared UI control style */
const controlClass =
  "bg-slate-100 px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm";

export default function TaskFilters({
  search,
  setSearch,
  setFilterStatus,
  setFilterPriority,
  setSortBy,
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* SEARCH */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 pr-4 py-2 rounded-xl border bg-white outline-none"
        />
      </div>

      {/* STATUS */}
      <select
        onChange={(e) => setFilterStatus(e.target.value)}
        className={controlClass}
      >
        <option value="">All Status</option>
        <option>Todo</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      {/* PRIORITY */}
      <select
        onChange={(e) => setFilterPriority(e.target.value)}
        className={controlClass}
      >
        <option value="">All Priority</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      {/* SORT */}
      <select
        onChange={(e) => setSortBy(e.target.value)}
        className={controlClass}
      >
        <option value="createdAt">Created</option>
        <option value="dueDate">Due</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}
