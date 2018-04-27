import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import firebaseConfig from '../../app/firebase-config';
import * as firebase from 'firebase'
import {HomePage} from '../home/home';
import {AuthProvider} from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//https://firebase.google.com/docs/auth/web/cordova?hl=pt-br#set_up_firebase_authentication_for_cordova
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams, public auth:AuthProvider) {
    }

    ionViewDidLoad() {
        this.firebaseInit()
        /*firebase.auth().getRedirectResult().then((result) => {
            console.log(result);
        })*/
    }

    firebaseInit() {
        firebase.initializeApp(firebaseConfig);
        this.firebaseLoginResult();
    }

    login() {
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        firebase
            .auth()
            .signInWithRedirect(provider) //promessa
            .then(() => {

            })
    }

    /*loginWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('xpto');
        //this.login(provider)
    }*/

    firebaseLoginResult() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            this.auth.user.name = user.displayName;
            this.auth.user.photo = user.photoURL;
            this.navCtrl.setRoot(HomePage);
        })
    }

    /*logout(){
        firebase.auth().signOut()
            .then(() => {
                this.navCtrl.setRoot(LoginPage);
            })
    }*/

}
