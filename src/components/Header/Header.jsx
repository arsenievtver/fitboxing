import "../../styles/global.css";
import { useUser } from '../../context/UserContext';

const Header = () => {
    const { user } = useUser();  // <-- деструктурируем user из контекста

    return (
        <header className="header">
            <div className="logo-container">
                <h2>Привет, {user?.name || 'гость'}!</h2>
            </div>
            <nav className="score">
                <a>баланс {user?.score ?? '-'}</a>
            </nav>
        </header>
    );
};

export default Header;
