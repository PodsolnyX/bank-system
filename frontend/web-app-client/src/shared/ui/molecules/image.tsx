export type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

export const Image = ({ alt = '', ...props }: ImageProps) => {
  return <img alt={alt} draggable={false} {...props} />
}
