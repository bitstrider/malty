# malty

detect known malicious packages in your installed npm dependencies

### Quick Start
Install it globally for use on the command line.
```
$ npm install -g malty
```

### Usage
To use simply run the `malty` command in your project directory:
```
$ cd my-project
$ malty
```
This will check all installed npm dependencies for this project and report if any are known malicious packages.

```
// Example output

=> Checking installed dependencies for malicious packages...
=> read - does not resolve to an npm package, skipping.
=> crossenv - known malicious package!
=> mute-stream - ok.
=> concat-map - ok.
```

### How It Works
When [npm](https://github.com/npm) discovers a malicious package on their registry, the package is seized, pacified, and place on [**security hold**](https://github.com/npm/security-holder).

Prior to discovery, however, these malicious packages would've been open available and may have already been distributed and installed in many existing projects.

This tool detects known malicious packages in a project by checking if any installed npm dependencies are currently on security hold.
