const bn = require('bn.js')
const elliptic = require('elliptic')
const ec = elliptic.ec('secp256k1')
const sha256 = require('sha256')

function keytree ({
  priv,
  pub,
  msg,
}) {
  this.sha = sha256(msg)
  this.sha2 = sha256(msg + msg)
  this.priv = priv.ec ? priv : ec.keyFromPrivate(priv, 'hex').getPrivate()
  this.pub = pub.ec ? pub : ec.keyFromPublic(pub, 'hex').getPublic()

  this.derive = () =>
    ec.keyFromPrivate(this.priv).derive(this.pub)

  this.setMessage = (m) => new keytree({
    priv: this.priv.add(new bn(sha256(m), 16)),
    pub: this.pub.add(ec.curve.g.mul(new bn(sha256(m), 16))),
    msg: m
  })

  this.child = () => new keytree({
    priv: this.priv.add(new bn(this.sha, 16)),
    pub: this.pub.add(ec.curve.g.mul(new bn(this.sha, 16))),
    msg: this.sha
  })

  this.branch = () => new keytree({
    priv: this.priv.add(new bn(this.sha2, 16)),
    pub: this.pub.add(ec.curve.g.mul(new bn(this.sha2, 16))),
    msg: this.sha2
  })
}

module.exports = keytree