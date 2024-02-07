export enum ButtonStyle {
  PRIMARY,
  SECONDARY,
  TERTIARY,
}

export interface BaseButtonProps {
  /** When true, make sure button fills width of it's container. */
  fill?: boolean;

  /** When true, make button slightly larger (increased vertical padding). */
  large?: boolean;

  /** When true, will show spinner in place of children. */
  loading?: boolean;

  /** When true, will skip adding padding to button. */
  noPadding?: boolean;

  /** Button styling, by default buttons get the primary styling. */
  style?: ButtonStyle;

  /** optional js handle **/
  jsHandle?: string;
}
