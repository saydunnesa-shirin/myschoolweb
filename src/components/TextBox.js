import className from 'classnames';

function TextBox({
  mandatory,
  optional,
  ...rest
}) {
  const classes = className(
    rest.className,
    'py-2 px-5 mr-2 leading-tight',
    {
      'bg-gray-200 text-gray-700 border border-red-500 focus:outline-none focus:bg-white': mandatory,
      'border border-black bg-white focus:outline-none': optional,
    }
  );

  return (
    <input type="text" {...rest} className={classes} />
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
