import crypto from "crypto";

/**
 * Sign a sync packet using an RSA private key.
 * privateKey: PEM encoded string
 */
export function signPacket(packet: any, privateKey: string) {
  if (!privateKey || privateKey.trim().length === 0) {
    throw new Error("Private key not provided.");
  }

  const packetString = JSON.stringify(packet);

  const signature = crypto.sign("sha256", Buffer.from(packetString, "utf8"), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING
  });

  return signature.toString("base64");
}

/**
 * Verify a packet signature using an RSA public key.
 */
export function verifyPacketSignature(packet: any, signatureBase64: string, publicKey: string) {
  if (!publicKey || publicKey.trim().length === 0) {
    throw new Error("Public key not provided.");
  }

  const packetString = JSON.stringify(packet);
  const signature = Buffer.from(signatureBase64, "base64");

  return crypto.verify(
    "sha256",
    Buffer.from(packetString, "utf8"),
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    },
    signature
  );
}
