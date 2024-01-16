const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data: { email: any }) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user: { uid: any }) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin`,
      };
    })
    .catch((err: any) => {
      return err;
    });
});
