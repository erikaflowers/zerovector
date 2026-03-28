import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="zv-footer">
      <div className="zv-container">
        <div className="zv-footer-inner">
          <div className="zv-footer-brand">ZERO-VECTOR DESIGN</div>
          <div className="zv-footer-links">
            <a href="https://open.zerovector.design">Open Vector</a>
            <Link to="/investiture">Investiture</Link>
            <Link to="/start">Get Started</Link>
            <a href="https://herelabrador.ai" target="_blank" rel="noopener noreferrer">Labrador</a>
            <a href="https://eflowers.substack.com" target="_blank" rel="noopener noreferrer">Substack</a>
            <a href="https://www.linkedin.com/in/helloeflowers/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://helloerikaflowers.com" target="_blank" rel="noopener noreferrer">helloerikaflowers.com</a>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
