/**
 * NOTE: In dev mode, we want to always link back to our original source files.
 */
export function getDbuxTargetPath(dbuxPackageName, relativePath) {
  let path;
  if (process.env.NODE_ENV === 'production') {
    path = `@dbux/${dbuxPackageName}/${relativePath}`;
  }
  else {
    if (!process.env.DBUX_ROOT) {
      throw new Error('DBUX_ROOT is not (but should be) set in development mode.');
    }

    path = `${process.env.DBUX_ROOT}/dbux-${dbuxPackageName}/${relativePath}`;
  }

  // module paths should always use `/` and never use Windows' `\` (especially if we want to send them into shell scripts etc.)
  return path.replace(/\\/g, '/');
}