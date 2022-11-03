import {
  generateHash,
  verifyHash,
  generateCookie,
  verifyCookie
} from './encryptionUtils'

process.env.JWT_SECRET = '123'
process.env.USER_COOKIE_EXPIRY = '12h'

describe('Password cases', () => {
  const password = '123456'

  test('when receive password generate hash', async () => {
    const hash = generateHash({ password, saltRounds: 10 })

    expect(hash).toBeDefined()
  })

  test('when receive password and dont receive salt generate hash with default salt', async () => {
    const hash = generateHash({ password })

    expect(hash).toBeDefined()
  })

  test('when hash and password check then return true', async () => {
    const hash = generateHash({ password, saltRounds: 10 })
    const verify = verifyHash({ password, hash })

    expect(verify).toBe(true)
  })

  test('when hash and password dont check then return false', async () => {
    const hash = generateHash({ password, saltRounds: 10 })
    const verify = verifyHash({ password, hash: `${hash}123` })

    expect(verify).toBe(false)
  })
})

describe('Cookie cases', () => {
  test('when receive key and value then generate cookie', async () => {
    const cookie = await generateCookie({
      key: 'Authentication',
      value: 'mysecretcookie'
    })

    expect(cookie).toBeDefined()
  })

  test('when cookie is valid then return jwtPayload', async () => {
    const cookie = await generateCookie({
      key: 'Authentication',
      value: 'mysecretcookie'
    })

    const output = await verifyCookie({
      token: cookie
    })

    expect(output.data.Authentication).toBe('mysecretcookie')
  })

  test('when cookie isnt valid then throw error', async () => {
    const cookie = await generateCookie({
      key: 'Authentication',
      value: 'mysecretcookie'
    })

    try {
      await verifyCookie({
        token: `${cookie}123`
      })
    } catch (output) {
      expect(output.name).toBe('JsonWebTokenError')
      expect(output.message).toBe('invalid signature')
    }
  })
})
