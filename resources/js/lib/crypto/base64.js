/**
 * Convert a Uint8Array to a base64 string
 * @param {Uint8Array} data
 * @returns {Promise<String>}
 */
export const arrayToBase64 = async (data) => {
    // Use a FileReader to generate a base64 data URI
    const base64url = await new Promise((r) => {
        const reader = new FileReader()
        reader.onload = () => r(reader.result)
        reader.readAsDataURL(new Blob([data]))
    })

    // data:application/octet-stream;base64,<data>
    return base64url.split(',', 2)[1]
}

/**
 * Convert a base64 string to a Uint8Array
 * @param {String} base64String
 * @returns {Uint8Array}
 */
export const base64ToArray = function(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4)
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

    var rawData = window.atob(base64)
    var outputArray = new Uint8Array(rawData.length)

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}
