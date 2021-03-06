require('colors')

import shell from 'shelljs';
import path from 'path';
import log from '../../../utils/log';

const { exec } = shell

export default ({ rootPath } = {}) => new Promise(async (resolve, reject) => {
  try {
    const androidPath = path.join(rootPath, 'android')
    const apkPath = path.join(
      androidPath,
      'app',
      'build',
      'outputs',
      'apk',
      'debug',
      'app-debug.apk'
    )
    /* eslint-disable-next-line */
    const capacitorConfig = require(path.join(rootPath, 'capacitor.config.json'))
    log.info(`Transfering application on device...`.yellow)
    await exec(`adb install -r ${apkPath}`, { cwd: androidPath })
    log.info(`Launching application on device...`.yellow)
    await exec(`adb shell monkey -p ${capacitorConfig.appId} -c android.intent.category.LAUNCHER 1`)
  } catch (e) {
    reject(e)
  }
});
