import React, {useState, useRef} from 'react';
import {Form, Card, Button, Spinner, Overlay, Tooltip} from 'react-bootstrap';
import firebase from '../../firebase/firebase';
import Register from '../Register/Register'
import './Login.css';

const Login = () => {
    const [btnText, setBtnText] = useState(true);
    const [show, setShow] = useState(false);
    const [modalRegisterShow, setModalRegisterShow] = useState(false);
    const [message, setMessage] = useState('');
    const target = useRef(null);


    const onFormSubmit = e => {
        e.preventDefault();
        setBtnText(false);

        const {email, password} = e.target.elements;
        firebase.auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(user => {
            console.log(user)
            setBtnText(true);
        }).catch(error => {
            if (error.code === "auth/wrong-password") {
                setBtnText(true);
                setMessage('E-mail o password incorrecto.');
                setShow(true);
                setTimeout(() => setShow(false), 3000);
              }
              else if (error.code === "auth/invalid-email") {
                setBtnText(true);
                setMessage('No puede iniciar sesión sin antes ingresar sus credenciales.');
                setShow(true);
                setTimeout(() => setShow(false), 3000);
              }
              else if (error.code === 'auth/user-not-found') {
                setBtnText(true);
                setMessage('Usuario no encontrado, verifique sus credenciales e intente nuevamente.');
                setShow(true);
                setTimeout(() => setShow(false), 3000);
              }
              else if (error.code === 'auth/email-already-in-use') {
                setBtnText(true);
                setMessage('El e-mail que ha ingresado ya se encuentra en uso.');
                setShow(true);
                setTimeout(() => setShow(false), 3000);
              }
        })
    }

    return (
        <>
        <Card className='login_card'>
            <Card.Img src={require('../../img/logo.jpg')} />
            <Card.Body>
                <Form onSubmit={onFormSubmit}>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control name='email' type='email' placeholder='Ingrese su correo electrónico' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control name='password' type='password' placeholder='Ingrese su contraseña' />
                    </Form.Group>
                    <Button variant='primary' type='submit' ref={target} block >
                        {btnText ? 'Iniciar Sesión' : <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> }
                    </Button>
                    <Overlay
                        target={target.current}
                        show={show}
                        placement="bottom"
                        onHide={() => setShow(false)} rootClose={true}>
                        
                            
                            <Tooltip className="tooltip-error">
                                {message}
                            </Tooltip>
                            
                        
                    </Overlay>
                    <br/>
                    <p>Si no tiene cuenta haga <div className='clickAca' onClick={() => setModalRegisterShow(true)}>click acá</div></p>
                </Form>
            </Card.Body>
        </Card>
        <Register show={modalRegisterShow} onHide={() => setModalRegisterShow(false)} />
        </>
    );
}

export default Login;