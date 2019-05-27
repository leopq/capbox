require('colors')

const path = require('path')
const { exec } = require('shelljs')
const config = require('../../config')
const paths = require('../../utils/paths')

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      const { log } = console
      const platform = await config.getPlatform()
      const optimizeJS = path.join(__dirname, 'js')
      const optimizeCSS = path.join(__dirname, 'css')
      const CAPBOX_ENVIRONMENT = `npx cross-env CAPACITOR_PROJECT_ROOT=${paths.getRootPath()} npx cross-env CAPBOX_PLATFORM=${platform}`
      console.log(CAPBOX_ENVIRONMENT)
      log(`Optimizing application static files...`.yellow)
      await exec(`${CAPBOX_ENVIRONMENT} node ${optimizeJS}`)
      await exec(`${CAPBOX_ENVIRONMENT} node ${optimizeCSS}`)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
