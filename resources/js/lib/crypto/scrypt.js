import { scrypt } from 'scrypt-pbkdf'
import { arrayToBase64, base64ToArray } from './base64'

const scryptCost = 16384 // about 1.5s on M1 in Safari, 0.7s in Firefox, 0.2s in Chrome
const scryptBlockSize = 8
const scryptParallelization = 1

/**
 * Generate a base64-encoded random salt
 * @param {Number} bytes The size of the binary representation of the salt
 * @returns {Promise<String>}
 */
export async function generateSalt(bytes = 16) {
    const salt = window.crypto.getRandomValues(new Uint8Array(bytes))
    return await arrayToBase64(salt)
}

/**
 * Generates an scrypt hash from a password
 * @param {String} password
 * @param {String} salt
 * @param {Number} dkLen
 * @returns {Promise<String>}
 */
export async function generateHash(password, salt, dkLen = 64) {
    const result = await scrypt(
        new TextEncoder('utf-8').encode(password.normalize('NFKC')),
        base64ToArray(salt, 'base64'),
        dkLen,
        {
            N: scryptCost,
            r: scryptBlockSize,
            p: scryptParallelization,
        },
    )
    return await arrayToBase64(result)
}
