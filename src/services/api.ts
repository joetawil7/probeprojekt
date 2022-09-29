// eslint-disable-next-line @typescript-eslint/no-var-requires
import axios from 'axios';

const host = 'http://localhost:3000/';

const get = (p_route: string) => {
    return axios.get(
        host + p_route
    ).then(async p_response => p_response.data);
};

const getMenus = async (): Promise<any> => {
    const route = 'menus';

    const response = await get(
        route
    );

    return response;
};

const getRecipes = async (): Promise<any> => {
    const route = 'recipes';

    const response = await get(
        route
    );

    return response;
};

const getIngredients = async (): Promise<any> => {
    const route = 'ingredients';

    const response = await get(
        route
    );

    return response;
};

export const api = {
    getMenus,
    getRecipes,
    getIngredients
};
