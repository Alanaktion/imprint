import { algorithm } from './crypto/keygen'
import { arrayToBase64, base64ToArray } from './crypto/base64'

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
        text: await arrayToBase64(result),
        iv: await arrayToBase64(iv),
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
    const ivBin = base64ToArray(iv)
    const dataBin = base64ToArray(data)
    const result = await crypto.subtle.decrypt({
        name: algorithm.name,
        iv: ivBin,
    }, key, dataBin)
    return new TextDecoder('utf-8').decode(result)
}
