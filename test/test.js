/* eslint-disable */
const keytree = require('../index')
const ec = require('elliptic').ec('secp256k1')
const assert = require('assert')

describe('keytree', () => {
  it ('basic', async () => {
    msg = 'some message'

    const keys = ec.genKeyPair()
    const priv1 = keys.getPrivate('hex')
    const pub1 = keys.getPublic('hex')

    const keys2 = ec.genKeyPair()
    const priv2 = keys2.getPrivate('hex')
    const pub2 = keys2.getPublic('hex')

    const k1 = new keytree({ priv: priv1, pub: pub2, msg })
    const k2 = new keytree({ priv: priv2, pub: pub1, msg })

    makeKeys = (k) => [
      k,
      k.child(),
      k.branch(),
      k.child().child(),
      k.child().branch(),
      k.branch().child(),
      k.branch().branch(),
      k.child().child().child(),
      k.child().child().branch(),
      k.child().branch().child(),
      k.child().branch().branch(),
      k.branch().branch().branch(),
      k.branch().branch().child(),
      k.branch().child().child(),
      k.branch().child().branch(),
    ].map(key => key.derive().toString('hex'))

    const secrets1 = makeKeys(k1)
    const secrets2 = makeKeys(k2)

    assert([...new Set(secrets1.concat(secrets1))]
      .length === secrets1.length) // all keys are unique

    secrets1.forEach((s, i) => {
      assert(s === secrets2[i])
    })
  })
})
