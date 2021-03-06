class Api::TransactionsController < ApplicationController
    def create
        @transaction = Transaction.new(transaction_params)
        user = current_user
        if (@transaction.order_type ==='buy')
            if @transaction.price * @transaction.quantity > user.buying_power
                render json: ['You do not have sufficient funds to make this purchase'], status: 422
            else
                if @transaction.save
                    @user = current_user
                    render 'api/users/show'
                else
                    render json: @transaction.errors.full_messages, status: 422
                end
            end
        else
            if !user.portfolio[transaction_params[:coin_id]] || @transaction.quantity > user.portfolio[transaction_params[:coin_id]]
                render json: ['You do not have sufficient coins to make this sale'], status: 422
            else
                if @transaction.save
                    @user = current_user
                    render 'api/users/show'
                else
                    render json: @transaction.errors.full_messages, status: 422
                end
            end
        end
    end
    
    def index
        @transactions = Transaction.where(user_id:current_user).order("created_at DESC").limit(10)
        if @transactions
            render 'api/transactions/index'
        else
            render json: ['whoops!'], status: 422
        end
    end
    
    private
    def transaction_params
        params.require(:transaction).permit(:user_id, :coin_id, :price, :quantity, :order_type)
    end

end
