/**
 * electron 对象工具类
 */
import remote from '@electron/remote/main';
import path from 'path';
import fs from 'fs';
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
  return remote.app.getAppPath();
};

const getExePath = () => {
  return path.dirname(remote.app.getPath('exe'));
};

const getAppData = () => {
  return remote.app.getPath('appData');
};

const getAppUserData = async () => {
  let appdir = path.join(getAppData(), remote.app.getName());

  try {
    await fs.stat(appdir);
  } catch (error) {
    await fs.mkdir(appdir);
  }
  return appdir;
};

const getConfigPath = () => {
  const fpath = isDev ? path.resolve(path.join(__dirname), '../../../default.conf') : getExePath();
  console.log(fpath, 'fpath');
  if (isDev) {
    return fpath;
  }
  if (getSystem() === 1) {
    return fpath + '/resources/extraResources/default.conf';
  }
  return fpath + '\\resources/extraResources/default.conf';
};

const readConfig = () => {
  const res = fs.readFileSync(getConfigPath(), function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log('异步读取: ' + data.toString());
    return data;
  });
  return res.toString();
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
