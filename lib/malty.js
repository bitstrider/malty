const chalk = require('chalk');

const deptree = require('../lib/deptree')
const depquery = require('../lib/depquery')
const constants = require('../lib/constants')

const run = () => {
    const tree = deptree.installed();
    console.log(chalk.gray.bold(`Checking installed dependencies for malicious packages...`));

    deptree.walk(tree, (name,data)=> {
        if(data.resolved.startsWith(constants.REGISTRY_URI_BASE)) {
            depquery.testPackage(name,function(error,isMalicious,data) {
                if(error) console.error(chalk.yellow(`${name} - lookup returned exception ${error}.`));
                else if(isMalicious) console.warn(chalk.bgRed.bold(`${name} - known malicious package!`));
                else console.log(chalk.green.dim(`${name} - ok.`));
            })
        }else{
            console.log(chalk.gray.dim(`${name} - does not resolve to an npm package, skipping.`));
        }
    })
}

module.exports = {run, deptree, depquery, constants}
