import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './layout.scss';

const Others  = ({uid}) => {
    const API = 'http://186.103.189.220:9000';
    const [dirFiles, setDirFiles] = useState(null);
    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState('Seleccionar Archivo');
    const [uploadedFile, setUploadesFile] = useState({});

    const subDirStat = fetch(`${API}/otros`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            uid: uid,
            dir_name: 'otros'
        })
    })
    useEffect(() => {
        subDirStat.then(res => res.json())
            .then(res => setDirFiles(res))
    }, [uploadedFile]);

    const uploadOtros = ({target}) => {
        setFiles(target.files[0]);
        setFileName(target.files.length > 0 ? target.files[0].name : 'Seleccionar Archivo');
    };
    const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', files);
        formData.append('uid', uid);
        formData.append('dir_name','otros');

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
        console.log(dirFiles)
        return(
            <>
            <br/>
            <h1>Otros
                <b></b>
                <a className='nounderline' href="/">&#x21B6;</a>
            </h1>
            <p>Bienvenido(a) a #Otros</p>
            <div className="container">
                <form className="form-group" id="fileForm" onSubmit={uploadFile}>
                    <div className="input-group col-xs-12">
                        <div className="custom-file" id="customFile">
                            <input type="file" className="custom-file-input" name="fileupload" aria-describedby="fileHelp" id="exampleInputFile" accept="*'" onChange={uploadOtros} />
                            <label className="custom-file-label" htmlFor="exampleInputFile">
                                {fileName}
                            </label>
                        </div>
                        <span className="input-group-btn">
                            <button className="btn btn-danger input-lg" type="submit" id="browseBtn">
                                <i className="fa fa-cloud-upload"></i>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
            <div className="content">
                {dirFiles.files.map((file, i) => {
                    let file_splited = file.url.split('/');
                    return(
                        <div key={i}>
                            <a href={file.url}>#{file_splited[6]}</a>
                            <br/>
                        </div>
                    )
                })}
            </div>
            </>
        )
    }else{
        return('Cargando...');
    }
    return ('hola Others...');
}

export default Others;