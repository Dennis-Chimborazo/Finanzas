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

    
}