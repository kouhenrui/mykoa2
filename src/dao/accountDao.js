import { mysqlknex } from "../config/mysqldb";

const getaccount = async (id) => {
    return await mysqlknex("account").where({ id }).select("*")
}
