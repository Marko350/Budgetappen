import React from 'react'
import Expenses from '../components/Expenses'
import { Row, Col } from "react-bootstrap"
import Income from '../components/Income'
import Objective from '../components/Objective'
import Budget from '../components/Budget'

const User = () => {

    return (
        <div className="user">
            <div className="container">
            <Row >
                <Col className="mb-5" sm={12} md={6} lg={4}>
                    <Income />
                </Col>
                <Col className="mb-5" sm={12} md={6} lg={4}>
                    <Expenses />
                </Col>
                <Col sm={12} md={6} lg={4}>
                    <Budget />
                </Col>
                <Col className="" sm={12} md={6} lg={4}>
                    <Objective />
                </Col>
            </Row>
            </div>
        </div>
    )
}

export default User
