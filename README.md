# tap-dot

Formatted TAP output with dots ...

**Passed tests**

![Passed tests](https://i.cloudup.com/NUrIyLYHct.png)

**Failed tests**

![Failed tests](https://i.cloudup.com/70SmvILs9I.png)
 
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

