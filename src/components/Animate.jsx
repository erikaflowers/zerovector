/* Passthrough wrapper — scroll-reveal animation retired during the
 * visual-redo. The div stays so page layouts don't break (many
 * consumers rely on the wrapper for flex/grid children), but no
 * IntersectionObserver fires, no opacity:0 default, no staggered
 * entrance. Content renders immediately and visibly. */

function Animate({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default Animate;
