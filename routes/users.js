const express = require("express");//Must to do  
const { users } = require('../data/users.json');

const router = express.Router();//Function call
/**
 * Route : /user
 * Method: GET
 * Description : GET all user details
 * Access : Public
 * Parameters : None
 */

router.get("/", (req, res) => {
    res.status(200).json({
        Success: true,
        data: users
    });
});

/**
 * Route : /users/:id
 * Method: GET 
 * Description : GET a single user details by id
 * Access : Public
 * Parameters : id
 */

router.get("/:id", (req, res) => {
    // Getting user id using parameters of API
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * Route : /users
 * Method: POST
 * Description : Create New User
 * Access : Public
 * Parameters : None
 */

router.post("/", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } =
        req.body;

    const user = users.find((each) => each.id === id)


    if (user) {
        return res.status(404).json({
            success: false,
            message: "User already exist with this id",
        })
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    })

    return res.status(201).json({
        success: true,
        data: users,

    })
});

/**
 * Route : /users/:id
 * Method: PUT 
 * Description : Updating User
 * Access : Public
 * Parameters : id
 */
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not found",
        })
    }
    const updatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(201).json({
        success: true,
        data: updatedUser,
    })

})

/**
 * Route : /users/:id
 * Method: DELETE
 * Description : Delete a user by id
 * Access : Public
 * Parameters : id
 */
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted not found"
        })
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(202).json({
        success: true,
        data: users
    })

});

module.exports = router;