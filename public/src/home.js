/*

Books
You can view all of the books data inside of the public/data/ directory. Each book is an object with the following shape:

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
Each book represents a physical book but also contains additional information. In particular:

The authorId matches up with an author. It represents who wrote the book.
The borrows array is a list of transactions that have occurred with this book. For example, the above book has been borrowed three times.
The id for each "borrow" record matches with an account ID. In the above example, the account with an ID of "5f446f2e2a4fcd687493a775" has not yet returned the book, meaning they still are in possession of it.

*/

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

/*
The `getBooksBorrowedCount()` function in `public/src/home.js` has a single parameter:

- An array of books.

It returns a _number_ that represents the number of books _that are currently checked out of the library._ This number can be found by looking at the first transaction object in the `borrows` array of each book. If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed.

**Example:**

```javascript
getBooksBorrowedCount(accounts); // 65
```
*/

function getBooksBorrowedCount(books) {
  let totalBorrowed = 0;
  books.forEach((book) => {
    const borrows = book.borrows;
    borrows.forEach((borrow) => {
      if (borrow.returned === false) totalBorrowed += 1;
    });
  });
  return totalBorrowed;
}

/*
### getMostCommonGenres()

The `getMostCommonGenres()` function in `public/src/home.js` has a single parameter:

- An array of book objects.

It returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.

Each object in the returned array has two keys:

- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the genre occurs.

Even if there is a tie, the array should only contain no more than five objects.

**Example:**

```javascript
getMostCommonGenres(books);
/*
  [
    { name: "Nonfiction", count: 9 },
    { name: "Historical Fiction", count: 7 },
    { name: "Thriller", count: 7 },
    ...
  ]
*/

function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre].count += 1;
    } else {
      acc[genre] = { name: genre, count: 1 };
    }
    return acc;
  }, {});
  return Object.values(count).sort(sortByPopularity).slice(0, 5);
  //  let sortedBooks =  count.sort((a,b)=>{

  //  });
}

function sortByPopularity(item1, item2) {
  //  return a.count- b.count;
  return item2.count - item1.count;
}

/*
### getMostPopularBooks()

The `getMostPopularBooks()` function in `public/src/home.js` has a single parameter:

- An array of book objects.

It returns an array containing five objects or fewer that represents the most popular books in the library. Popularity is represented by the number of times a book has been borrowed.

Each object in the returned array has two keys:

- The `name` key which represents the title of the book.
- The `count` key which represents the number of times the book has been borrowed.

Even if there is a tie, the array should only contain no more than five objects.

**Example:**

```javascript
getMostPopularBooks(books);
/*
  [
    { name: "incididunt nostrud minim", count: 30 },
    { name: "culpa do sint", count: 30 },
    { name: "ullamco est minim", count: 29 },
    ...
  ]
*/

function getMostPopularBooks(books) {
  const result = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  result.sort((a, b) => b.count - a.count);
  // return first 5
  return result.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorList = books.reduce((acc, book) => {
    const { authorId, borrows } = book;

    const authorObj = authors.find((author) => author.id === authorId);

    const name = `${authorObj.name.first} ${authorObj.name.last}`;

    const count = borrows.length;

    const authExists = acc.find((auth) => auth.name === name);
    if (authExists) {
      authExists.count += count;
    } else {
      const newAuthEntry = {
        name,
        count,
      };
      acc.push(newAuthEntry);
    }

    return acc;
  }, []);

  const sortedAuthorList = authorList.sort((a, b) => b.count - a.count);

  const topFive = sortedAuthorList.slice(0, 5);

  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
