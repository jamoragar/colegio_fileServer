import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {checkUser} from '../../firebase/fbFunctions';
import {Alert} from 'react-bootstrap';
import './Home.css'

// import FileBrowser, {Icons} from 'react-keyed-file-browser'
// import '../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css'

const Home = ({user}) => {
    let userInfo;
    const API = 'http://186.103.189.220:9000';
    const [apiResponse, setApiResponse] = useState(null);

    const inicializarUsuario = (uid, level) => {
        fetch(`${API}/initFolder`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                uid: uid,
                level: level
            })
        })
        .then(res => res)
        .then(res => setApiResponse(res.json()))
        .catch(err => console.log(err));
    };

    useEffect(() => {
        userInfo = checkUser(user.uid);
        userInfo.then(data => {
            inicializarUsuario(user.uid, data.nivel);
        })
    },[])

    if(apiResponse){
        apiResponse.then(data => console.log(data))
        return(
            <>
            <h2 className='title'>Carpetas Personales:</h2>
            <div className="container">
                <div className="dir">
                    <Link to={`/${user.uid}/imagenes`}>
                        <div className="folder" />
                        <p>Imagenes</p>
                    </Link>
                </div>
                <div className="dir">
                    <Link to={`/${user.uid}/videos`}>
                        <div className="folder" />
                        <p>Videos</p>
                    </Link>
                </div>
                <div className="dir">
                    <Link to={`/${user.uid}/documentos`}>
                        <div className="folder" />
                        <p>Documentos</p>
                    </Link>
                </div>
                <div className="dir">
                    <Link to={`/${user.uid}/otros`}>
                        <div className="folder" />
                        <p>Otros</p>
                    </Link>
                </div>
            </div>
            </>
        );
    }else{
        return(
            <Alert variant={'info'}>
                Consultando con el servidor: Cargando...
            </Alert>
        )
    }
}

export default Home;