import chalk from "chalk";
import ora from "ora";
import process from 'child_process'

const spinner = ora({
    text: chalk.yellow("Updating..."),
    spinner: {
        interval:100,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(item=>chalk.green(item))
    }
})
export function update() {
    spinner.start()
    process.exec('npm install kuka_cli -g', (err, stdout, stderr) => {
        spinner.stop()
        if(!err) {
            console.log(chalk.green('更新成功'))
        } else {
            console.log(chalk.red(err))
        }
    })
}