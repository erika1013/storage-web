import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth,private db: AngularFireDatabase) {}

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  public getAuth(){
    return this.afAuth.authState;
    
  }
}
