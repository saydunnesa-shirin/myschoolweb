import className from 'classnames';

function Label({
  children,
  ...rest
}) {
  const classes = className(
    rest.className,
    'block leading-6 text-gray-900'
  );

  return (
    <label {...rest} className={classes}>
      {children}
    </label>
  );
}

export default Label;
