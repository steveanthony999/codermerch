import './CartItem.css';

const CartItem = ({ item, onRemoveFromCart, onUpdateCartQty }) => {
  return (
    <div className='CartItem'>
      <div className='CartItem-left'>
        <img src={item.image.url} alt={item.name} />
        <div
          className='CartItem-btn-remove'
          onClick={() => onRemoveFromCart(item.id)}
        >
          remove
        </div>
      </div>
      <div className='CartItem-right'>
        <div className='left'>
          <p>{item.name}</p>
          <p className='CartItem-size'>Size {item.variant.description}</p>
        </div>
        <div className='center'>
          <div className='CartItem-buttons'>
            <button onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>
              -
            </button>
            <p>{item.quantity}</p>
            <button onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>
              +
            </button>
          </div>
        </div>
        <div className='right'>
          <p className='CartItem-Price'>
            {item.line_total.formatted_with_symbol}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
