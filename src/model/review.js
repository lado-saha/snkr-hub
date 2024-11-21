export class Review {
  constructor(author, message) {
    this.author = author;
    this.message = message;
  }

  static fromJSON(json) {
    return new Review(json.author, json.message);
  }

  toJSON() {
    return {
      author: this.author,
      message: this.message,
    };
  }
}