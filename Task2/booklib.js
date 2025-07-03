class LibraryItem {
  constructor(title) {
    this.title = title;
    this.available = true;
  }

  describe() {
    return `"${this.title}" - ${this.available ? "Available" : "Checked Out"}`;
  }
}

class Book extends LibraryItem {
  constructor(title, author, isRead) {
    super(title);//take same title form super class
    this.author = author;
    this.isRead = isRead;
  }

  describe() {
    //create descirbe print same super descirbe and then print special fo it 
    return `${super.describe()} by ${this.author} [${this.isRead ? "Read" : "Unread"}]`;
  }
}
const b = new Book("learn js", "Israa Mazaraa",true);
console.log(b.describe());