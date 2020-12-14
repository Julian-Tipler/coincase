import React from 'react';

class BuySellBox extends React.Component {
    constructor(props) {  
      super(props)
      this.state = {
        user_id: this.props.currentUser,
        coin_id: this.props.id, 
        price: 0,
        quantity: 0,
        order_type: 'buy'
    }
    //   this.setState = this.setState.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchCoinInfo(this.props.id)
    }

    componentDidUpdate(prevProps) {
        if (this.state.price === 0) {
            this.setState({
                price: this.props.coinInfo.market_data.current_price.usd
            })        
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }
    
    handleSubmit(e) {
        e.preventDefault()
        const transaction = Object.assign({}, this.state);
        this.props.createTransaction(transaction)
    }
    
    onClickTabItem(order_type) {
        this.setState({order_type:order_type})
    }

    whichTab() {
        switch (this.state.order_type) {
            case 'buy': return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text" 
                            placeholder='0'
                            onChange={this.update('quantity')}/>
                            <div>{`${this.props.id}`}</div>
                        </div>
                        <div>You can buy up to $25,000</div>
                        <div>One time purchase</div>
                        <div className='coin-selector'></div>
                        <div className='bank-selector'></div>
                        <button type='submit'>Buy {`${this.props.id}`}</button>
                        <div>{`${this.props.id}`} balance:</div>
                    </form>
                </div>
            )
            case 'sell': return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text" 
                            placeholder='0'
                            onChange={this.update('quantity')}/>
                            <div>{`${this.props.id}`}</div>
                        </div>
                        <div>You can sell up to $25,000</div>
                        <div>One time sell</div>
                        <div className='coin-selector'></div>
                        <div className='bank-selector'></div>
                        <button type='submit'>Sell {`${this.props.id}`}</button>
                        <div>{`${this.props.id}`} balance:</div>
                    </form>
                </div>        )
            case 'convert': return (
                <div>
                    <input type="text" placeholder='$0' />
                    <div>We do not support conversion at this time</div>
                    <div>Convert All</div>
                    <div className='from-coin'></div>
                    <div className='to-coin'></div>
                    <button>Convert {`${this.props.id}`}</button>
                    <div>{`${this.props.id}`} balance</div>
                </div>            )
            default: <div>error2</div>
            } 
    }


    render() {
        // console.log(this.props)
        return(
            <div>
                <div className = 'buy-sell-box-header'>       
                    <button onClick={()=> this.onClickTabItem('buy')}>Buy</button>
                    <button onClick={()=> this.onClickTabItem('sell')}>Sell</button>
                    <button onClick={()=> this.onClickTabItem('convert')}>Convert</button>
                </div>

                <div className ='buy-sell-box-body'>
                    {this.whichTab()}
                </div>
                <div>
                    {this.props.id} is the target coin
                </div>
            </div>
        )
    }
}

export default BuySellBox
