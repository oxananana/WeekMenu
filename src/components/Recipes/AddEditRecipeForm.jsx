import React, { useState } from "react";
import styled from "styled-components";
import { arrayToEnumString, stringToArray } from "../../helpers/helpers";
import { required } from "../../helpers/validate";
import FormField from "../Common/FormField";
import Icon from "../Common/Icon";

const AddEditRecipeForm = (props) => {
  const [imgSrc, setImgSrc] = useState(props.imgSrc);
  const imgFileInput = React.createRef();
  const [state, setState] = useState({
    categoryId: props.categoryId,
    title: props.title,
    recipe: props.recipe,
    ingredients: arrayToEnumString(props.ingredients),
    required: ["title"],
    isError: false,
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleImgFileChange = () => {
    window.URL = window.URL || window.webkitURL;

    if (imgFileInput.current.files.length) {
      const file = imgFileInput.current.files[0];
      setImgSrc(window.URL.createObjectURL(file));
      window.URL.revokeObjectURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = state.required;

    if (requiredFields.some((field) => !state[field].length)) {
      setState({ ...state, isError: true });
    } else {
      setState({ ...state, isError: false });
      props.onSubmit({
        categoryId: state.categoryId,
        title: state.title,
        recipe: state.recipe,
        ingredients: stringToArray(state.ingredients),
        imgSrc: imgSrc,
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <RecipeImgContainer>
        {imgSrc && <RecipeImg src={imgSrc} />}
        <Overlay>
          <label htmlFor="img">
            <Icon name="camera_plus" />
            <InputFile
              type="file"
              name="img"
              id="img"
              accept="image/*"
              ref={imgFileInput}
              onChange={handleImgFileChange}
            />
          </label>
        </Overlay>
      </RecipeImgContainer>
      <Fields>
        <FormField
          fieldType="select"
          value={state.categoryId}
          name="categoryId"
          label="Категория"
          onChange={handleInputChange}
          error={state.isError ? required(state.categoryId) : undefined}
        >
          {props.categories.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            );
          })}
        </FormField>
        <FormField
          fieldType="input"
          value={state.title}
          type="text"
          name="title"
          label="Заголовок"
          onChange={handleInputChange}
          error={state.isError ? required(state.title) : undefined}
        />
        <FormField
          fieldType="input"
          value={state.ingredients}
          type="text"
          name="ingredients"
          label="Ингредиенты (через запятую)"
          onChange={handleInputChange}
        />
        <FormField
          fieldType="textarea"
          value={state.recipe}
          name="recipe"
          type="textarea"
          label="Рецепт"
          onChange={handleInputChange}
        />
        <ButtonContainer>{props.buttons}</ButtonContainer>
      </Fields>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  padding: 32px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bg.baseLight};
`;

const RecipeImgContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  background-color: ${({ theme }) => theme.bg.base};
  border-radius: 8px;
  margin-right: 32px;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 48px;
    height: 48px;
    fill: #fff;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const InputFile = styled.input`
  display: none;
`;

const RecipeImg = styled.img`
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

const Fields = styled.div`
  flex: 1;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export default AddEditRecipeForm;
