import simpleGit,{SimpleGitOptions} from 'simple-git'
import createLogger from 'progress-estimator'
import chalk from 'chalk'
// 初始化进度条
const logger = createLogger({
    spinner: {
        interval:100,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.green(item))
    }
})

const gitOptions:Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary:'git',
    maxConcurrentProcesses: 6
}
export const clone = async (url:string,projectName:string,options:string[]) => {
    const git = simpleGit(gitOptions)
    try {
        await logger(git.clone(url,projectName,options),'代码下载中',{
            estimate: 7000,//预计下载时间
        })
        console.log();
        console.log(chalk.green('代码下载完成！'))
        console.log(chalk.blackBright('=============================='));
        console.log(chalk.blackBright('=============================='));
        console.log(chalk.blackBright('=============================='));
        
    } catch(error) {
        console.error(chalk.red('代码下载失败！'))
        console.log(error)
    }
}