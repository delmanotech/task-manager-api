import Project from "../models/Project";

class ProjectService {
  public static async createProject(
    name: string,
    description: string,
    owner: string
  ) {
    const project = new Project({ name, description, owner });
    await project.save();
    return project;
  }

  public static async getProjects(userId: string) {
    const projects = await Project.find({
      $or: [{ owner: userId }, { members: userId }],
    }).populate([
      { path: "owner", select: "-password -roles" },
      { path: "members", select: "-password" },
    ]);

    return projects;
  }

  public static async getProjectById(projectId: string) {
    const project = await Project.findById(projectId).populate([
      { path: "owner", select: "-password -roles" },
      { path: "members", select: "-password" },
    ]);
    return project;
  }

  public static async updateProject(projectId: string, updates: any) {
    const project = await Project.findByIdAndUpdate(projectId, updates, {
      new: true,
    });
    return project;
  }

  public static async deleteProject(projectId: string) {
    await Project.findByIdAndDelete(projectId);
  }
}

export default ProjectService;
