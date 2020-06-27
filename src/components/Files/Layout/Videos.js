import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './layout.scss';

const Videos  = ({uid}) => {
    const [dirFiles, setDirFiles] = useState(null);
    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState('Seleccionar Video');
    const [uploadedFile, setUploadesFile] = useState({});

    const subDirStat = fetch(`http://localhost:9000/videos`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            uid: uid,
            dir_name: 'videos'
        })
    })
    useEffect(() => {
        subDirStat.then(res => res.json())
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
            const res = await axios.post('http://localhost:9000/upload', 
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
                        <div class="custom-file" id="customFile">
                            <input type="file" class="custom-file-input" id="exampleInputFile" accept='video/*' aria-describedby="fileHelp" onChange={uploadVideo} />
                            <label class="custom-file-label" for="exampleInputFile">
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
                    return(
                        <div key={i}>
                            <video width='340' height='260' controls style={{marginLeft:'10px'}}>
                                <source src={file} type='video/*' />
                            </video>
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