import { Dayjs } from 'dayjs';
import { Word } from './word';

export interface ReviewInfo {
  ratio: number;
  minutes: number;
  count: number;
  initialReviewAt: Dayjs;
  nextReviewAt: Dayjs;
}

export interface Review extends Pick<Word,
  'isFavorite'
> {
  id: string;
  type: Word['text']['type']
  question: Word['text']['question']
  answer: Word['text']['answer']
  reviewInfo: ReviewInfo;
}

export interface ReviewPost extends Pick<Review,
  'id' |
  'reviewInfo'
> {
  isCorrect: boolean | null;
}
