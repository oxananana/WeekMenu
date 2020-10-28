import React, { useState } from "react";
import styled from "styled-components";
import cn from "classnames";
import * as firebase from "firebase/app";
import "firebase/storage";
import mediaQuery from "../../theme/mediaQuery";
import { arrayToEnumString, stringToArray } from "../../helpers/helpers";
import { defaultCategoryId } from "../../constants";
import { required } from "../../helpers/validate";
import { getCategoryValues } from "../../selectors/selectors";
import Form from "../Common/Form/Form";
import FormField from "../Common/Form/FormField";
import Icon from "../Common/Icon";
import Loader from "../Common/Loader";

const AddEditRecipeForm = (props) => {
  const { categories, categoryId, title, description, ingredients } = props;
  const initialValues = {
    categoryId: categoryId || categories[defaultCategoryId].id,
    title,
    description,
    ingredients: arrayToEnumString(ingredients || []),
  };
  const [imgSrc, setImgSrc] = useState(props.imgSrc || null);
  const [imgIsLoading, setImgIsLoading] = useState(false);
  const imgFileInput = React.createRef();

  const handleImgFileChange = () => {
    if (imgFileInput.current.files.length) {
      const file = imgFileInput.current.files[0];

      const storageRef = firebase.storage().ref(`recipes/${file.name}`);
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setImgIsLoading(true);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("успешно загружено изображение");
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImgSrc(downloadURL);
            setImgIsLoading(false);
          });
        }
      );
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
        <Overlay className={cn({ "overlay-img": imgSrc })}>
          {imgIsLoading ? (
            <Loader invert size="48" />
          ) : (
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
          )}
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
          name="description"
          type="textarea"
          label="Рецепт"
        />
        <ButtonContainer>{props.buttons}</ButtonContainer>
      </Fields>
    </FormContainer>
  );
};

const FormContainer = styled(Form)`
  margin: 0 auto;
  max-width: 1200px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bg.base};
  padding: 24px;

  ${mediaQuery.greaterThen("medium")`
    display: flex;
    padding: 32px;
  `}
`;

const RecipeImgContainer = styled.div`
  background-color: ${({ theme }) => theme.bg.baseLight};
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  margin-bottom: 24px;

  ${mediaQuery.greaterThen("medium")`
    margin-right: 32px;
    margin-bottom: 0;
    width: 50%;
  `}

  ${mediaQuery.greaterThen("large")`
    width: 400px;
  `}
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.img.overlay};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.overlay-img {
    background-color: ${({ theme }) => theme.img.overlayImg};
  }

  label {
    svg {
      width: 48px;
      height: 48px;
      fill: ${({ theme }) => theme.img.overlayIcon};
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
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
