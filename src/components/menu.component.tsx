import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import styles from '../styles/components/menu.component.module.scss';
import { Ingredient, Recipe, Speise } from '../types/api.types';
import { MenuItem } from '../types/app.types';
import { MenuType } from '../types/enums';
import MenuHeader from './menuHeader.component';
import MenuListItem from './menuListItem.component';

interface Props {
    selectedItems: MenuItem[],
    setSelectedItems: (items: MenuItem[]) => void
}

function Menu(props: Props) {
    const [activeMenuType, setActiveMenuType] = useState<MenuType>(MenuType.Food);
    const [foodMenuItems, setFoodMenuItems] = useState<MenuItem[]>([]);
    const [drinkMenuItems, setDrinkMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        getMenu();
    }, []);

    const getMenu = async () => {
        const menus: Speise[] = await api.getMenus();
        const recipes: Recipe[] = await api.getRecipes();
        const ingredients: Ingredient[] = await api.getIngredients();

        for (const menu of menus) {
            const activeRecipes: Recipe[] = [];
            let menuItemsCopy: MenuItem[] = [];

            menu.recipes.forEach(
                item => {
                    const foundRecipe = recipes.find(recipe => recipe.id === item);
                    if (foundRecipe) {
                        activeRecipes.push(foundRecipe);
                    }
                }
            );

            if (menu.id === 1) {
                menuItemsCopy = foodMenuItems.slice(0);
            } else {
                menuItemsCopy = drinkMenuItems.slice(0);
            }

            activeRecipes.forEach(
                recipe => {
                    let activeIngredients: Ingredient[] = [];
                    let totalPrice = 0;
                    recipe.ingredients.forEach(
                        item => {
                            const foundIngredient = ingredients.find(ingredient => item === ingredient.id);
                            if (foundIngredient) {
                                activeIngredients.push(foundIngredient);
                                totalPrice += foundIngredient.price;
                            }
                        }
                    );

                    const newMenuItem: MenuItem = {
                        description: recipe.description,
                        ingredients: activeIngredients,
                        price: totalPrice,
                        title: recipe.title
                    };

                    menuItemsCopy.push(newMenuItem);
                }
            );

            menu.id === 1 ? setFoodMenuItems(menuItemsCopy) : setDrinkMenuItems(menuItemsCopy);
        }
    }

    const selectItem = (item: MenuItem) => {
        const selectedItemsCopy = props.selectedItems.slice(0);
        if (!selectedItemsCopy.includes(item)) {
            item.count = 1;
            item.ingredients.forEach(
                item => {
                    --item.package_amount
                }
            );
            selectedItemsCopy.push(item);
            props.setSelectedItems(selectedItemsCopy);
        }
    };

    return (
        <div className={styles.container}>
            <MenuHeader setMenuType={setActiveMenuType} activeType={activeMenuType} />

            <div className={styles.inner}>
                {
                    activeMenuType === MenuType.Food &&
                    foodMenuItems.map(
                        (item, index) =>
                            <MenuListItem
                                menuItem={item}
                                key={index}
                                totalNumber={foodMenuItems.length}
                                selectItem={() => selectItem(item)}
                                isSelected={
                                    props.selectedItems.findIndex(menuItem => menuItem.title === item.title) !== -1
                                }
                            />
                    )
                }

                {
                    activeMenuType === MenuType.Drinks &&
                    drinkMenuItems.map(
                        (item, index) =>
                            <MenuListItem
                                menuItem={item}
                                key={index}
                                totalNumber={drinkMenuItems.length}
                                selectItem={() => selectItem(item)}
                                isSelected={
                                    props.selectedItems.findIndex(menuItem => menuItem.title === item.title) !== -1
                                }
                            />
                    )
                }
            </div>
        </div>
    );
}

export default Menu;