import React, { useState } from "react";
import styled from "styled-components";
import { arrayToEnumString, stringToArray } from "../../helpers/helpers";
import { defaultCategoryId } from "../../constants";
import { required } from "../../helpers/validate";
import { getCategoryValues } from "../../selectors/selectors";
import Form from "../Common/Form/Form";
import FormField from "../Common/Form/FormField";
import Icon from "../Common/Icon";

const AddEditRecipeForm = (props) => {
  const { categories, categoryId, title, recipe, ingredients } = props;
  const initialValues = {
    categoryId: categoryId || categories[defaultCategoryId].id,
    title,
    recipe,
    ingredients: arrayToEnumString(ingredients),
  };
  const [imgSrc, setImgSrc] = useState(props.imgSrc);
  const imgFileInput = React.createRef();

  const handleImgFileChange = () => {
    window.URL = window.URL || window.webkitURL;

    if (imgFileInput.current.files.length) {
      const file = imgFileInput.current.files[0];
      setImgSrc(window.URL.createObjectURL(file));
      window.URL.revokeObjectURL(file);
    }
  };
  const handleSubmit = (formData) => {
    props.onSubmit({
      ...formData,
      ingredients: stringToArray(formData.ingredients),
      imgSrc: imgSrc,
    });
  };
  return (
    <FormContainer onSubmit={handleSubmit} initialValues={initialValues}>
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
          fieldType="input"
          type="text"
          name="title"
          label="Заголовок"
          validators={[required]}
        />
        <FormField fieldType="select" name="categoryId" label="Категория">
          {getCategoryValues(categories).map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            );
          })}
        </FormField>
        <FormField
          fieldType="input"
          type="text"
          name="ingredients"
          label="Ингредиенты (через запятую)"
        />
        <FormField
          fieldType="textarea"
          name="recipe"
          type="textarea"
          label="Рецепт"
        />
        <ButtonContainer>{props.buttons}</ButtonContainer>
      </Fields>
    </FormContainer>
  );
};

const FormContainer = styled(Form)`
  display: flex;
  margin: 0 auto;
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
