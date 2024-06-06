import Task from "../models/Task";

export const createTask = async (
  name: string,
  description: string,
  project: string,
  assignedTo: string,
  dueDate: Date
) => {
  const task = new Task({ name, description, project, assignedTo, dueDate });
  await task.save();
  return task;
};

export const getTasks = async (projectId: string) => {
  const tasks = await Task.find({ project: projectId }).populate(
    "project assignedTo"
  );
  return tasks;
};

export const updateTask = async (taskId: string, updates: any) => {
  const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
  return task;
};

export const deleteTask = async (taskId: string) => {
  await Task.findByIdAndDelete(taskId);
};
