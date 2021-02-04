import { SET_USEDDATA, SET_DOMAINS, SET_DATABASES, SET_MAILBOXES } from "./actionTypes";
import {IP} from "../GLOBALVAR";

//USED DATA
export const setUsedData = usedData => ({ type: SET_USEDDATA, payload: { usedData } });
export function getUsedData(){ 
    return async (dispatch, getState) => {
        let request = await fetch(IP + "getUsedData.php",
            {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                // mode: 'cors',
                // cache: 'no-cache',
                // credentials: 'same-origin',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            }
        );
        let response = await request.json();
        response.status = request.status
        dispatch(({ type: SET_USEDDATA, payload: { response } }));
        return response
        
        //todo: ERROR HANDL
    }
};

//DOMAINS
export const setDomains = domains => ({ type: SET_DOMAINS, payload: { domains } });
export function getDomains(){ 
    return async (dispatch, getState) => {
        //todo
        let request = await fetch(IP + "getUsedData.php",
            {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                // mode: 'cors',
                // cache: 'no-cache',
                // credentials: 'same-origin',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            }
        );
        let response = await request.json();
        response.status = request.status
        dispatch(({ type: SET_DOMAINS, payload: { response } }));
        return response
        
        //todo: ERROR HANDL
    }
};

//DATABASES
export const setDatabses = databases => ({ type: SET_DATABASES, payload: { databases } });
export function getDatabases(){ 
    return async (dispatch, getState) => {
        //todo
        let request = await fetch(IP + "getUsedData.php",
            {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                // mode: 'cors',
                // cache: 'no-cache',
                // credentials: 'same-origin',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            }
        );
        let response = await request.json();
        response.status = request.status
        dispatch(({ type: SET_DATABASES, payload: { response } }));
        return response
        
        //todo: ERROR HANDL
    }
};

//MAILBOXES

export const setMailboxes = mailboxes => ({ type: SET_MAILBOXES, payload: { mailboxes } });
export function getMailboxes(){ 
    return async (dispatch, getState) => {
        //todo
        let request = await fetch(IP + "getUsedData.php",
            {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                // mode: 'cors',
                // cache: 'no-cache',
                // credentials: 'same-origin',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            }
        );
        let response = await request.json();
        response.status = request.status
        dispatch(({ type: SET_MAILBOXES, payload: { response } }));
        return response
        
        //todo: ERROR HANDL
    }
};