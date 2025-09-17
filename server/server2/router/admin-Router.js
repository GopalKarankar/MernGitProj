const express = require("express");
const router = express.Router();
const authMiddleware = require("./../middleware/auth-Middleware");
const adminMiddleware = require("./../middleware/admin-Middleware");
const adminControllers = require("./../controllers/admin-Controllers");



// Admin part starts **********************

        // all users list
router.route("/users").get(authMiddleware, adminMiddleware, adminControllers.getAllUsers);

        // single user update form
router.route("/users/:id").get(authMiddleware, adminMiddleware, adminControllers.getUserById);

        // single user update request
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminControllers.updateUserById);

        // single user delete request
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminControllers.deleteUserById);

// Admin part ends **********************



// Contact part starts **********************

        // all users list
router.route("/contacts").get(authMiddleware, adminMiddleware, adminControllers.getAllContacts);

        // single user update form
router.route("/contacts/:id").get(authMiddleware, adminMiddleware, adminControllers.getContactById);

        // single user update request
router.route("/contacts/update/:id").patch(authMiddleware, adminMiddleware, adminControllers.updateContactById);

        // single user delete request
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminControllers.deleteContactById);

// Contact part ends **********************


module.exports = router;