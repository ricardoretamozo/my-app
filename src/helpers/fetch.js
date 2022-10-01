
const baseURL = process.env.REACT_APP_API_URL


export const fetchWithoutToken = ( endpoint, data, method='GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

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

export const fetchServicioDni = ( endpoint, method='GET' ) => {

    const url = `http://localhost:3001/${ endpoint }`;

    if ( method === 'GET' ){
        return fetch( url );
    } else {
        return fetch( url , {
            method,
            redirect: 'follow'
        });
    }

}

export const fetchServicioReniec = ( endpoint, method='POST' ) => {

    const url = `http://172.28.206.57:8080/${ endpoint }`;

    if ( method === 'POST' ){
        return fetch( url );
    } else {
        return fetch( url , {
            method,
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

export const fetchToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;
    const token = localStorage.getItem('access_token') || '';


    if ( method === 'GET' ){
        return fetch( url,{
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`
            }
        });
    } else {
        return fetch( url , {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ token }`
                //'token': token
            },
            body: JSON.stringify( data )
        });
    }

}

// export const fetchIncidencia = ( endpoint, data, method = 'GET' ) => {

//     const url = `${ baseURL }/${ endpoint }`;
//     const token = localStorage.getItem('access_token') || '';


//     if ( method === 'GET' ){
//         return fetch( url,{
//             method,
//             headers: {
//                 'Content-type': 'application/json',
//                 'Authorization': `Bearer ${ token }`
//             }
//         });
//     } else if ( method === 'POST' ){
//         return fetch( url , {
//             method : 'POST',
//             headers: {
//                 // 'Content-type': 'application/json',
//                 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
//                 'Authorization': `Bearer ${ token }`
//                 //'token': token
//             },
//             body: data,
//             redirect: 'follow'
//         });
//     }

// }

export const fetchIncidencia = ( endpoint, data, method='GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('access_token') );
    // myHeaders.append("content-type", "multipart/form-data; boundary=------WebKitFormBoundaryntMuRHkSUD2Yq3BJ");

    if ( method === 'GET' ){
        return fetch( url );
    } else {
        return fetch( url , {
            method,
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        });
    }

}