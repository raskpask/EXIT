import React, { Component } from 'react';
import { Navbar,Nav } from 'react-bootstrap';

import '../resources/css/footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Navbar className="footer">
                    <Nav className="m-auto">
                        {this.props.info.footer.title}
                    </Nav>
                </Navbar>
            </div>
        );
    };
}
export default Footer