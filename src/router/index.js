import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from '../pages/Login/login.vue'
import Login from "../pages/Login/login.vue";
import RegistrationPage from "../pages/RegistrationPage/index.vue";
// import PowerAttorney from '../pages/PowerAttorney/powerAttorney.vue'
import UploadIdCard from "../pages/UploadIdCard/index.vue";
import ApplyAccount from "../pages/ApplyAccount/index.vue";
import ApplyAccountPreview from "../pages/ApplyAccountPreview/index.vue";
import MyAccount from "../pages/MyAccount/index.vue";
// import BankCard from "../pages/BankCard/index.vue";
import Withdrawal from "../pages/Withdrawal/index.vue";
import MyAccountMoney from '../pages/MyAccountMoney/index.vue'
import TopUp from '../pages/TopUp/index'
import ReadAgreement from '../pages/ReadAgreement/index'
import ForgetPassword from '../pages/ForgetPassword/index'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/registrationPage",
      name: "RegistrationPage",
      component: RegistrationPage
    },
    // {
    //   path: '/',
    //   name: 'PowerAttorney',
    //   component: PowerAttorney
    // }
    {
      path: "/uploadIdCard",
      name: "UploadIdCard",
      component: UploadIdCard
    },
    {
      path: "/applyAccount",
      name: "ApplyAccount",
      component: ApplyAccount
    },
    {
      path: "/applyAccountPreview",
      name: "ApplyAccountPreview",
      component: ApplyAccountPreview
    },
    {
      path: "/myAccount",
      name: "MyAccount",
      component: MyAccount
    },
    // {
    //   path: "/",
    //   name: "BankCard",
    //   component: BankCard
    // }
    {
      path: "/withdrawal",
      name: "Withdrawal",
      component: Withdrawal
    },
    {
      path: "/topUp",
      name: "TopUp",
      component: TopUp
    },
    {
      path: '/myAccountMoney',
      name: 'MyAccountMoney',
      component: MyAccountMoney
    },
    {
      path: '/readAgreement',
      name: 'ReadAgreement',
      component: ReadAgreement
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    }
  ]
});
