
import * as crypto from "crypto-js";

export class SecretCrypto {

    public encyrptSecret(secret: string): string {
        let encrypted = crypto.DES.encrypt(secret, process.env.PASS_Encyrptor_Key!);
        return encrypted.toString();
    }

    public decyptSecret(encryptedScret: string) {
        let decrypted = crypto.DES.decrypt(encryptedScret, process.env.PASS_Encyrptor_Key!);
        return decrypted.toString(crypto.enc.Utf8);
    }

}
