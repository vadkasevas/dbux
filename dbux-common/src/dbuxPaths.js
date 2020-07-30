/**
 * NOTE: In dev mode, we want to always link back to our original source files.
 */
export function getDbuxTargetPath(dbuxPath) {
  if (process.env.NODE_ENV === 'production') {
    return dbuxPath;
  }

  if (!process.env.DBUX_ROOT) {
    throw new Error('DBUX_ROOT is not (but should be) set in development mode.');
  }
  
  return `${process.env.DBUX_ROOT}/${dbuxPath}`;
}