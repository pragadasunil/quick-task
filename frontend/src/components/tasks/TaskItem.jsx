import {
  Pencil,
  Trash2,
} from "lucide-react";
import { timeAgo, dueLabel } from "../../utils/dateHelpers";

/* Shared UI control style */
const controlClass =
  "bg-slate-100 px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm";

export default function TaskItem({
  task,
  editingId,
  editData,
  setEditData,
  startEdit,
  saveEdit,
  cancelEdit,
  deleteTask,
}) {
  const isEditing = editingId === task._id;

  const statusBadge =
    task.status === "Completed"
      ? "bg-green-100 text-green-700"
      : task.status === "In Progress"
      ? "bg-amber-100 text-amber-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="bg-white/90 backdrop-blur border rounded-xl p-5 flex justify-between gap-6">
      {isEditing ? (
        /* EDIT MODE */
        <div className="flex-1 space-y-4">
          <input
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            className="w-full text-lg font-semibold outline-none border-b-2 focus:border-indigo-600"
          />

          <textarea
            rows={3}
            value={editData.description}
            onChange={(e) =>
              setEditData({
                ...editData,
                description: e.target.value,
              })
            }
            className="w-full text-sm outline-none border-b-2 focus:border-indigo-600"
          />

          <div className="flex gap-4">
            <select
              value={editData.priority}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  priority: e.target.value,
                })
              }
              className={controlClass}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              value={editData.status}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  status: e.target.value,
                })
              }
              className={controlClass}
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <input
              type="date"
              value={editData.dueDate}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  dueDate: e.target.value,
                })
              }
              className={controlClass}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => saveEdit(task._id)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="text-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* VIEW MODE */
        <>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">
              {task.title}
            </h3>

            {task.description && (
              <p className="text-sm text-slate-600 mt-1">
                {task.description}
              </p>
            )}

            <div className="mt-3 grid grid-cols-4 gap-6 text-xs text-slate-500">
              <span>
                <b>Priority:</b> {task.priority}
              </span>

              <span
                className={`inline-flex w-fit px-2 py-0.5 rounded-full ${statusBadge}`}
              >
                {task.status}
              </span>

              <span>
                <b>Created:</b> {timeAgo(task.createdAt)}
              </span>

              <span>
                <b>{dueLabel(task.dueDate)}</b>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => startEdit(task)}
              className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600"
            >
              <Pencil size={22} />
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              className="p-2 rounded-lg hover:bg-red-50 text-red-600"
            >
              <Trash2 size={22} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
