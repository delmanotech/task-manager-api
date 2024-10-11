import Task from "../models/Task";

class TaskService {
  public static async createTask(
    name: string,
    description: string,
    project: string,
    assignedTo: string,
    dueDate: Date
  ) {
    const task = new Task({ name, description, project, assignedTo, dueDate });
    await task.save();
    return task;
  }

  public static async getTasks(projectId: string) {
    const tasks = await Task.find({ project: projectId }).populate(
      "project assignedTo createdBy"
    );
    return tasks;
  }

  public static async updateTask(taskId: string, updates: any) {
    const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    return task;
  }

  public static async deleteTask(taskId: string) {
    await Task.findByIdAndDelete(taskId);
  }
}

export default TaskService;
