export const timeAgo = (date) => {
  const diff = Math.floor(
    (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
};

export const dueLabel = (date) => {
  if (!date) return "No due date";
  const diff = Math.ceil(
    (new Date(date) - new Date()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  if (diff < 0) return `Overdue by ${Math.abs(diff)} days`;
  return `Due in ${diff} days`;
};
