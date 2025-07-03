
//this is factory function
function createBook(title, author, isRead) {
  return {
    title,
    author,
    isRead,
    toggleReadStatus() {
      this.isRead = !this.isRead;
    },
    describe() {
      return `"${this.title}" by ${this.author} [${this.isRead ? 'Read' : 'Unread'}]`;
    }
  };
}

const book= createBook('learn node js', 'Israa Mazaraa', false);
console.log(book.describe());
book.toggleReadStatus();
console.log(book.describe());
