import { Link } from 'react-router-dom';

/* Renders one item from src/content/links.js: <Link> for internal
 * routes, <a> for external (new tab unless newTab: false). */
function SiteLink({ item, className, children }) {
  if (item.to) {
    return (
      <Link to={item.to} className={className}>
        {children || item.label}
      </Link>
    );
  }
  const external = item.newTab === false
    ? {}
    : { target: '_blank', rel: 'noopener noreferrer' };
  return (
    <a href={item.href} className={className} {...external}>
      {children || item.label}
    </a>
  );
}

export default SiteLink;
