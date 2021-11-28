ssh-keygen -t rsa -b 4096 -m PEM -f RS256.key
# Don't add passphrase
openssl rsa -in RS256.key -pubout -outform PEM -out RS256.pub