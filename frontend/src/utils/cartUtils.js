export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    //Calculate items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price, 0));

            //Calculate tax price (10% tax)
            state.taxPrice = addDecimals(Number((0.10 * state.itemsPrice).toFixed(2)));

            //Calculate total price
            state.totalPrice = (
                Number(state.itemsPrice) + 
                Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));

            return state;
}