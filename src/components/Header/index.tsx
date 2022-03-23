import React from 'react';
import { 
    Container,
    HeaderText
 } from './styles';

interface HeaderTexTProps {
    text: string;
}

const Header = ({text}:HeaderTexTProps): JSX.Element => {

    return (
        <Container>
            <HeaderText>{text}</HeaderText>
        </Container>
    );
}

export default Header;