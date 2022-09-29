import React, { useEffect, useState } from 'react';
import styles from '../styles/components/orderList.component.module.scss';
import { MenuItem } from '../types/app.types';
import OrderListItem from './orderListItem.component';

interface Props {
    selectedItems: MenuItem[],
    updateItem: (menuItem: MenuItem, isIncrease: boolean) => void
}

function OrderList(props: Props) {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (props.selectedItems.length > 0) {
            let totalPrice = 0;
            props.selectedItems.map(
                (item) => totalPrice += item.price * (item.count as number)
            )
            setTotalPrice(totalPrice);
        }
    }, [props.selectedItems]);

    return (
        <div className={styles.container}>
            <div className={styles.headerWrapper}>
                <span className={styles.header}>
                    Bestellzetell
                </span>
            </div>

            {
                props.selectedItems.map(
                    (item, index) =>
                        <OrderListItem
                            menuItem={item}
                            key={index}
                            increaseCount={() => props.updateItem(item, true)}
                            decreaseCount={() => props.updateItem(item, false)}
                        />
                )
            }

            {
                props.selectedItems.length > 0 ?

                <span className={styles.totalPrice}>Gesamtpreis: {'€' + totalPrice.toFixed(2)}</span>
                
                :
                <span className={styles.empty}>
                    Keine Positionen erfasst
                </span>
            }

            {}
        </div>
    );
}

export default OrderList;