import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../utils/axios";
import DropdownMenu from "../../components/DropdownMenu";
import { useState } from "react";
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

function ProductCreating() {
  const [variations, setVariations] = useState([]);
  const [category, setCategory] = useState("");
  const [backgroundImage, setBackgroundImage] = useState();
  const [hoverImage, setHoverImage] = useState();
  const [additionalImages, setAdditionalImages] = useState();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    dispatch(startLoading());
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", category);
    data.append("description", formData.description);
    data.append("price", formData.price);

    variations.forEach((variation) => {
      data.append("quantities[]", variation.quantity);
    });
    variations.forEach((variation) => {
      data.append("metals[]", variation.metal);
    });

    data.append("backgroundImage", backgroundImage);
    data.append("hoverImage", hoverImage);

    additionalImages.forEach((file) => {
      data.append("imageUrls", file);
    });

    (async () => {
      try {
        const response = await axios.post("products", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(stopLoading());
        dispatch(sendMessage({ message: response.message, type: "success" }));
      } catch (error) {
        dispatch(stopLoading());
        dispatch(sendMessage({ message: error.message, type: "error" }));
      }
    })();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[478px] py-9 px-[15px] text-center">
        <h1 className="text-[40px]">Create Product</h1>
        <div>
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
                autoCorrect="off"
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
              />
            </div>
            <div className="field">
              <textarea
                rows="8"
                id="description"
                autoComplete="description"
                required
                autoCapitalize="off"
                placeholder="description"
                autoCorrect="off"
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
                autoComplete="price"
                required
                autoCapitalize="off"
                placeholder="price"
                type="number"
                min={0}
                autoCorrect="off"
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
              />
            </div>
            <p className="text-left text-base mt-5 font-SofiaBold text-color-foreground">
              Product images:
            </p>
            <div className="flex items-center justify-between border mt-4 px-[15px] h-[45px] hover-border hover:border-no-color">
              <label
                htmlFor="backgroundImage"
                className="text-base text-left mr-4"
              >
                Primary*
              </label>
              <input
                type="file"
                id="backgroundImage"
                onChange={(e) => setBackgroundImage(e.target.files[0])}
                name="backgroundImage"
                required
                className="appearance-none m-[1px] text-left w-full relative tracking-[0.4px] text-base text-color-foreground"
              />
            </div>
            <div className="flex items-center justify-between border mt-5 px-[15px] h-[45px] hover-border hover:border-no-color">
              <label htmlFor="hoverImage" className="text-base text-left mr-4">
                Hovering*
              </label>
              <input
                type="file"
                id="hoverImage"
                onChange={(e) => setHoverImage(e.target.files[0])}
                name="hoverImage"
                required
                className="appearance-none m-[1px] text-left w-full relative tracking-[0.4px] text-base text-color-foreground"
              />
            </div>
            <div className="flex items-center justify-between border mt-5 px-[15px] h-[45px] hover-border hover:border-no-color">
              <label
                htmlFor="additionalImages"
                className="text-base text-left mr-4"
              >
                Others*
              </label>
              <input
                type="file"
                id="additionalImages"
                name="additionalImages"
                multiple
                onChange={(e) =>
                  setAdditionalImages(Array.from(e.target.files))
                }
                required
                className="appearance-none m-[1px] text-left w-full relative tracking-[0.4px] text-base text-color-foreground"
              />
            </div>
            <button
              type="submit"
              className="p-3 w-full border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 mt-10 mb-[15px] text-base px-[30px] bg-[rgba(247,244,244,1)] min-h-[50px]"
            >
              <span>Create new product</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductCreating;
