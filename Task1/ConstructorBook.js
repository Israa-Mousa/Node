// this constructor 
function BookConstructor(title, author, isRead) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;

  this.toggleReadStatus = function () {
    this.isRead = !this.isRead;
  };

  this.describe = function () {
    return `📖 "${this.title}" by ${this.author} [${this.isRead ? 'Read' : 'Unread'}]`;
  };
}

const book = new BookConstructor('learn node js ', 'Israa Mazaraa', true);
console.log(book.describe());
book.toggleReadStatus();
console.log(book.describe());
