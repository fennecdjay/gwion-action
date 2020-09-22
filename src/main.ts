import * as core from '@actions/core'
import * as exec from '@actions/exec'

// A class to run commands in a directory
class GitShDirRunner {
  dir: string;
  constructor(dir: string) {
    this.dir = dir;
  }

  // exec the command in ${ dir }
  async exec(cmd: string): Promise<void> {
    await exec.exec(`sh -c "cd ${this.dir} && ${ cmd }"`)
  }

}

async function run(): Promise<void> {
  try {

    // get inputs
    const dir = core.getInput('dir', { required: true });
    const ref = core.getInput('ref', { required: true });
    const dorun = core.getInput('run', { required: true });

    // clone repo
    await exec.exec(`git clone https://github.com/fennecdjay/Gwion ${ dir }`);

    // run actions in repo
    const gsdr = new GitShDirRunner(dir);
    await gsdr.exec(`git checkout ${ ref }`);
    await gsdr.exec(`git submodule update --init ast util`)
    await gsdr.exec('make')
    if(dorun === 'true')
      await gsdr.exec('make test')

    // add gwion to path
    core.addPath(`${ dir }/gwion`);

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
