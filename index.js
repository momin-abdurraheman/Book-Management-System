const { response } = require("express");
const express = require("express")
// Imported users file from data so that we can access it
const { users } = require('./data/users.json');

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is uptodate and running perfectly"
    });
});

/**
 * Route : /user
 * Method: GET
 * Description : GET all user details
 * Access : Public
 * Parameters : None
 */

app.get("/users", (req, res) => {
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

app.get("/users/:id", (req, res) => {
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

app.post("/users", (req, res) => {
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
app.put("/users/:id", (req, res) => {
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

app.get("*", (req, res) => {
    response.status(404).json({
        message: "This route does not exist"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})