import { algorithm } from './crypto/keygen'

export * from './crypto/keygen'
export * from './crypto/scrypt'

/**
 * Encrypt a message with a given key
 * @param {CryptoKey} key
 * @param {String} data
 * @returns {Promise<Object>}
 */
export async function encrypt(key, data) {
    const str = new TextEncoder().encode(data)
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const result = await crypto.subtle.encrypt({
        name: algorithm.name,
        iv,
    }, key, str)
    return {
        text: Buffer.from(result).toString('base64'),
        iv: Buffer.from(iv).toString('base64'),
    }
}

/**
 * Decrypt a message with a given key
 * @param {CryptoKey} key
 * @param {String} iv
 * @param {String} data
 * @returns {Promise<String>}
 */
export async function decrypt(key, iv, data) {
    const ivBin = Buffer.from(iv, 'base64').toString('binary')
    const dataBin = Buffer.from(data, 'base64').toString('binary')
    const result = await crypto.subtle.decrypt({
        name: algorithm.name,
        iv: Uint8Array.from(ivBin, c => c.charCodeAt(0)),
    }, key, Uint8Array.from(dataBin, c => c.charCodeAt(0)))
    return Buffer.from(result).toString('utf8')
}
