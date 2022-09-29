import React, { useState } from 'react';
import '../styles/pages/app.scss';
import Menu from '../components/menu.component';
import OrderList from '../components/orderList.component';
import { MenuItem } from '../types/app.types';

function App() {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);

  const updateItem = (item: MenuItem, increase: boolean) => {
    let selectedItemsCopy = selectedItems.splice(0);
    const updatedMenuItem = selectedItemsCopy.find(menuItem => item === menuItem);

    if (updatedMenuItem && updatedMenuItem.count) {
      let isOutOfOrder = false;

      updatedMenuItem.ingredients.forEach(
        item => {
          if (item.package_amount === 0) {
            isOutOfOrder = true;
          }
        }
      );

      if (increase && !isOutOfOrder) {
        ++updatedMenuItem.count;
        updatedMenuItem.ingredients.forEach(
          item => {
            --item.package_amount
          }
        );
      } else if (!increase) {
        if (updatedMenuItem.count === 1) {
          selectedItemsCopy = selectedItemsCopy.filter(item => item !== updatedMenuItem);
        }
        --updatedMenuItem.count;
        updatedMenuItem.ingredients.forEach(
          item => {
            ++item.package_amount
          }
        );
      }
    }

    setSelectedItems(selectedItemsCopy);
  };

  return (
    <div className='container'>
      <Menu setSelectedItems={setSelectedItems} selectedItems={selectedItems} />
      <OrderList
        selectedItems={selectedItems}
        updateItem={(menuItem: MenuItem, isIncrease: boolean) => updateItem(menuItem, isIncrease)} />
    </div>
  );
}

export default App;
