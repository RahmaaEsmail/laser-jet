import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from '../features/loginSlice'
import bannerReducer from '../features/bannersSlice';
import categoryReducer from '../features/categoriesSlice';
import productReducer from '../features/productsSlice';
import employeeReducer from '../features/employeesSlice';
import usersReducer from '../features/usersSlice';
import contactsReducer from  '../features/callUsSlice';
import socialsReducer from  '../features/SocialLinksSlice';
import settingsReducer from  '../features/settingsSlice';
import notificationsReducer from  '../features/NotificationSlice';
import installmentReducer from '../features/installemntsSlice';
import ordersReducer from '../features/ordersSlice';

export const rootReducers = combineReducers({
    login: loginReducer,
    banner : bannerReducer,
    categories: categoryReducer,
    products: productReducer,
    employees :  employeeReducer,
    users:usersReducer,
    contacts: contactsReducer,
    socials: socialsReducer,
    settings : settingsReducer,
    notifications:notificationsReducer,
    installments: installmentReducer,
    orders : ordersReducer
})