import { combineReducers } from "redux";
import usedData from "./usedData";
import facturen from "./facturen";
import domains from "./domains";
import databases from "./databases";
import mailboxes from "./mailboxes";


export default combineReducers({ usedData, facturen, domains, databases, mailboxes });
