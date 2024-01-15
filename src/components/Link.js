import classNames from 'classnames';
import useNavigation from '../hooks/use-navigation';

function Link({ to, children, className, inactiveClassName, activeClassName }) {
  const { navigate, currentPath } = useNavigation();

  const classes = classNames(
    className,
    currentPath !== to && inactiveClassName,
    currentPath === to && activeClassName
  );

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();

    navigate(to);
  };


  return (
    <a className={classes} href={to} onClick={handleClick} aria-current={currentPath === to ? 'page' : undefined}>
      {children}
    </a>
  );
}

export default Link;
