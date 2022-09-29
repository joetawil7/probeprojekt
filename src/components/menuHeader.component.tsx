import React from 'react';
import styles from '../styles/components/menuHeader.component.module.scss';
import { MenuType } from '../types/enums';

interface Props {
    setMenuType: (menuType: MenuType) => void,
    activeType: MenuType
}

function MenuHeader(props: Props) {

    return (
        <div className={styles.container}>
            <div className={styles.item} onClick={() => props.setMenuType(MenuType.Food)}>
                <span className={`${styles.itemName} ${props.activeType === MenuType.Food && styles.active}`}>
                    Essen
                </span>
            </div>
            <div className={styles.item} onClick={() => props.setMenuType(MenuType.Drinks)}>
                <span className={`${styles.itemName} ${props.activeType === MenuType.Drinks && styles.active}`}>
                    Getränke
                </span>
            </div>
        </div>
    );
}

export default MenuHeader;