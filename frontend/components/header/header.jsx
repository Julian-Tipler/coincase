import React from 'react';
import {
    Link,
} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return(
            <div className='header'>
                <div className='left-side-items'>coincase</div>
                <div className='right-side-items'>
                    <div>Products</div>
                    <div>Help</div>
                    <div>Prices</div>
                    <Link to='/login'>Sign In</Link>
                    <Link to='/signup'>Sign Up</Link>
                </div>
            </div>
        )
    }
}

export default Header