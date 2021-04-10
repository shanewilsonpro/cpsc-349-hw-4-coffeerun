(function (window) {
    'use strict';
  
    var App = window.App || {};
    var $ = window.jQuery;
  
    const firebaseConfig = {
            apiKey: "AIzaSyDWquLNaDmknzNJPruz31lj8jjX3veEKoo",
            authDomain: "cpsc-349-hw4-coffeerun.firebaseapp.com",
            projectId: "cpsc-349-hw4-coffeerun",
            storageBucket: "cpsc-349-hw4-coffeerun.appspot.com",
            messagingSenderId: "230705878809",
            appId: "1:230705878809:web:0fbcba46639bc40d45d788"
    };
  
    class FireBaseDataStore {
        constructor() {
            console.log('running the FireBaseDataStore function');
              firebase.initializeApp(firebaseConfig);
          // firebase.initializeApp(App.FirebaseConfig.firebaseConfig);
          this.firestore = firebase.firestore();
        }
  
        async add(key, val) {
            console.log('firebase add  ')
            const docRef = this.firestore.doc(`orders/${this.makeDocHash(20)}`);
            return docRef.set(val); // i realize that could just use .add, but wanted to try .set instead.
          // return this.firestore.doc(`orders/${key}`).set(val);
        }
        async get(email, cb)  { 
            const docRef = this.firestore.collection(`orders`);
            const snapshot = await docRef.where('emailAddress', '==', email).get();
            return await snapshot.docs.map(e => e.data());
        }
        async getAll(cb)    { 
            const docRef = this.firestore.collection(`orders`);
            const snapshot = await docRef.get();
            return await snapshot.docs.map(e => e.data());
        }
        async remove(email)   { 
            const docRef = await this.firestore.collection(`orders`);
            const batch = this.firestore.batch();
            const snapshot = await docRef.where('emailAddress', '==', email).get();
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }
        makeDocHash(len) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < len; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }
    }
    App.FireBaseDataStore = FireBaseDataStore;
    window.App = App;
  
  })(window);