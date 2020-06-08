export type Dimension = 'show' | 'click' | 'consume' | 'ctr';

export interface Plan {
  statDate: string;
  price: number;
  show: number;
  click: number;
  consume: number;
}

export interface Category {
  category: string;
  num: number;
}

export interface ListData {
  before: Plan[];
  after: Plan[];
}

export interface PieData {
  before: Category[];
  after: Category[];
}
