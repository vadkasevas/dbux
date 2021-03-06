import ProjectsManager from './ProjectsManager';
import { installHackfixes } from './shelljs_hackfixes';

export function initDbuxProjects(cfg, externals) {
  installHackfixes();

  if (cfg || externals) {
    return new ProjectsManager(cfg, externals);
  }
  return null;
}

export {
  ProjectsManager
};