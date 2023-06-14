import { Badge, IconButton } from "@mui/material";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const CartWidget = () => {

  function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }

  return (
    <>
    <IconButton aria-label={notificationsLabel(100)}>
      <Link to="/cart">
        <Contador
          badgeContent={1}
          color="primary"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {/* Le pasamos props en base a lo que especifique la libreria */}
          <BsFillCartFill color="black" size={"28px"} />
        </Contador>
      </Link>
    </IconButton>
    </>
  );
};
const Contador = styled(Badge)`
  padding-left: 8px;
  margin: 0 8px 0 0;
`;
