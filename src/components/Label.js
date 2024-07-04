import className from 'classnames';

function Label({
  children,
  ...rest
}) {
  const classes = className(
    rest.className,
    'block leading-6'
  );

  return (
    <label {...rest} className={classes}>
      {children}
    </label>
  );
}

export default Label;
