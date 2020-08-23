import React from 'react';
import './KittyCard.css';

function KittyCardFooter({flavoured, description, status, clickHandler}) {
    let cardFooterText = ''
    cardFooterText = <div>
        Чего сидишь? Порадуй котэ, <span
            className='buy-link'
            onClick={clickHandler}>
            <a>купи</a>.
            </span>
    </div>
    
    switch (status) {
        case 'Disabled':
            cardFooterText = <div>Печалька, {flavoured} закончился.</div>
            break
        case 'Selected':
        case 'SelectedHover':
            cardFooterText = <div>{description}</div>
            break
    }
    return (
        <div className="card-footer">
            {cardFooterText}
        </div>
    );
}

export default KittyCardFooter;
