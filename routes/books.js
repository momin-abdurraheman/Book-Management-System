const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const { route } = require("./users");

const router = express.Router();

/**
 * Route:/books
 * method:GET
 * Description :Get all books
 * Access :public
 * Parameters : none
 */
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    });
});

/**
 * Route:/books/:id
 * method:GET
 * Description :Get book by id 
 * Access :public
 * Parameters : id
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const book = books.find((each) => each.id === id);

    if (!book) {
        res.status(404).json({
            success: false,
            message: "This is not a valid id"
        })
    }

    return res.status(200).json({
        success: true,
        data: book
    })


});

/**
 * Route:/books/issued/by-user
 * method:GET
 * Description :Get all issued books
 * Access :public
 * Parameters : none
 */

router.get('/issued/by-user', (req, res) => {
    const usersWithIssuedBook = users.filter((each) => {
        if (each.issuedBook) return each;
    })

    const issuedBook = [];

    usersWithIssuedBook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook)
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBook.push(book);
    });
    if (issuedBook.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No issued books are found"
        });
    };
    return res.status(200).json({
        success: true,
        data: issuedBook
    })
})

// Default export
module.exports = router;