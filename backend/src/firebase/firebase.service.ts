import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as admin from 'firebase-admin';
import * as serviceAccount from './ahorrometasfinancieras-firebase-adminsdk-fbsvc-dd0602cdf9.json';

@Injectable()
export class FirebaseService {
    constructor() {
        this.initializeFirebase();
    }
    private initializeFirebase() {
        if (!admin.apps.length) {
            const serviceAccountData = serviceAccount as admin.ServiceAccount;
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