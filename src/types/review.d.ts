import { Dayjs } from 'dayjs';
import { Word } from './word';

export interface ReviewInfo {
  ratio: number;
  minutes: number;
  count: number;
  initialReviewAt: Dayjs;
  nextReviewAt: Dayjs;
}

export interface Review {
  _id: string;
  word_id: Word['_id'];
  isCorrect: boolean | null;
  createAt: Dayjs;
  reviewInfo: ReviewInfo;
}

export interface ReviewWord extends
  Pick<Word,
  'isFavorite'
  >,
  Pick<Review,
  'word_id' |
  'reviewInfo'
  > {
  type: Word['text']['type'];
  question: Word['text']['question'];
  answer: Word['text']['answer'];
}

export interface ReviewWordPost extends
  Pick<Review,
  'isCorrect'
  >,
  Pick<ReviewWord,
  'word_id' |
  'reviewInfo'
  > { }

export interface ReviewLog extends
  Pick<Review,
  '_id' |
  'word_id' |
  'createAt' |
  'isCorrect' |
  'reviewInfo'
  >,
  Pick<ReviewWord,
  'type' |
  'question' |
  'answer'
  > { }
