import {
  FaBell,
  FaCalendarDays,
  FaFileInvoice,
  FaGlobe,
  FaHouse,
  FaJediOrder,
  FaMoneyBill1Wave,
  FaMotorcycle,
  FaPalette,
  FaTabletScreenButton,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import HomePage from "../pages/HomePage/HomePage";
import UsersPage from "../pages/UsersPage/UsersPage";
import AccountRequestsPage from "../pages/AccountRequestsPage/AccountRequestsPage";
import UserDocs from "../pages/UserDocs/UserDocs";
import SendBalancePage from "../pages/SendBalancePage/SendBalancePage";
import UsersBalance from "../pages/UsersBalance/UsersBalance";
import InstallmentsPage from "../pages/InstallmentsPage/InstallmentsPage";
import InstallmentsLogs from "../pages/InstallmentsLogs/InstallmentsLogs";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import BannersPage from "../pages/BannersPage/BannersPage";
import EmployeePage from "../pages/EmployeePage/EmployeePage";
import EmployeeDocs from "../pages/EmployeeDocs/EmployeeDocs";
import PermissionsPage from "../pages/PermissionsPage/PermissionsPage";
import { IoBanSharp } from "react-icons/io5";
import ProductSections from "../pages/ProductSections/ProductSections";
import ProductRequests from "../pages/ProductRequests/ProductRequests";
import ProductRequestDetails from "../pages/ProductRequestDetails/ProductRequestDetails";
import ProductOrder from "../pages/ProductOrder/ProductOrder";
import UserProfile from "../pages/UsersPage/UserProfile/UserProfile";
import UserBalances from "../pages/UsersPage/UserBalances/UserBalances";
import UserFinancialtransactions from "../pages/UsersPage/UserFinancialtransactions/UserFinancialtransactions";
import UserDeductions from "../pages/UserDeductions/UserDeductions";
import Operations from "../pages/Operations/Operations";
import Notifications from "../pages/Notifications/Notifications";
import Invoices from "../pages/Invoices/Invoices";
import DeliveryAreas from "../pages/DeliveryAreas/DeliveryAreas";
import UserOrders from "../pages/UsersPage/UserOrders/UserOrders";
import LoginPage from "../pages/LoginPage/LoginPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import { FcSettings } from "react-icons/fc";
import AboutUs from "../pages/AboutUs/AboutUs";
import Orders from "../pages/Orders/Orders";

export const routesData = [
  {
    id: 1,
    labelAr: "الرئيسية",
    labelEn: "Home",
    path: "/",
    component: HomePage,
    icon: FaHouse,
    hidden: false,
  },
  {
    id: 2,
    labelAr: "العملاء",
    labelEn: "Users",
    path: "/users",
    component: UsersPage,
    icon: FaUser,
    hidden: false,
  },
  {
    id: 3,
    labelAr: "طلبات الحسابات",
    labelEn: "Account Requests",
    path: "/account-requests",
    component: AccountRequestsPage,
    icon: "",
    hidden: true,
  },
  {
    id: 4,
    labelAr: "",
    labelEn: "",
    path: "/user_docs/:userId",
    component: UserDocs,
    icon: "",
    hidden: true,
  },
  {
    id: 5,
    labelAr: "",
    labelEn: "",
    path: "/send_balance/:userId",
    component: SendBalancePage,
    icon: "",
    hidden: true,
  },

  {
    id: "6",
    labelAr: "المعاملات المالية",
    labelEn: "Financing Transactions",
    icon: FaMoneyBill1Wave,
    hidden: false,
    subMenus: [
      {
        id: 1,
        labelAr: "رصيد العملاء",
        labelEn: "Users Balance",
        path: "/users_balance",
        component: UsersBalance,
        icon: FaMoneyBill1Wave,
        hidden: false,
      },
      {
        id: 2,
        labelAr: "خصومات المستخدمين",
        labelEn: "Users Deductions",
        path: "/users_deductions",
        component: UserDeductions,
        icon: FaMoneyBill1Wave,
        hidden: false,
      },
      {
        id: 2,
        labelAr: "العمليات",
        labelEn: "Operations",
        path: "/operations",
        component: Operations,
        icon: FaMoneyBill1Wave,
        hidden: false,
      },
      {
        id: 4,
        labelAr: "الأقساط",
        labelEn: "Installments",
        path: "/installments",
        component: InstallmentsPage,
        icon: FaCalendarDays,
        hidden: false,
      },
    ],
  },

  {
    id: 8,
    labelAr: "",
    labelEn: "",
    path: "/installments_logs/:id",
    component: InstallmentsLogs,
    icon: "",
    hidden: true,
  },

  {
    id: 11,
    labelAr: "الموقع",
    labelEn: "website",
    icon: FaGlobe,
    hidden: false,
    subMenus: [
      {
        id: 1,
        labelAr: "الفئات",
        labelEn: "Category",
        path: "/categories",
        component: ProductSections,
        icon: FaTabletScreenButton,
        hidden: true,
      },
      {
        id: 2,
        labelAr: "المنتجات",
        labelEn: "Products",
        path: "/products",
        component: ProductsPage,
        icon: FaTabletScreenButton,
        hidden: false,
      },
      {
        id: 3,
        labelAr: "البانرات",
        labelEn: "Banners",
        path: "/banners",
        component: BannersPage,
        icon: FaPalette,
        hidden: false,
      },
      // {
      //   id:3,
      //   labelAr:"نبذه عنا",
      //   labelEn:"About Us",
      //   component:AboutUs ,
      //   icon: FaUser,
      //   hidden:false,
      //   path:"/about-us"
      // },
      {
        id:5,
        labelAr:"الاعدادات",
        labelEn:"Settings",
        path:"/settings",
        component:SettingsPage,
        icon:FcSettings,
        hidden:false
      }
    ],
  },
  {
    id:25,
    labelAr:"الطلبات",
    labelEn:"Orders",
    component:Orders,
    icon:FaJediOrder,
    path:"/orders",
    hidden:false
  },
  ,
 
  {
    id: 13,
    labelAr: "الموظفين",
    labelEn: "Employee Docs",
    path: "/employee-docs/:id",
    component: EmployeeDocs,
    icon: FaUsers,
    hidden: true,
  },
  {
    id: 12,
    labelAr: "الموظفين",
    labelEn: "Employee",
    path: "/employee",
    component: EmployeePage,
    icon: FaUsers,
    hidden: false,
    subMenus: [
      {
        id: 1,
        labelAr: "الموظفين",
        labelEn: "Employee",
        path: "/employee",
        component: EmployeePage,
        icon: FaUsers,
        hidden: false,
      },
      {
        id: 12,
        labelAr: "الصلاحيات",
        labelEn: "Permissions",
        path: "/permissions",
        component: PermissionsPage,
        icon: IoBanSharp,
        hidden: false,
      },
    ],
  },
  {
    id:22,
    labelAr:"الايصالات",
    labelEn:"Invoices",
    path:"/invoices",
    component: Invoices,
    icon: FaFileInvoice,
    hidden:false
  },
  {
    id:23,
    labelAr:"مناطق التوصيل",
    labelEn:"Delivery Areas",
    path:"/delivery_areas",
    component: DeliveryAreas,
    icon: FaMotorcycle,
    hidden:false
  },
  {
    id:24,
    labelAr:"الاوردرات",
    labelEn:"Orders",
    path:"/user_orders",
    component: UserOrders,
    icon: FaMotorcycle,
    hidden:true
  },
  {
    id: 15,
    labelAr: "طلبات المنتجات",
    labelEn: "Products Request",
    path: "/product_requests",
    component: ProductRequests,
    icon: IoBanSharp,
    hidden: true,
  },
  {
    id: 16,
    labelAr: "عرض الطلب",
    labelEn: "Products Request Details",
    path: "/product_requests_details/:id",
    component: ProductRequestDetails,
    icon: IoBanSharp,
    hidden: true,
  },
  {
    id: 17,
    labelAr: "عرض الطلب",
    labelEn: "Products Order",
    path: "/product_orders/:id",
    component: ProductOrder,
    icon: IoBanSharp,
    hidden: true,
  },
  {
    id: 18,
    labelAr: "تفاصيل العميل",
    labelEn: "User Profile",
    path: "/profile_user/:id",
    component: UserProfile,
    icon: IoBanSharp,
    hidden: true,
  },
  {
    id: 19,
    labelAr: "رصيد المسنخدم",
    labelEn: "User Balance",
    path: "/user_balance/:id",
    component: UserBalances,
    icon: IoBanSharp,
    hidden: true,
  },
  {
    id: 20,
    labelAr: "",
    labelEn: "",
    path: "/user_finance_transactions/:id",
    component: UserFinancialtransactions,
    hidden: true,
    icon: "",
  },
  {
    id: 21,
    labelAr: "الاشعارات",
    labelEn: "Notifications",
    path: "/notifications",
    component: Notifications,
    hidden: false,
    icon: FaBell,
  },
  {
    id:22,
    hidden:true,
    component :LoginPage,
    path:"/login"
  },
];
