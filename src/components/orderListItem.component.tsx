import React from 'react';
import { MenuItem } from '../types/app.types';
import styles from '../styles/components/orderListItem.component.module.scss';

interface Props {
    menuItem: MenuItem,
    increaseCount: () => void,
    decreaseCount: () => void
}

function OrderListItem(props: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.half}>
                <div className={styles.countControl}>
                    <a className={`${styles.button} ${styles.minus}`} onClick={props.decreaseCount}>

                    </a>
                    <span className={styles.count}>
                        {
                            props.menuItem.count
                        }
                    </span>
                    <a className={`${styles.button} ${styles.plus}`} onClick={props.increaseCount}>

                    </a>
                </div>
                <span className={styles.title}>
                    {
                        props.menuItem.title
                    }
                </span>
            </div>
            <div className={styles.half}>
                <span className={styles.price}>
                    {
                        '€' + props.menuItem.price.toFixed(2)
                    }
                </span>
            </div>
        </div>
    );
}

export default OrderListItem;