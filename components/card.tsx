export function CardAction({ as = 'button', ...props }: any) {
  const As = as;

  return <As {...props} />;
}

export function CardActions(props: any) {
  return <div {...props} />;
}

export function Card(props: any) {
  return <div {...props} />;
}