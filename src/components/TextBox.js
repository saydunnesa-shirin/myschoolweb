import className from 'classnames';

function TextBox({
  type="text",
  mandatory,
  optional,
  ...rest
}) {
  const classes = className(
    rest.className,
    'block w-full pl-1 rounded-md border-0 py-1.5 dark:bg-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6',
    {
      'bg-red-50 text-gray-700 border border-red-500 focus:outline-none focus:bg-white': mandatory,
      'border border-black bg-white focus:outline-none': optional,
    }
  );

  return (
      <input type={type} {...rest} className={classes}  />
  );
}

TextBox.propTypes = {
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

export default TextBox;
