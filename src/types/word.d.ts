export interface Word {
  _id: string;
  isFavorite: boolean;
  isClosed: boolean;
  text: {
    type: string;
    question: string;
    answer: string;
  }
}
