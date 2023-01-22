// findAccountById()
// should return the account object when given a particular ID:

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  let sortedByLastName = accounts.sort((accountLastNameA, accountLastNameB) =>
    accountLastNameA.name.last.toLowerCase() >
    accountLastNameB.name.last.toLowerCase()
      ? 1
      : -1
  );

  return sortedByLastName;
}

/*
The `getTotalNumberOfBorrows()` function in `public/src/accounts.js` has two parameters, in the following order:

- An account object.
- An array of all book objects.

It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.

**Example:**

```javascript
getTotalNumberOfBorrows(account, books); // 22
yes acoounts , yes knijki. u akkounta est id, u  u knijki est polya vzyali. nado nayti skolko raz id akkaunta vzyal knijku?  
```
*/

function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  books.forEach((bookObj) =>
    bookObj.borrows.forEach((element) => account.id === element.id && count++)
  );
  console.log(count);
  return count;
}

//function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
// let result = [];
// books.forEach((book) => {
//   book.borrows.find((element) => account.id && !element.returned);
//   result.push(book);
//   //console.log(result);
// });
// result.forEach((book) => {
//   let autor = authors.find((autor) => autor.id === book.authorId);
//   book["author"] = autor;
// });
// return result;

function getBooksPossessedByAccount(account, books, authors) {
  let books_taken = [];
  books.forEach((book) => {
    if (book.borrows.find((item) => item.id === account.id && !item.returned)) {
      books_taken.push(book);
    }
  });
  console.log(books_taken);
  books_taken.forEach((book) => {
    let anAuthor = authors.find((person) => person.id === book.authorId);
    book["author"] = anAuthor;
  });
  console.log(books_taken);
  return books_taken;
}

/*
  #### getBooksPossessedByAccount()

The `getBooksPossessedByAccount` function in `public/src/accounts.js` has three parameters, in the following order:

- An account object.
- An array of all book objects.
- An array of all author objects.

It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.
  */

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
