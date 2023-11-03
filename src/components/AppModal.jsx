import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    maxWidth: "100%",
  },
};

export default function AppModal({ show, setShow, children, title }) {
  return (
    <Modal isOpen={show} style={customStyles} contentLabel="Example Modal">
      <div className="flex-between">
        <h4>{title}</h4>
        <button className="btn btn-danger" onClick={() => setShow(false)}>
          Close Modal
        </button>
      </div>
      <hr />
      <div>{children}</div>
    </Modal>
  );
}
