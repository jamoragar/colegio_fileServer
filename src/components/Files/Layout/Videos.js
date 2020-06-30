import React, {useState, useEffect} from 'react';
import {ProgressBar} from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import './layout.scss';

const Videos  = ({uid}) => {
    const API = 'https://186.103.189.220:9000';
    const [progress, setProgress] = useState(0);
    const [dirFiles, setDirFiles] = useState(null);
    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState('Seleccionar Video');
    const [uploadedFile, setUploadesFile] = useState({});

    const subDirStat = fetch(`${API}/videos`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            uid: uid,
            dir_name: 'videos'
        })
    });

    useEffect(() => {
        subDirStat.then(res => {console.log(res.clone().json())
             return res.json()})
            .then(res => setDirFiles(res))
    }, [uploadedFile]);

    const uploadVideo = ({target}) => {
        setFiles(target.files[0]);
        setFileName(target.files.length > 0 ? target.files[0].name : 'Seleccionar Video');
    };
    const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', files);
        formData.append('uid', uid);
        formData.append('dir_name','videos');

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
        console.log(dirFiles)
        return(
            <>
            <br/>
            <h1>Videos
                <b></b>
                <a className='nounderline' href="/">&#x21B6;</a>
            </h1>
            <p>Bienvenido(a) a #Videos</p>
            <div className="container">
                <form className="form-group" id="fileForm" onSubmit={uploadFile}>
                    <div className="input-group col-xs-12">
                        <div className="custom-file" id="customFile">
                            <input type="file" className="custom-file-input" id="exampleInputFile" accept='video/*' aria-describedby="fileHelp" onChange={uploadVideo} />
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
                    <br />
                    <ProgressBar now={progress} label={`${progress}%`} />
                </form>
            </div>
            <div className="content" style={{flexFlow:'wrap', display:'flex'}}>
                {dirFiles.files.map((file, i) => {
                    return(
                        <div key={i} className="card" style={{width: '25rem'}}>
                            <div className='videos' key={i} style={{width:'100%', height:'100%'}}>
                                <video width='340' height='260' controls style={{marginLeft:'10px'}}>
                                    <source src={file.url} type='video/mp4' />
                                </video>
                            </div>
                            <div className="card-body">
                                <p className="card-text" style={{textAlign:'center'}}>Fecha de Subida: {moment(file.modified_date).format('DD-MM-YYYY')}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            </>
        )
    }else{
        return('Cargando...')
    }
}

export default Videos;  