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

/**
 * Route:/books/
 * method:POST
 * Description :Add new book
 * Access :public
 * Parameters : none
 * Data: author ,name,genre,price,publisher,id
 */

router.post('/', (req, res) => {
    const { data } = req.body;
    if (!data) {  //Incase no data is provided
        return res.status(404).json({
            success: false,
            message: "No Data Provided"
        })
    };

    //If a book already exists with same id
    const book = books.find((each) => each.id === data.id)
    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book already exist with same id"
        })
    }
    //adding a new element data into books array
    const allBooks = [...books, data];
    return res.status(201).json({
        success: true,
        data: allBooks
    })

})

/**
 * Route:/books/:id
 * method:PUT
 * Description :Update book
 * Access :public
 * Parameters : none
 * Data: author ,name,genre,price,publisher,id
 */

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id);
    if (!book) {
        res.status(400).json({
            success: false,
            message: "Book not found with given id"
        })
    }
    const updateData = books.map((each) => {
        if (each.id === id) {
            //Open the specific element replace it 
            //with data we provided then return it 
            return { ...each, ...data };
        }
        return each;
    })

    return res.status(200).json({
        success: true,
        data: updateData
    })
})



// Default export
module.exports = router;