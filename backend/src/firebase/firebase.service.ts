import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
    constructor() {
        this.initializeFirebase();
    }
    private initializeFirebase() {
        if (!admin.apps.length) {
            if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
                throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not defined');
            }
            const serviceAccountData = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) as admin.ServiceAccount;
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccountData),
            });
        }
    }
    /**
     * OTHER FUNCTIONS WITH THE FIREBASE CONSOLE SUCH AS TOKEN VALIDATION
    */

    async verifyIdToken(idToken: string) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            return decodedToken;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

}