import className from 'classnames';

function Label({
  children,
  ...rest
}) {
  const classes = className(
    rest.className,
    'block tracking-wide text-gray-700 text-m font-bold m-2'
  );

  return (
    <label {...rest} className={classes}>
      {children}
    </label>
  );
}

export default Label;
