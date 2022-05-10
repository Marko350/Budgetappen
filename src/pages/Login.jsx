import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { login } = useAuthContext()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/user")
        }   catch (e) {
            setError(e.message)
            console.log(e)
        }
    }

    return (
        <Container className="mt-5">
            { error && <Alert>{error}</Alert> }

            <Form onSubmit={handleSubmit}>

                <Form.Group id="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Button disabled={loading} type="submit">Log In</Button>
            </Form>

            <div className="text-center mt-3">
				<Link to="/forgot-password">Forgot Password?</Link>
			</div>

        </Container>
    )
}

export default Login
