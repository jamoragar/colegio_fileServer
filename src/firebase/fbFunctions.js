import firebase from '../firebase/firebase';

export const LogOut = () => {
    return firebase.auth().signOut();
};
export const checkUser = (uid) => {
    return firebase.database().ref(`/Users/${uid}`).once('value').then(snapshot => {
        return snapshot.val();
    });
};