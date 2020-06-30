import React, {useState, useEffect} from 'react';
import {ProgressBar} from 'react-bootstrap';
import axios from 'axios';
import './layout.scss';

const Documents  = ({uid}) => {
    const API = 'http://186.103.189.220:9000';
    const [progress, setProgress] = useState(0);
    const [dirFiles, setDirFiles] = useState(null);
    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState('Seleccionar Documento');
    const [uploadedFile, setUploadesFile] = useState({});

    const subDirStat = fetch(`${API}/documentos`,{
        method: 'POST',
        mode: 'no-cors',
        referrerPolicy: 'unsafe-url',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            uid: uid,
            dir_name: 'documentos'
        })
    });

    useEffect(() => {
        subDirStat.then(res => res.json())
            .then(res => setDirFiles(res))
    }, [uploadedFile]);

    const uploadDocument = ({target}) => {
        setFiles(target.files[0]);
        setFileName(target.files.length > 0 ? target.files[0].name : 'Seleccionar Documento');
    };
    const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', files);
        formData.append('uid', uid);
        formData.append('dir_name', 'documentos');

        try{
            const res = await axios.post(`${API}/upload`, formData, {
                onUploadProgress: e => setProgress(Math.round(e.loaded * 100 / e.total)),
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
        return(
            <>
            <br/>
            <h1>Documentos
                <b></b> 
                <a className='nounderline' href="/">&#x21B6;</a>
            </h1>
            <p>Bienvenido(a) a #Documentos</p>
            <div className="container">
                <form className="form-group" id="fileForm" onSubmit={uploadFile}>
                    <div className="input-group col-xs-12">
                        <div className="custom-file" id="customFile">
                            <input type="file" className="custom-file-input" id="exampleInputFile" accept='.pdf, .doc, .docx, .txt, .json, .xml, .md, .css, .js, .ppt, .pptx, .xls, .xlsx' aria-describedby="fileHelp" onChange={uploadDocument} />
                            <label className="custom-file-label" for="exampleInputFile">
                                {fileName}
                            </label>
                        </div>
                        <span className="input-group-btn">
                            <button className="btn btn-danger input-lg" type="submit" id="browseBtn">
                                <i className="fa fa-cloud-upload"></i>
                            </button>
                        </span>
                    </div>
                    <br />
                    <ProgressBar now={progress} label={`${progress}%`} />
                </form>
            </div>
            <div className="content">
                {dirFiles.files.map((file, i) => {
                    let file_splited = file.url.split('/');
                    return(
                        <div key={i}>
                            <a href={file.url} target='_blank' rel="noopener noreferrer">#{file_splited[6]}</a>
                            <br/>
                        </div>
                    )
                })}
            </div>
            </>
        )
    }else{
        return ('Cargando...');
    }
}

export default Documents;