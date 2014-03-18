# tap-dot

Formatted TAP output with dots ...

![Output screenshot](https://i.cloudup.com/RbBSkxp2Ag.png =442x188)
 
## Install
 
```
npm install tap-dot --save-dev
```
 
## Usage

**packge.json**

```json
{
  "name": "module-name",
  "scripts": {
    "test": "node ./test/tap-test.js | tap-dot"
  }
}
```

Then run with `npm test`
 
**Terminal**

```
tape test/index.js | node_modules/.bin/tap-dot
``` 

**Testling**

```
npm install testling -g
testling test/index.js | node_modules/.bin/tap-dot
```

