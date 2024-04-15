import express from 'express';
const router = express.Router();

import { updateUser, deleteUser, signOutUser } from '../controller/userController.js';
import { verifyUser } from '../utils/verifyUser.js';

router.get('/test', (req, res) => {
    res.send('test');
})
router.put('/update/:userId', verifyUser, updateUser);
router.delete('/delete/:userId', verifyUser, deleteUser);
router.post('/signout', signOutUser);

export default router;


//rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
/////////////////////////////

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write : if
//       request.resource.size < 2 * 1024 * 1024 && 
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }