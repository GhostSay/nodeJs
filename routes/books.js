const { Router } = require("express");
const uuid = require('uuid')
const router = Router();
const books = require("../Books");

//get all books
router.get("/", (req, res) => {
  res.json(books);
});

//get one book by id
router.get("/:id", (req, res) => {
  const isExist = books.some((book) => book.id === parseInt(req.params.id));

  if (isExist) {
    res.json(books.filter((book) => book.id === parseInt(req.params.id)));
  } else {
    res
      .status(404)
      .json({ message: `Siz so'ragan ${req.params.id} idlik kitob topilmadi` });
  }
});

router.post('/', (req, res)=>{
    const newBook = {
        id: uuid.v4(),
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages,
    }

    if(!req.body.name || !req.body.author || !req.body.pages){
        return res.status(400).json({message: 'iltimos hamma ma`lumotlarni kiriting'})
    }

    books.push(newBook)
    res.json(books)
})


module.exports = router;
