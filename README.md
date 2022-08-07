# Imprint

Write prose on the web, with simple but useful features. Designed around note taking, journaling, and more.

## Features

- Simple plain text notes/pages, organized by date
- In-browser content encryption (no plaintext on the server side)

Future planned features:

- Quick note search
- Simple file and image attachments

## Requirements

- PHP 8
- Node LTS 16+
- MySQL 8 or other Laravel-supported RDBMS
- HTTPS -- The site must be served via a secure connection for the native cryptography functions to be available

## Cryptography technical spec

True end-to-end encryption is a bit tricky to implement. My hope is that I have done a good enough job to provide a _reasonably_ secure end result, though I wouldn't trust it with anything exceptionally high-risk.

The basic idea is that each user has an AES key generated when they register. That key is encrypted with their passphrase, then stored on their user account. Their password is not sent in plaintext to avoid allowing the administrator to decrypt the key, and is instead hashed with scrypt, and that hash is stored and verified by the server. All content on the user's account is encrypted in the browser by the AES key.

### Definitions

- Passphrase - The password or phrase chosen by the user on registration, and used to authenticate. Never sent to the server.
- Salts - Random strings generated in the browser to use with hashing, via Crypto.getRandomValues. They are stored on the server in plaintext.
  - sK - A salt used when encrypting the user's AES key
  - sA - A salt used when authenticating
- AES key - A 256-bit AES-GCM key generated in the browser via SubtleCrypto. Never sent to the server in this form.
- Encrypted AES key - The AES key, encrypted using a key derived with PBKDF2 on the passphrase and sK. Stored on the server.
- Document - An encrypted document owned by the user, decrypted with their AES key. Always sent encrypted to the server.

### Registration

1. The user selects a passphrase
2. The browser generates an AES key
3. The browser generates two salts, sK and sA
4. The browser encrypts that AES key with the user's passphrase, using scrypt with sK as the encryption key
5. The browser generates an scrypt hash from the user's passphrase, using sA
6. The browser sends the encrypted AES key, the salts (sK and sA), and the sA-salted hashed passphrase to the server, along with the name and email to create the account

### Login

1. The user enters their email address and passphrase
2. The browser requests the user's sA salt from the server
3. The browser generates an scrypt hash from the passphrase and sA
4. The browser sends the hash to the server, which compares it to the stored hash. If matching, it sends back the sK, the encrypted AES key and a random session token
5. The browser decrypts the AES key with the passphrase + sK and stores the decrypted key and session token in browser storage for future use

### Password change

There is no ability to perform a traditional "reset" in this model, though I plan to add recovery keys that are effectively another random token used to encrypt an additional copy of the AES key at some point. That would also require storing an scrypt hash of the recovery key to compare against for authentication purposes.

To change the password after already unlocking the AES key though, the process is as follows:

1. The authenticated user requests sK and sA from the server
2. The browser re-encrypts the AES key with the user's _new_ passphrase, using scrypt with sK as the encryption key like it does during registration
3. The browser generates an scrypt hash from the user's new passphrase, using sA
4. The browser sends the new encrypted AES key and the new sA-salted hashed passphrase to the server
5. The server replaces the previously-stored encrypted AES key and password hash

### Document access

1. The browser sends the session token and requested document identifier to the server
2. The server validates the session token, and sends back the requested document's encrypted data
3. The browser decrypts the document data with the AES key in its storage
4. If editing, the browser encrypts the new document with the AES key before sending it back to the server with the session key to store an update
