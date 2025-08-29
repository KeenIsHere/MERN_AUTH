import {IoIosCloseCircle} from "react-icons/io";

const Modal = ({children, isOpen, onClose, title}) => {
  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            zIndex: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              position: "relative",

              minHeight: "100px",
            }}
          >
            <IoIosCloseCircle
              onClick={onClose}
              color="red"
              size={30}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",

                fontSize: "20px",
              }}
            />

            <h1
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {title}
            </h1>

            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
