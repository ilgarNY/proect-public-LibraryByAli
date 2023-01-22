function findAuthorById(authors, id) {
  return authors.find((autor) => autor.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

// partitionBooksByBorrowedStatus()
// 3) should return an array with two arrays: borrowed books and returned books

/*
#### partitionBooksByBorrowedStatus()

The `partitionBooksByBorrowedStatus()` function in `public/src/books.js` has a single parameter:

- An array of book objects.

It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.

The first array contains book objects that represent the books _that are currently checked out_, while the second array contains book objects that represent the books _that have been returned._ You can check for the return status by looking at the first transaction object in the `borrows` array.

**Example:**

```javascript
partitionBooksByBorrowedStatus(books);
/*
  [
    [
      {
        id: "5f447132d487bd81da01e25e",
        title: "sit eiusmod occaecat eu magna",
        genre: "Science",
        authorId: 8,
        borrows: [
          {
            id: "5f446f2e2cfa3e1d234679b9",
            returned: false,
          },
          ...
        ]
      },
      ...
    ],
    [
      {
        id: "5f44713265e5d8d17789beb0",
        title: "tempor occaecat fugiat",
        genre: "Travel",
        authorId: 16,
        borrows: [
          {
            id: "5f446f2e4eff1030e7316861",
            returned: true,
          },
          ...
        ]
      },
      ...
    ]
  ]
*/

function partitionBooksByBorrowedStatus(books) {
  let resultOfStatus = [];
  let returnedBoks = [];
  let notReturnedBoks = [];
  returnedBoks = books.filter((bookOb) => {
    return bookOb.borrows[0].returned === true;
  });

  notReturnedBoks = books.filter((bookOb) => {
    return bookOb.borrows[0].returned === false;
  });
  resultOfStatus = [notReturnedBoks, returnedBoks];

  return resultOfStatus;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowArray = book.borrows;
  borrowArray.forEach((borrow) => {
    let account = accounts.find((acc) => acc.id === borrow.id);
    let obj = account;
    obj["returned"] = borrow.returned;
    result.push(obj);
  });
  console.log(result);
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

/*
{
  "id": "5f4471327864ee880caf5afc",
  "title": "reprehenderit quis laboris adipisicing et",
  "genre": "Poetry",
  "authorId": 20,
  "borrows": [
    {
      "id": "5f446f2e2a4fcd687493a775",
      "returned": false
    },
    {
      "id": "5f446f2ebe8314bcec531cc5",
      "returned": true
    },
    {
      "id": "5f446f2ea508b6a99c3e42c6",
      "returned": true
    }
  ]
}
*/
