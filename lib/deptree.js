const spawn = require('cross-spawn');
const path = require('path');

const installed = () => {
    const ls = spawn.sync('npm', ['ls','--json']);
    const tree = JSON.parse(ls.stdout);
    return tree;
}

const walk = (tree,cb) => {
    const deps = tree.dependencies
    if(deps) {
        Object.keys(deps).forEach(name => {
            const dep = deps[name];
            cb(name,dep)
            walk(dep,cb);
        })
    }
}

module.exports = {installed, walk}
