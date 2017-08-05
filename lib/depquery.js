const RegClient = require('npm-registry-client')
const log = require('./nolog')
const client = new RegClient({log, retry:{count:1}})
const {REGISTRY_URI_BASE} = require('./constants')
const params = {timeout: 1000}

const testMalicious = data => {
    const maintainer = data.maintainers[0]
    const repo = data.versions[data['dist-tags'].latest].repository
    const isMalicious = maintainer.email=="npm@npmjs.com" && maintainer.name=="npm" && repo && repo.url=="git+https://github.com/npm/security-holder.git"

    return isMalicious
}

const testPackage = (pkgName, callback) => {
    const pkgUri = `${REGISTRY_URI_BASE}/${pkgName}`;
    client.get(pkgUri, params, function (error, data, raw, res) {
        if(error) callback(error)
        else {
            callback(null,testMalicious(data),data)
        }
    })

}

module.exports = {testMalicious, testPackage}
