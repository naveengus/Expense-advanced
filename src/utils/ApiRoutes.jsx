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
     UPDATECLIENT :{
        Path: "/client/updateClient",
        auth: true
    },
     DELETECLIENT :{
        Path: "/client/deleteClient",
        auth: true
    },
    INCOMECERATE: {
        Path: "/income/createIncome",
        auth: true
    },
    GETINCOME: {
        Path: "/income/getIncome",
        auth: true
    },
     UPDATEINCOME : {
        Path: "/income/updateIncome",
        auth: true
    },
    EXPENSECREATE: {
        Path: "/expense/createExpense",
        auth: true
    },
    GETEXPENSE: {
        Path: "/expense/getExpense",
        auth: true
    },
    UPDATEEXPENSE: {
        Path: "/expense/updateExpense",
        auth: true
    },
}