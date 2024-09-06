import { useForm, useFieldArray, Controller } from "react-hook-form";
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
  const [metals, setMetals] = useState([]);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dimensions",
  });

  const onSubmit = (formData) => {
    dispatch(startLoading());
    const data = new FormData();

    data.append("name", formData.name.trim());
    data.append("category", category);
    data.append("description", formData.description.trim());
    data.append("price", formData.price);
    data.append("metals", JSON.stringify(metals));
    data.append("dimensions", JSON.stringify(formData.dimensions));

    images.forEach((file) => {
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
                Metals:
              </p>
              <CheckboxMenu
                onValueChange={(value) => setMetals(value)}
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
            <div className="mt-5">
              <p className="text-left text-base mb-4 font-SofiaBold text-color-foreground">
                Dimensions:
              </p>
              <ul>
                {fields.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 mb-5 last:mb-0"
                  >
                    <div className="field max-w-[40%]">
                      <input
                        {...register(`dimensions.${index}.key`)}
                        placeholder="Key"
                        className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
                      />
                      <label htmlFor="key">Key*</label>
                    </div>
                    <div className="field !mt-0">
                      <Controller
                        render={({ field }) => (
                          <input
                            {...field}
                            placeholder="Value"
                            className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
                          />
                        )}
                        name={`dimensions.${index}.value`}
                        control={control}
                      />
                      <label htmlFor="value">Value*</label>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="flex items-center justify-center group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 96 96"
                        className="fill-foreground75 group-hover:fill-color-foreground group-hover:scale-105"
                        id="trash"
                      >
                        <switch>
                          <g>
                            <path d="M84 22H68v-4c0-6.63-5.37-12-12-12H40c-6.63 0-12 5.37-12 12v4H12a4 4 0 0 0 0 8h4v48c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12V30h4a4 4 0 0 0 0-8zm-48-4c0-2.21 1.79-4 4-4h16c2.21 0 4 1.79 4 4v4H36v-4zm36 60c0 2.21-1.79 4-4 4H28c-2.21 0-4-1.79-4-4V30h48v48z"></path>
                          </g>
                        </switch>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => append({ key: "", value: "" })}
                className="p-3 border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 mt-[15px] text-base px-[30px] bg-[rgba(247,244,244,1)] min-h-[50px]"
              >
                Add dimensions
              </button>
            </div>
            <p className="text-left text-base mt-5 font-SofiaBold text-color-foreground">
              Images:
            </p>
            <div className="flex items-center justify-between border mt-5 px-[15px] h-[45px] hover-border hover:border-no-color">
              <label htmlFor="images" className="text-base text-left mr-4">
                Images*
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files))}
                required
                className="appearance-none m-[1px] text-left w-full relative tracking-[0.4px] text-base text-color-foreground"
              />
            </div>
            <button
              type="submit"
              className="p-3 w-full border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 mt-10 mb-[15px] text-base px-[30px] bg-[rgba(247,244,244,1)] min-h-[50px]"
            >
              <span>Create product</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductCreating;
