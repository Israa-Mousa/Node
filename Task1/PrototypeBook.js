function BookPrototype(title, author, isRead) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;
}

BookPrototype.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

BookPrototype.prototype.describe = function () {
  return `📖 "${this.title}" by ${this.author} [${this.isRead ? 'Read' : 'Unread'}]`;
};

const book = new BookPrototype('learn node js', 'Israa Mazaraa', false);
console.log(book.describe());
book.toggleReadStatus();
console.log(book.describe());
