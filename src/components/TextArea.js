import className from 'classnames';

function TextArea({
  mandatory,
  optional,
  ...rest
}) {
  const classes = className(
    rest.className,
    'leading-tight border rounded p-3 shadow w-full',
    {
      'bg-red-50 dark:bg-gray-200 text-gray-700 border border-red-500 focus:outline-none focus:bg-white': mandatory,
    }
  );

  return (
    <textarea type="text" {...rest} className={classes} />
  );
}

TextArea.propTypes = {
  checkVariationValue: ({ mandatory, optional }) => {
    const count =
      Number(!!mandatory) +
      Number(!!optional);

    if (count > 1) {
      return new Error(
        'Only one of mandatory, optional can be true'
      );
    }
  },
};

export default TextArea;
