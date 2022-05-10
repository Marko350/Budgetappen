import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap"
import useDeleteDocument from '../hooks/useDeleteDocument';

const Buttons = ({ id, name, collectionName }) => {
    const mutation = useDeleteDocument(id, collectionName);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteDocument = () => {
        mutation.mutate();
        setShow(false);
    }

    return ( 
        <>
            <Button variant="danger" onClick={handleShow}>
                { name }
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>Are you sure that you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={deleteDocument} className="mt-2" variant="danger" type="submit">
                        { name }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default Buttons;