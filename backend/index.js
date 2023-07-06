const express = require("express");
const { connection } = require("./configs/dbConnection");
const { BookModel } = require("./model/book.model");

require("dotenv").config();
const app = express();

app.use(express.json())



app.get("/", (req, res) => {
    res.status(200).send({ msg: "home route" })
})


// to get the books
app.get("/getbook", async (req, res) => {
    try {
        const books = await BookModel.find(req.body);
        res.status(200).send({ msg: "books retrieved", data: books })

    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: error })
    }
})

// to add the books

app.post("/add", async (req, res) => {
    const book = req.body
    try {
        const books = new BookModel(book)
        await books.save();
        res.status(200).send({ msg: "books added", data: book })

    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: error })
    }
})

// delete book 

app.delete("/deletebook/:id", async (req, res) => {
    const { id } = req.params
    // console.log("🚀 ~ file: index.js:48 ~ app.post ~ id:", id)
    try {
        const book = await BookModel.findByIdAndDelete({ _id: id })
        res.status(200).send({ msg: "book deleted", data: book })

    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: error })
    }
})

// filter books


// app.get("/getbook/filter", async (req, res) => {
//     const { genre } = req.query;
// //     console.log("🚀 ~ file: index.js:64 ~ app.get ~ genre:", genre)

//     try {
//         if (genre) {
//             const books = await BookModel.find({ genre: genre })
//             res.status(200).send({ msg: " genre books retrieved", data: books })
//         }
//         else {
//             const books = await BookModel.find({})
//             res.status(200).send({ msg: "all books retrieved, genre not mentioned", data: books })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(200).send({ msg: error })
//     }

// })

// sort books
app.get("/getbook/filter", async (req, res) => {
    const { genre, sortBy } = req.query;
    try {
        let filtering = {}
        if (genre) {
            filtering.genre = genre
        }
        else{filtering.genre = null}
        // console.log("🚀 ~ file: index.js:87 ~ app.get ~ filtering:", filtering)
        let sort = {}
        if (sortBy == "asc") {
            sort.price = 1
        }
        else {
            sort.price = -1
        }
        // console.log("🚀 ~ file: index.js:92 ~ app.get ~ sort:", sort)
        if(genre){
            const books = await BookModel.find({ genre: filtering.genre }).sort({ price: sort.price })
            // console.log("🚀 ~ file: index.js:90 ~ app.get ~ books:", books)
            res.status(200).send({ msg: " genre books retrieved", data: books })
        }
        else{
            
            const books = await BookModel.find({  }).sort({ price: sort.price })
            // console.log("🚀 ~ file: index.js:90 ~ app.get ~ books:", books)
            res.status(200).send({ msg: " genre books retrieved", data: books })
        }
    } catch (error) {
        console.log(error)
        res.status(200).send({ msg: error })
    }

})

app.listen(process.env.PORT, async () => {

    try {
        await connection
        console.log("connected to database ")
        console.log("server started at 8080")
    } catch (error) {
        console.log(error)
    }

})