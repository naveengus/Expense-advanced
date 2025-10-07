export default {
    SIGNUP: {
        Path: "user/signup"
    },
    LOGIN: {
        Path: "user/login",
        auth: false
    },
    GETUSER: {
        Path: "user/getUser",
        auth: true
    },
    UPDATEUSER: {
        Path: "/user/updateUser",
        auth: true
    },
    CREATECLIENT:{
        Path: "/client/createClient",
        auth: true
    },
     GETCLIENT :{
        Path: "/client/getClient",
        auth: true
    },
    GETCLIENTBYID: {
  Path: "/client/getClientById/:id",
  auth: true
},

     UPDATECLIENT :{
        Path: "/client/updateClient/:id",
        auth: true
    },
     DELETECLIENT :{
        Path: "/client/deleteClient",
        auth: true
    },

    // Income
    INCOMECERATE: {
        Path: "/income/createIncome",
        auth: true
    },
    GETINCOME: {
        Path: "/income/getIncome",
        auth: true
    },
     UPDATEINCOME : {
        Path: "/income/updateIncome/:id",
        auth: true
    },
     DELETEINCOME : {
        Path: "/income/deleteIncome",
        auth: true
    },

    // Expense
    EXPENSECREATE: {
        Path: "/expense/createExpense",
        auth: true
    },
    GETEXPENSE: {
        Path: "/expense/getExpense",
        auth: true
    },
    UPDATEEXPENSE: {
        Path: "/expense/updateExpense/:id",
        auth: true
    },
    DELETEEXPENSE: {
        Path: "/expense/deleteExpense",
        auth: true
    },

     // Employe APIs
    CREATEEMPLOYE: {
        Path: "/employe/createEmploye",
        auth: true
    },
    GETEMPLOYES: {
        Path: "/employe/getEmployes",
        auth: true
    },
    GETEMPLOYE_BY_ID: {
        Path: "/employe/getEmployeByID/:id",
        auth: true
    },
    UPDATEEMPLOYE: {
        Path: "/employe/updateEmploye/:id",
        auth: true
    },
    DELETEEMPLOYE: {
        Path: "/employe/deleteEmploye/:id",
        auth: true
    },
    // Delete All Data
    DELETEALL: {
    Path: "/admin/delete-all",
    auth: true,
    },
}