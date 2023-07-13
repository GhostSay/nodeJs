const express = require('express')
const path = require('path')
const books = require('./Books')
const app = express()
const logger = require('./middlewares/logger')
//Middlewares
//Logger middleware
app.use(logger)

//get all books
app.get('/api/books', (req, res)=>{
    res.json(books)
})

//get one book by id
app.get('/api/books/:id', (req, res)=>{
    const isExist = books.some(book => book.id === parseInt(req.params.id))

    if(isExist)
    {
        res.json(books.filter(book=> book.id === parseInt(req.params.id)))
    }else{
        res.status(404).json({message: `Siz so'ragan ${req.params.id} idlik kitob topilmadi`})
    }
   
})


//edit one book by id
app.put('/api/books/:id', (req, res)=>{
    const isExist = books.some(book => book.id === parseInt(req.params.id))

    if(isExist)
    {
        const updateBook = req.body

        books.forEach(book =>{
            if(books.id === parseInt(req.params.id)){
                book.name = updateBook.name ? updateBook.name : book.name
                book.author = updateBook.author ? updateBook.author : book.author
                book.pages = updateBook.pages ? updateBook.pages : book.pages

                res.json({message: 'Kitob ma`lumotlari yangilandi', book})
            }
        })
    }else{
        res.status(404).json({message: `Siz so'ragan ${req.params.id} idlik kitob topilmadi`})
    }

})

//delete one book by id
app.delete('/api/books/:id', (req, res)=>{
    const isExist = books.some(book => book.id === parseInt(req.params.id))

    if(isExist)
    {
        res.json({
            message: 'Kitob o`childi',            
            books: books.filter(book=> book.id !== parseInt(req.params.id))})
    }else{
        res.status(404).json({message: `Siz so'ragan ${req.params.id} idlik kitob topilmadi`})
    }
   
})



//papkani static qilish
app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))