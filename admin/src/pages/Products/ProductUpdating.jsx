import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../utils/axios";
import DropdownMenu from "../../components/DropdownMenu";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CheckboxMenu from "../../components/CheckboxMenu";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../redux/notification/notificationSlice";
import { startLoading, stopLoading } from "../../redux/loading/loadingSlice";

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().positive().required().default(0),
  })
  .required();

function ProductUpdating() {
  const [product, setProduct] = useState();
  const [variations, setVariations] = useState([]);
  const [category, setCategory] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [updatedBackgroundImage, setUpdatedBackgroundImage] = useState(null);
  const [hoverImage, setHoverImage] = useState(null);
  const [updatedHoverImage, setUpdatedHoverImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    dispatch(startLoading());
    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", category);
    data.append("description", formData.description);
    data.append("price", formData.price);

    variations.forEach((variation) => {
      data.append("quantities[]", variation.quantity);
      data.append("metals[]", variation.metal);
    });

    if (updatedBackgroundImage)
      data.append("backgroundImage", updatedBackgroundImage);
    if (updatedHoverImage) data.append("hoverImage", updatedHoverImage);

    newImages.forEach((file) => {
      data.append("imageUrls[]", file);
    });

    if (imagesToDelete.length > 0) {
      data.append("imagesToDelete[]", JSON.stringify(imagesToDelete));
    }

    try {
      const response = await axios.put(`/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(stopLoading());
      dispatch(sendMessage({ message: response.data, type: "success" }));
    } catch (error) {
      dispatch(stopLoading());
      dispatch(sendMessage({ message: error.message, type: "error" }));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const productResponse = await axios.get(`/products/${id}`);
        const { data } = productResponse;

        setProduct(data);
        setCategory(data.category);
        setVariations(data.quantities);
        setBackgroundImage(data.backgroundImage);
        setHoverImage(data.hoverImage);
        setImageUrls(data.imageUrls);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("price", data.price);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, setValue]);

  const handleBackgroundImageChange = (e) => {
    setUpdatedBackgroundImage(e.target.files[0]);
  };

  const handleHoverImageChange = (e) => {
    setUpdatedHoverImage(e.target.files[0]);
  };

  const handleImageDelete = (imageUrl) => {
    setImagesToDelete((prev) => [...prev, imageUrl]);
    setImageUrls((prev) => prev.filter((url) => url !== imageUrl));
  };

  const handleImageAdd = (event) => {
    setNewImages((prev) => [...prev, ...event.target.files]);
  };

  console.log(updatedBackgroundImage, updatedHoverImage);

  return (
    product && (
      <div className="flex justify-center items-center">
        <div className="max-w-[478px] py-9 px-[15px] text-center">
          <h1 className="text-[40px]">Update Product</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 text-sm text-color-foreground/75"
          >
            <p className="my-[10px]">* indicates a required field</p>

            <div className="field">
              <input
                id="name"
                autoComplete="name"
                required
                autoCapitalize="off"
                placeholder="name"
                {...register("name")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
              />
              <label htmlFor="name">Name*</label>
            </div>
            {errors.name && (
              <p className="text-left px-4 pt-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  className="fill-red mr-2"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  id="exclamation-mark"
                >
                  <path
                    d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,17c-0.6,0-1-0.4-1-1s0.4-1,1-1
	s1,0.4,1,1S12.6,17,12,17z M13,12c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1V12z"
                  ></path>
                </svg>

                <span className="first-letter:capitalize">
                  {errors.name?.message}
                </span>
              </p>
            )}

            <div className="mt-5">
              <DropdownMenu
                defaultOption="Choose category"
                title="Category"
                options={[
                  "Anklets",
                  "Body Chains",
                  "Bracelets",
                  "Charms",
                  "Earrings",
                  "Gift Bundles",
                  "Mystery",
                  "Necklaces",
                  "Rings",
                ]}
                onValueChange={(newValue) => setCategory(newValue)}
                value={category}
              />
            </div>
            <div className="field">
              <textarea
                rows="8"
                id="description"
                required
                autoCapitalize="off"
                placeholder="description"
                {...register("description")}
                className="appearance-none p-[15px] m-[1px] text-left w-full relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
              />
              <label htmlFor="description">Description*</label>
            </div>
            {errors.description && (
              <p className="text-left px-4 pt-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  className="fill-red mr-2"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  id="exclamation-mark"
                >
                  <path
                    d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,17c-0.6,0-1-0.4-1-1s0.4-1,1-1
	s1,0.4,1,1S12.6,17,12,17z M13,12c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1V12z"
                  ></path>
                </svg>

                <span className="first-letter:capitalize">
                  {errors.description?.message}
                </span>
              </p>
            )}
            <div className="field">
              <input
                id="price"
                required
                type="number"
                min={0}
                placeholder="price"
                {...register("price")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
              />
              <label htmlFor="price">Price*</label>
            </div>
            {errors.price && (
              <p className="text-left px-4 pt-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  className="fill-red mr-2"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  id="exclamation-mark"
                >
                  <path
                    d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,17c-0.6,0-1-0.4-1-1s0.4-1,1-1
	s1,0.4,1,1S12.6,17,12,17z M13,12c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1V12z"
                  ></path>
                </svg>

                <span className="first-letter:capitalize">
                  {errors.price?.message}
                </span>
              </p>
            )}

            <div className="mt-5">
              <p className="text-left text-base mb-4 font-SofiaBold text-color-foreground">
                Metals of product:
              </p>
              <CheckboxMenu
                onValueChange={(value) => setVariations(value)}
                options={[
                  "Gold",
                  "Gold Vermeil",
                  "Mixed Metal",
                  "Rose Gold",
                  "Silver",
                  "Sterling Silver",
                ]}
                values={variations}
              />
            </div>

            <p className="text-left text-base mt-5 font-SofiaBold text-color-foreground">
              Product images:
            </p>
            {backgroundImage && (
              <div className="my-5 flex justify-center items-center">
                <div className="relative w-[50%]">
                  <img src={backgroundImage} alt="background-image" />
                  <button
                    onClick={() => setBackgroundImage(null)}
                    type="button"
                    className="absolute top-2 right-2 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 48 48"
                      className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
                      id="close"
                    >
                      <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border mt-4 px-[15px] h-[45px] hover-border hover:border-no-color">
              <label htmlFor="backgroundImage" className="text-base mr-4">
                Primary*
              </label>
              <input
                type="file"
                id="backgroundImage"
                onChange={handleBackgroundImageChange}
                disabled={backgroundImage !== null}
                className="appearance-none m-[1px] text-left w-full relative tracking-[0.4px] text-base text-color-foreground"
              />
            </div>

            {hoverImage && (
              <div className="my-5 flex justify-center items-center">
                <div className="relative w-[50%]">
                  <img src={hoverImage} alt="hover-image" />
                  <button
                    onClick={() => setHoverImage(null)}
                    className="absolute top-2 right-2 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 48 48"
                      className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
                      id="close"
                    >
                      <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between border mt-5 px-[15px] h-[45px] hover-border hover:border-no-color">
              <label htmlFor="hoverImage" className="text-base text-left mr-4">
                Hover
              </label>
              <input
                type="file"
                id="hoverImage"
                onChange={handleHoverImageChange}
                disabled={hoverImage !== null}
                className="appearance-none m-[1px] text-left w-full relative tracking-[0.4px] text-base text-color-foreground"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-5">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt={`image-${index}`} />
                  <button
                    onClick={() => handleImageDelete(url)}
                    className="absolute top-2 right-2 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 48 48"
                      className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
                      id="close"
                    >
                      <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border mt-5 px-[15px] h-[45px] hover-border hover:border-no-color">
              <label htmlFor="imageUrls" className="text-base text-left mr-4">
                More
              </label>
              <input
                type="file"
                id="imageUrls"
                multiple
                onChange={handleImageAdd}
                className="appearance-none m-[1px] text-left w-full relative tracking-[0.4px] text-base text-color-foreground"
              />
            </div>
            <button
              type="submit"
              className="p-3 w-full border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 mt-10 mb-[15px] text-base px-[30px] bg-[rgba(247,244,244,1)] min-h-[50px]"
            >
              Update product
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default ProductUpdating;
