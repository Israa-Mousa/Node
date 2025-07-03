class Book{
 constructor(title,author,isRead){
    this.title=title
    this.author=author
    this.isRead=isRead
 }


 toggleReadStatus(){
    this.isRead=!this.isRead
 }


 describe(){
    return `"${this.title}" by "${this.author}" [${this.isRead?'Read':'Unread'}]`
 }
}

const bookObject=new Book('learn node js','Israa Mazaraa',true);
console.log(bookObject.describe())
bookObject.toggleReadStatus()
console.log(bookObject.describe())