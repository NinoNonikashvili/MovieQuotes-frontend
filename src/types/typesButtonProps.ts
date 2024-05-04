export default interface Prop {
  bg?: `bg-${string}-${number}` | string;
  color?: `text-${string}`;
  text_size?: `text-${string}`;
  font?: `font-${string}-${number}`;
  padding_x?: `px-${string}`;
  padding_y?: `py-${string}`;
  line_height?: `leading-${string}`;
  link?: string;
  text_key: string;
  icon?: string | boolean;
  submit?: boolean;
  redirect?: boolean;
}
