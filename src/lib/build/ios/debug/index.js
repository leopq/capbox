require('colors')

import shell from 'shelljs';
import path from 'path';
import log from '../../../../utils/log';

const { exec } = shell

export default ({ rootPath } = {}) => new Promise(async (resolve, reject) => {
  try {
    const iosPath = path.join(rootPath, 'ios', 'App')
    log.header('Generating iOS build...'.yellow)
    await exec(`xcodebuild build-for-testing -workspace App.xcworkspace -scheme App -destination generic/platform=iOS`, { cwd: iosPath })
    log.success('iOS built successfully!'.green.bold)
    resolve()
  } catch (e) {
    reject(e)
  }
});

