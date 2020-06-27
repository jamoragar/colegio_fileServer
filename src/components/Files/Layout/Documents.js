import React, {useState, useEffect} from 'react';

const Documents  = ({uid}) => {
    const [dirFiles, setDirFiles] = useState(null);
    const subDirStat = fetch(`http://localhost:9000/documentos`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            uid: uid,
            dir_name: 'documentos'
        })
    })
    useEffect(() => {
        subDirStat.then(res => res.json())
            .then(res => setDirFiles(res))
    }, []);

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
                <form className="form-group" id="fileForm">
                    <input typeName="file" name="fileupload" id="fileInput" accept="*'" multiple />
                    <div className="input-group col-xs-12">
                        <input className="form-control input-lg" type="text" disabled="" placeholder="Upload Content" id="fileName" />
                        <span className="input-group-btn">
                            <button className="btn btn-primary input-lg" type="button" id="browseBtn">
                                <i className="fa fa-folder-open"></i>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
            <div className="content">
                {dirFiles.files.map((file, i) => {
                    let file_splited = file.split('/');
                    return(
                        <div key={i}>
                            <a href={file} target='_blank' rel="noopener noreferrer">#{file_splited[6]}</a>
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