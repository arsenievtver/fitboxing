import "../styles/global.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <h2>Привет, Алексей</h2>
            </div>
            <nav className="score">
                54 {/* Символ гамбургера */}
            </nav>
        </header>
    );
};

export default Header;