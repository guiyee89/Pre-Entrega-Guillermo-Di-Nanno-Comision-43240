import { Button, TextField } from "@mui/material";
import styled from "styled-components/macro";

export const DiscountForm = ({ selectedItem }) => {
  ////////////          SUBMIT          //////////////
  const handleSubmit = async (e) => {};

  return (
    <>
      <Div>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <div style={{width:"80%"}}>
              <h2>Descuento en %</h2>
              <Input
                label="(solo agregar el numero, ej: 10 - 20)"
                variant="outlined"
                name="discount"
                /* defaultValue={selectedItem?.discount} */
                /* onChange={handleChange} */
                // helperText={errors.discount}
                // error={errors.discount ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </div>
            <SubmitBtn
              type="submit"
              variant="contained"
              sx={{ margin: "20px auto" }}
            >
              Confirmar
            </SubmitBtn>
          </Form>
        </FormWrapper>
      </Div>
    </>
  );
};
const FormWrapper = styled.div`
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
  padding: 20px 12px;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
`;
const Div = styled.div`
    width: 100%;
`;
const Input = styled(TextField)`
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 12.5px 5px;
  }
  width: 300px;
`;
const SubmitBtn = styled(Button)`
  width: 10%;
`;
