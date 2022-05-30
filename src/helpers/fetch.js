
const baseURL = process.env.REACT_APP_API_URL


export const fetchWithoutToken = ( endpoint, data, method='GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    if ( method === 'GET' ){
        return fetch( url );
    } else {
        return fetch( url , {
            method,
            headers: myHeaders,
            body: new URLSearchParams(data),
            redirect: 'follow'
        });
    }

}

export const fetchWithToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;
    const token = localStorage.getItem('refresh_token') || '';


    if ( method === 'GET' ){
        return fetch( url,{
            method,
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        });
    } else {
        return fetch( url , {
            method,
            headers: {
                'Content-type': 'application/json',
                //'token': token
                'Authorization': `Bearer ${ token }`
            },
            body: JSON.stringify( data )
        });
    }

}
