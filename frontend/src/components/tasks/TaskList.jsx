import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  editingId,
  editData,
  setEditData,
  startEdit,
  saveEdit,
  cancelEdit,
  deleteTask,
}) {
  if (!tasks.length) {
    return (
      <div className="text-center text-slate-500 py-10">
        No tasks found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          editingId={editingId}
          editData={editData}
          setEditData={setEditData}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
