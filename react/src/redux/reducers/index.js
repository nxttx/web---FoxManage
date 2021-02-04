import { combineReducers } from "redux";
import usedData from "./usedData";
import domains from "./domains";
import databases from "./databases";
import mailboxes from "./mailboxes";

export default combineReducers({ usedData, domains, databases, mailboxes });
