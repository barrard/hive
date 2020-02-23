const Loading_Button = ({ is_loading, text, name, type, className, onClick }) => (
  <button onClick={onClick} className={className} name={name} type={type}>
    {is_loading && (
      <>
        <i className="fa fa-refresh icon-spin"></i> Loading....
      </>
    )}
    {!is_loading && text}
  </button>
);

export default Loading_Button;
