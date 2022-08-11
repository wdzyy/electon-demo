/**
 * electron 对象工具类
 */
import { app } from 'electron';
import path from 'path';
import fsproms from 'fs.proms';
const isDev = process.env.NODE_ENV === 'development';
let AppConfig = null;

const getSystem = () => {
  // 这是mac系统
  if (process.platform === 'darwin') {
    return 1;
  }
  // 这是windows系统
  if (process.platform === 'win32') {
    return 2;
  }
  // 这是linux系统
  if (process.platform === 'linux') {
    return 3;
  }
};
const getRoot = () => {
  return app.getAppPath();
};

const getExePath = () => {
  return path.dirname(app.getPath('exe'));
};

const getAppData = () => {
  return app.getPath('appData');
};

const getAppUserData = async () => {
  let appdir = path.join(getAppData(), app.getName());

  try {
    await fsproms.stat(appdir);
  } catch (error) {
    await fsproms.mkdir(appdir);
  }
  return appdir;
};

const getConfigPath = () => {
  // console.log('app.utils.js ----+++', process.ROOT_PATH.dist);
  const fpath = isDev ? path.resolve(path.join(__dirname), '../../../default.conf') : getExePath();

  if (isDev) {
    // 开发环境
    // 🚧🚧🚧🚧
    return path.join(process.ROOT_PATH.dist, '../default.conf');
    return fpath;
  }
  // 生产环境
  // 🚧🚧🚧🚧
  return path.join(__dirname, '../default.conf');
  if (getSystem() === 1) {
    return fpath + '/resources/extraResources/default.conf';
  }
  return fpath + '\\resources/extraResources/default.conf';
};

const readConfig = () => {
  return fsproms.readFile(getConfigPath(), 'utf-8');
};

export default {
  isDev,
  AppConfig,
  getSystem,
  getRoot,
  getExePath,
  getAppUserData,
  getConfigPath,
  readConfig,
};
