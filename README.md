# keytree

Generate deterministic shared secrets between two parties based of (link)Wp0042(link).
Two parties exchange public keys plus a message (eg: a nounce + timestamp), from there multiple shared secrets can be derived by both parties.

## Install

```
npm install keytree
```

## Example

```javascript
const keytree = require('keytree')

var t1 = new keytree({
  priv: serverPrivate, // hex format
  pub: clientPublic,   // hex format
  msg: 'common message'
})

var t2 = new keytree({
  priv: clientPrivate,
  pub: serverPublic,
  msg: 'common message'
})

t1.derive()
  .toString('hex') // 1c56352098780de84006b38e6...

t2.derive
  .toString('hex') // 1c56352098780de84006b38e6...

t1.child()
  .child()
  .branch()
  .child()
  .derive()
  .toString('hex') // 1e5a900bd21d820ad3d49...

t2.child()
  .child()
  .branch()
  .child()
  .derive()
  .toString('hex') // 1e5a900bd21d820ad3d49...
```
