import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
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
  const {
    categories,
    categoryId,
    title,
    description,
    ingredients,
    recipeTitles,
  } = props;
  const initialValues = {
    categoryId: categoryId || categories[defaultCategoryId].id,
    title,
    description,
    ingredients: arrayToEnumString(ingredients),
  };
  const [imgSrc, setImgSrc] = useState(props.imgSrc || null);
  const [imgIsLoading, setImgIsLoading] = useState(false);
  const [isUploadError, setIsUploadError] = useState(false);

  const imgFileInput = React.createRef();

  const handleImgFileChange = () => {
    if (imgFileInput.current.files.length) {
      const file = imgFileInput.current.files[0];
      const fileName = nanoid() + file.type.replace("image/", ".");

      const storageRef = firebase.storage().ref(`recipes/${fileName}`);
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setImgIsLoading(true);
        },
        (error) => {
          setImgIsLoading(false);
          setIsUploadError(true);
        },
        () => {
          console.log("успешно загружено изображение");
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImgSrc(downloadURL);
            setImgIsLoading(false);
            if (isUploadError) {
              setIsUploadError(false);
            }
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

  const uniqueTitle = (value) => {
    if (recipeTitles.includes(value)) {
      return "Рецепт с таким названием уже есть.";
    }
    return undefined;
  };

  return (
    <FormContainer onSubmit={handleSubmit} initialValues={initialValues}>
      <RecipeImgContainer>
        {imgSrc && <RecipeImg src={imgSrc} />}
        <Overlay isOverlayImg={imgSrc} isUploadError={isUploadError}>
          {imgIsLoading ? (
            <Loader size="48" circle />
          ) : (
            <label htmlFor="img">
              <Icon name="camera_plus" />
              <Note>Размер файла не должен превышать 1 Мб.</Note>
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
          label="Название"
          validators={[required, uniqueTitle]}
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

AddEditRecipeForm.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  categoryId: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.string.isRequired,
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
  ingredients: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
  recipeTitles: PropTypes.array.isRequired,
  imgSrc: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  buttons: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

AddEditRecipeForm.defaultProps = {
  title: "",
  ingredients: [],
  description: "",
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
  height: 300px;
  border-radius: 8px;
  margin-bottom: 24px;

  ${mediaQuery.greaterThen("medium")`
    margin-right: 32px;
    margin-bottom: 0;
    width: 50%;
  `}

  ${mediaQuery.greaterThen("large")`
    height: 400px;
    width: 400px;
  `}
`;

const Note = styled.div`
  font-size: 14px;
  margin: 8px auto 0;
  max-width: 170px;
  text-align: center;

  .overlay-img & {
    color: ${({ theme, isUploadError }) =>
      isUploadError ? theme.text.error : theme.text.baseInvert};
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme, isOverlayImg }) =>
    isOverlayImg ? theme.img.overlayImg : theme.img.overlay};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    svg {
      margin: 0 auto;
      width: 48px;
      height: 48px;
      fill: ${({ theme, isOverlayImg }) =>
        isOverlayImg ? theme.img.overlayIcon : theme.text.grayLight};
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  ${Note} {
    color: ${({ theme, isUploadError, isOverlayImg }) =>
      isUploadError
        ? theme.text.error
        : isOverlayImg
        ? theme.text.baseInvert
        : theme.text.gray};
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
