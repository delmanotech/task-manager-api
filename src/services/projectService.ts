import Project from "../models/Project";

export const createProject = async (
  name: string,
  description: string,
  owner: string
) => {
  const project = new Project({ name, description, owner });
  await project.save();
  return project;
};

export const getProjects = async (userId: string) => {
  const projects = await Project.find({ members: userId }).populate(
    "owner members"
  );
  return projects;
};

export const updateProject = async (projectId: string, updates: any) => {
  const project = await Project.findByIdAndUpdate(projectId, updates, {
    new: true,
  });
  return project;
};

export const deleteProject = async (projectId: string) => {
  await Project.findByIdAndDelete(projectId);
};
