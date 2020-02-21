import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as core from '@actions/core'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MILLISECONDS'] = '500'
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  core.exportVariable('INPUT_DIR', 'NotGwion')
  core.exportVariable('INPUT_REF', 'master')
  core.exportVariable('INPUT_RUN', 'false')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
  console.log(cp.execSync('gwion -h').toString())
})
