import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './layout.scss';


const Photos  = ({uid}) => {
    const API = 'http://186.103.189.220:9000';
    const [dirFiles, setDirFiles] = useState(null);
    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState ('Seleccionar Archivo');
    const [uploadedFile, setUploadesFile] = useState({});

    const subDirStat = fetch(`${API}/imagenes`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            uid: uid,
            dir_name: 'imagenes'
        })
    })
    useEffect(() => {
        subDirStat.then(res => res.json())
            .then(res => setDirFiles(res))
    }, [uploadedFile]);

    const uploadPhoto = ({target}) => {
        setFiles(target.files[0]);
        setFileName(target.files.length > 0 ? target.files[0].name : 'Seleccionar Imagen');
    };

    const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', files);
        formData.append('uid', uid);
        formData.append('dir_name','imagenes');
        console.log(formData)

        try{
            const res = await axios.post(`${API}/upload`, 
            formData
            , {
                headers:{'Content-Type':'multipart/form-data'}
            });

            const {fileName, filePath} = res.data;

            setUploadesFile({fileName, filePath});
        }catch(err){
            if(err.response.status === 500) {
                console.log('Hay un problema con el servidor...');
            }else{
                console.log(err.response.data.msg);
            }
        };
    }
    
    if(dirFiles){
        return (
            <>
            <br/>
            <h1>Imagenes
                <b></b>
                <a className='nounderline' href="/">&#x21B6;</a>
            </h1>
            <p>Bienvenido(a) a #Imagenes</p>
            <div className="container">
                <form className="form-group" onSubmit={uploadFile}>
                    <div className="input-group col-xs-12">
                        <div class="custom-file" id="customFile">
                            <input type="file" class="custom-file-input" id="exampleInputFile" accept='image/*' aria-describedby="fileHelp" onChange={uploadPhoto}/>
                            <label class="custom-file-label" for="exampleInputFile">
                                {fileName}
                            </label>
                        </div>
                        <span className='input-group-btn'>
                            <button className='btn btn-danger input-lg' type='submit'>
                                <i className='fa fa-cloud-upload' />
                            </button>
                        </span>
                    </div>
                </form>
            </div>
            <div className="content">
                {dirFiles.files.map((file, i) => {
                    return(
                        <div className="img-wrap" key={i} rel="noopener noreferrer">
                            <a href={`${file.url}`} target='_blank'>
                                <span className='view-image' title='Ver Imagen'>&loz;</span>
                            </a>
                            <span className='delete-image' title='Borrar Imagen'>&times;</span>
                            <img src={`${file.url}`} width='230' alt={file} style={{marginLeft:'10px', marginTop:'10px'}} />
                        </div>
                    )
                })}
            </div>
            </>
        );
    }else{
        return('cargando...')
    }
}

export default Photos;