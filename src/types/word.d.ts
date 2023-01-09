export interface Word {
  _id: string;
  isFavorite: boolean;
  isClosed: boolean;
  text: {
    type: string;
    question: string;
    answer: string;
  };
}

export interface WordPost {
  type: Word['text']['type'];
  question: Word['text']['question'];
  answer: Word['text']['answer'];
}
