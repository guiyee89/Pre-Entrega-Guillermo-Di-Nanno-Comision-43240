import { TextField } from "@mui/material";
import styled from "styled-components/macro";

export const Checkout = ({ handleSubmit, handleChange, errors }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          onChange={handleChange}
          helperText={errors.name}
          error={errors.name ? true : false}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          onChange={handleChange}
          helperText={errors.email}
          error={errors.email ? true : false}
        />
        <TextField
          label="Phone"
          variant="outlined"
          name="phone"
          onChange={handleChange}
          helperText={errors.phone}
          error={errors.phone ? true : false}
        />
        <button type="submit">Comprar</button>
      </Form>
    </div>
  );
};
const Form = styled.form`
  padding: 16px;
`;
