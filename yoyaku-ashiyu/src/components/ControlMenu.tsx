import { slide as Menu } from 'react-burger-menu'
import './ControlMneu.css';

interface Props {
    onLoginAdmin: () => void;
}

const ControlMenu: React.FC<Props> = (props) => {
    const handleOnLoginAdin = () => {
        props.onLoginAdmin();
    }
    
    return (
        <Menu
            width={150}
            right
        >
            <main id="divMenuInnerContainer">
                <span
                    id="adminLogin"
                    className="menu-item"
                    onClick={ handleOnLoginAdin }
                >管理者</span>
            </main>
        </Menu>
    );
};

export {
    ControlMenu,
};
