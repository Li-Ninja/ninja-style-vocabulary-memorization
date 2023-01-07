import { Dayjs } from 'dayjs';

export interface ReviewInfo {
  ratio: number;
  minutes: number;
  count: number;
  initialReviewAt: Dayjs;
  nextReviewAt: Dayjs;
}

export interface Review {
  id: string;
  isFavorite: boolean;
  type: string;
  question: string;
  answer: string;
  reviewInfo: ReviewInfo;
}

export interface ReviewPost extends Pick<Review,
  'id' |
  'reviewInfo'
> {
  isCorrect: boolean | null;
}
