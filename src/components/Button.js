import className from 'classnames';
import { GoSync } from 'react-icons/go';

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  link,
  outline,
  rounded,
  loding,
  ...rest
}) {
  const classes = className(
    rest.className,
    'flex items-center px-2 py-1.5 border rounded text-2xl',
    {
      'opacity-80': loding,
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-gray-900 bg-gray-900 text-white': secondary,
      'border-green-500 bg-green-500 text-white': success,
      'border-yellow-400 bg-yellow-400 text-white': warning,
      'border-red-500 bg-red-500 text-white': danger,
      'px-2 py-1.5 border border-gray-500 rounded-md text-gray-700 hover:text-white hover:bg-gray-500': link,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger,
    }
  );

  return (
    <button {...rest} disabled={loding} className={classes}>
      { loding? <GoSync className='animate-spin'></GoSync> : children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger, link }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger) +
      Number(!!link);

    if (count > 1) {
      return new Error(
        'Only one of primary, secondary, success, warning, danger, link can be true'
      );
    }
  },
};

export default Button;
