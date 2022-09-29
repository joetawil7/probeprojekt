import React, { useEffect, useState } from 'react';
import { MenuItem } from '../types/app.types';
import styles from '../styles/components/menuListItem.component.module.scss';

interface Props {
    menuItem: MenuItem,
    totalNumber: number,
    selectItem: () => void,
    isSelected: boolean
}

function MenuListItem(props: Props) {
    const [checkMarkGif, setCheckMarkGif] = useState('');

    useEffect(() => {
        setCheckMarkGif('');
        for (let i = 0; i < props.totalNumber; i++) {
            const itemListRef = document.getElementsByClassName(styles.container)[i] as HTMLDivElement;
            itemListRef.style.setProperty('--index', i / 10 + 's');
        }

        const checkGif = '/check-mark-verified.gif?id=' + Math.random();
        const checkImage = new Image();
        checkImage.src = checkGif;
        setCheckMarkGif(checkGif);
    }, []);

    return (
        <div className={`${styles.container} ${props.isSelected && styles.selected}`} onClick={props.selectItem}>
            <span className={styles.header}>
                {
                    props.menuItem.title
                }
            </span>

            <p className={styles.description}>
                {
                    props.menuItem.description
                }
            </p>

            <span className={styles.price}>
                Price {'€' + props.menuItem.price.toFixed(2)}
            </span>

            {
                props.isSelected &&
                <img className={styles.checkMark} src={checkMarkGif} alt='' />
            }
        </div>
    );
}

export default MenuListItem;