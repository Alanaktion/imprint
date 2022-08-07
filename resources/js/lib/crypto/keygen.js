import { arrayToBase64, base64ToArray } from './base64'

export const algorithm = {
    name: 'AES-GCM',
    length: 256,
}

const keyUsages = ['encrypt', 'decrypt']

const pbkdf2Iterations = 2**23 // about 1.4s on M1 in Safari, 1s in Firefox, 0.6s in Chrome

/**
 * Generate an AES-GCM 256-bit CryptoKey for encryption/decryption
 * @returns {Promise<CryptoKey>}
 */
export async function generateKey() {
    return await crypto.subtle.generateKey(algorithm, true, keyUsages)
}

/**
 * Export a CryptoKey to a base64-encoded string
 * @param {CryptoKey} key
 * @returns {Promise<String>}
 */
export async function exportKey(key) {
    const exported = await crypto.subtle.exportKey('raw', key)
    const u8 = new Uint8Array(exported)
    return await arrayToBase64(u8)
}

/**
 * Import a CryptoKey from a base64-encoded string
 * @param {String} key
 * @returns {Promise<CryptoKey>}
 */
export async function importKey(key) {
    const u8 = base64ToArray(key)
    return await crypto.subtle.importKey('raw', u8, algorithm, true, keyUsages)
}

/**
 * Derive an AES-GCM 256-bit CryptoKey from a password and salt
 * @param {String} password
 * @param {String} salt Base64-encoded salt
 * @returns {Promise<CryptoKey>}
 */
export async function deriveKey(password, salt) {
    const passBuffer = new TextEncoder('utf-8').encode(password.normalize('NFKC'))
    const baseKey = await crypto.subtle.importKey(
        'raw',
        passBuffer,
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
    )
    return await crypto.subtle.deriveKey({
        name: 'PBKDF2',
        salt: base64ToArray(salt),
        iterations: pbkdf2Iterations,
        hash: { name: 'SHA-256' },
        length: 256,
    }, baseKey, algorithm, false, ['encrypt', 'decrypt'])
}
