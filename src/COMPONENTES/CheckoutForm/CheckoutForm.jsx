import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import './CheckoutForm.css';

const CheckoutForm = ({onConfirm}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: ''
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
          setName(value);
          setErrors({ ...errors, name: '' });
        }
        if (name === 'phone') {
          setPhone(value);
          setErrors({ ...errors, phone: '' });
        }
        if (name === 'email') {
          setEmail(value);
          setErrors({ ...errors, email: '' });
        }
      };

    const handleConfirm = (event) => {
        event.preventDefault();
        const newErrors = {};
        if (name === '') newErrors.name = 'Nombre es requerido';
        if (phone === '') newErrors.phone = 'Teléfono es requerido';
        if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Teléfono inválido deben ser de 10 digitos';
        if (email === '') newErrors.email = 'Email es requerido';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = 'Email inválido';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const userData = {
                name, phone, email
            };
            onConfirm(userData);
            setErrors({ name: '', phone: '', email: '' });
        }
    };

    const handleClear = () => {
        setName('');
        setPhone('');
        setEmail('');
        setErrors({
          name: '',
          phone: '',
          email: ''
        });
      };

    return(
        <Container fluid className="main d-flex justify-content-center pt-5">
            <Form className="w-50 border border-5 p-3 rounded form">
                <Form.Group controlId="name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    isInvalid={errors.name !== ''}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name && <span>{errors.name}</span>}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={handleInputChange}
                    isInvalid={errors.phone !== ''}
                  />
                  <Form.Control.Feedback type="invalid">{errors.phone && <span>{errors.phone}</span>}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    isInvalid={errors.email !== ''}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email && <span>{errors.email}</span>}</Form.Control.Feedback>
                </Form.Group>

                <div className="mt-3">
                  <Button variant="primary" className="me-2 buttonStyle" onClick={handleConfirm}>Continuar</Button>
                  <Button variant="outlined" className="buttonClearStyle" onClick={handleClear}>Limpiar</Button>
                </div>
            </Form>
        </Container>
    )
}

export default CheckoutForm;