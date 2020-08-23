import React from 'react';
import './KittyCard.css';
import KittyCardFooter from './KittyCardFooter'
import cat from '../../img/cat.png'

function mouseHelper(num) {
    if (num > 4) return 'мышей'
    if (num > 0) return 'мыши'
    return 'мышь'
}

class KittyCard extends React.Component {

    static statesList = {
        Default: 'Default',
        DefaultHover: 'DefaultHover',
        Selected: 'Selected',
        SelectedHover: 'SelectedHover',
        Disabled: 'Disabled'
    }

    constructor(props) {
        super(props);

        this.mouseOverHandler = this.mouseOverHandler.bind(this);
        this.mouseOutHandler = this.mouseOutHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    state = {
        status: this.props.data.available ? KittyCard.statesList.Default : KittyCard.statesList.Disabled
    }

    mouseOverHandler = () => {

        if (this.state.status === KittyCard.statesList.Default)
            this.setState({ status: KittyCard.statesList.DefaultHover })

        if (this.state.status === KittyCard.statesList.Selected)
            this.setState({ status: KittyCard.statesList.SelectedHover })

    }

    mouseOutHandler = () => {

        if (this.state.status === KittyCard.statesList.DefaultHover)
            this.setState({ status: KittyCard.statesList.Default })

        if (this.state.status === KittyCard.statesList.SelectedHover)
            this.setState({ status: KittyCard.statesList.Selected })
    }

    clickHandler = (id) => {

        if (this.state.status === KittyCard.statesList.SelectedHover || this.state.status === KittyCard.statesList.Selected)
            this.setState({ status: KittyCard.statesList.DefaultHover })

        if (this.state.status === KittyCard.statesList.DefaultHover || this.state.status === KittyCard.statesList.Default)
            this.setState({ status: KittyCard.statesList.Selected })

        this.props.updateCart(id)
    }

    render() {
        let cardTitleText = 'Сказочное заморское яство'
        if (this.state.status === KittyCard.statesList.SelectedHover)
            cardTitleText = 'Котэ не одобряет?'

        let className = `KittyCard ${this.state.status}`

        return (
            <div className={className}>
                <div className='wrapper'
                    onMouseEnter={this.mouseOverHandler}
                    onMouseLeave={this.mouseOutHandler}
                    onClick={this.state.status !== KittyCard.statesList.Disabled ? (() => this.clickHandler(this.props.data.id)) : undefined}>
                    <svg width="100%" height="100%" viewBox="0 0 320 482">
                        <clipPath id="clipPath1">
                            <polygon points="0,50 50,0 320,0 320,482 0,482" />
                        </clipPath>
                        <rect className="svg-border" width="100%" height="100%" clipPath="url(#clipPath1)" />
                    </svg>
                    <div className="content">
                        <svg width="100%" height="100%" viewBox="0 0 312 474">
                            <clipPath id="clipPath2">
                                <polygon points="0,48 48,0 318,0 318,480 0,480" />
                            </clipPath>
                            <rect className="svg-sub-content" width="100%" height="100%" clipPath="url(#clipPath2)" />
                        </svg>
                        <div className="content-wrapper">
                            <header>
                                <p className='card-title'>{cardTitleText}</p>
                                <p className='company-name'>Нямушка</p>
                                <p className='flavoured'>{this.props.data.flavoured}</p>
                            </header>
                            <article className='info'>
                                <p><b>{this.props.data.portions}</b> порций</p>
                                <p>
                                    <b>{this.props.data.gift > 1 && this.props.data.gift} </b>
                                    {mouseHelper(this.props.data.gift)} в подарок
                            </p>
                            </article>
                        </div>

                    </div>
                    <div className="card-img" style={{ backgroundImage: `url(${cat})` }}></div>
                    <div className='weight-tag'>
                        <p className='weight-tag-number'>{this.props.data.weight}</p>
                        <p className='weight-tag-measure'>кг</p>
                    </div>
                </div>
                <KittyCardFooter
                    flavoured={this.props.data.flavoured}
                    description={this.props.data.description}
                    status={this.state.status}
                    clickHandler={this.clickHandler} />
            </div>
        );
    }
}

export default KittyCard;
