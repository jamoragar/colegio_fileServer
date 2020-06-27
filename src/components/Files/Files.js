import React, {useEffect, useState} from 'react';
import Documents from './Layout/Documents';
import Others from './Layout/Others';
import Videos from './Layout/Videos';
import Photos from './Layout/Photos';
import {useParams} from 'react-router-dom';
import {checkUser} from '../../firebase/fbFunctions';

const Files = () => {
    const {uid, file_id} = useParams();
    const [apiResponse, setApiResponse] = useState(null);
    
    const crearSubDirectorio = (file_id, uid) =>{
        fetch(`http://localhost:9000/createSubFolder`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                uid: uid,
                tag: file_id
            })
        })
        .then(res => res)
        .then(res => setApiResponse(res.json()))
        .catch(err => console.log(err));
    }
    
    useEffect(() => {
        const userInfo = checkUser(uid);
        userInfo.then(data => {
            crearSubDirectorio(file_id, uid);
        })
    },[]);

    if(apiResponse){
        switch (file_id) {
            case 'imagenes':
                return(<Photos uid={uid}/>);
                break;
        
            case 'videos':
                return(<Videos uid={uid}/>);
                break;
            case 'documentos':
                return(<Documents uid={uid}/>);
                break;

            case 'otros':
                return(<Others uid={uid}/>);
                break;
        };
    }else{
        return('cargando...')
    }
}

export default Files;