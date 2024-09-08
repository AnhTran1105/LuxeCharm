import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../utils/axios";
import DropdownMenu from "../../components/DropdownMenu";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../redux/notification/notificationSlice";
import { startLoading, stopLoading } from "../../redux/loading/loadingSlice";

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().positive().required().default(0),
    salePrice: yup.number().positive().default(null),
    metals: yup.array().of(
      yup.object().shape({
        metal: yup.string().required(),
        quantity: yup.number().positive().required(),
        material: yup.string().required(),
      })
    ),
  })
  .required();

function ProductCreating() {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      dimensions: [{ key: "", value: "" }],
      instructions: [{ key: "", value: "" }],
      metals: [],
    },
  });

  const {
    fields: dimensionFields,
    append: appendDimension,
    remove: removeDimension,
  } = useFieldArray({
    control,
    name: "dimensions",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const {
    fields: metalFields,
    append: appendMetal,
    remove: removeMetal,
  } = useFieldArray({
    control,
    name: "metals",
  });

  const watchMetals = watch("metals");

  useEffect(() => {
    if (watchMetals.length === 0) {
      appendMetal({ metal: "", quantity: 0, material: "", images: [] });
    }
  }, [watchMetals, appendMetal]);

  const onSubmit = (formData) => {
    dispatch(startLoading());
    const data = new FormData();

    data.append("name", formData.name.trim());
    data.append("category", category);
    data.append("description", formData.description.trim());
    data.append("price", formData.price);

    data.append("salePrice", formData.salePrice);

    data.append("dimensions", JSON.stringify(formData.dimensions));
    data.append("instructions", JSON.stringify(formData.instructions));

    formData.metals.forEach((metal, index) => {
      data.append(`metals.${index}.metal`, metal.metal);
      data.append(`metals.${index}.quantity`, metal.quantity);
      data.append(`metals.${index}.material`, metal.material);
      if (metal.images) {
        for (let i = 0; i < metal.images.length; i++) {
          data.append(`metals.${index}.images`, metal.images[i]);
        }
      }
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
            <div className="field">
              <input
                id="salePrice"
                autoComplete="salePrice"
                required
                autoCapitalize="off"
                placeholder="salePrice"
                type="number"
                min={0}
                autoCorrect="off"
                {...register("salePrice")}
                className="appearance-none p-[15px] m-[1px] text-left w-full h-[45px] relative tracking-[0.4px] min-h-[45px] text-base text-color-foreground"
              />
              <label htmlFor="salePrice">Sale price</label>
            </div>
            {errors.salePrice && (
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
                  {errors.salePrice?.message}
                </span>
              </p>
            )}
            <div className="mt-5">
              <p className="text-left text-base mb-4 font-SofiaBold text-color-foreground">
                Dimensions:
              </p>
              <ul>
                {dimensionFields.map((item, index) => (
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
                      onClick={() => removeDimension(index)}
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
                onClick={() => appendDimension({ key: "", value: "" })}
                className="p-3 border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 mt-[15px] text-base px-[30px] bg-[rgba(247,244,244,1)] min-h-[50px]"
              >
                Add dimensions
              </button>
            </div>
            <div className="mt-5">
              <p className="text-left text-base mb-4 font-SofiaBold text-color-foreground">
                Care Instructions:
              </p>
              <ul>
                {instructionFields.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 mb-5 last:mb-0"
                  >
                    <div className="field max-w-[40%]">
                      <input
                        {...register(`instructions.${index}.key`)}
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
                        name={`instructions.${index}.value`}
                        control={control}
                      />
                      <label htmlFor="value">Value*</label>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
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
                onClick={() => appendInstruction({ key: "", value: "" })}
                className="p-3 border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 mt-[15px] text-base px-[30px] bg-[rgba(247,244,244,1)] min-h-[50px]"
              >
                Add instructions
              </button>
            </div>
            <div className="mt-5">
              <p className="text-left text-base mb-4 font-SofiaBold text-color-foreground">
                Metals, Materials, and Images:
              </p>
              {metalFields.map((field, index) => (
                <div key={field.id} className="mb-5 p-4 border rounded-xl">
                  <div className="field">
                    <Controller
                      name={`metals.${index}.metal`}
                      control={control}
                      render={({ field }) => (
                        <select {...field} className="w-full h-[45px] p-[15px]">
                          <option value="">Select Metal</option>
                          <option value="Gold">Gold</option>
                          <option value="Gold Vermeil">Gold Vermeil</option>
                          <option value="Mixed Metal">Mixed Metal</option>
                          <option value="Rose Gold">Rose Gold</option>
                          <option value="Silver">Silver</option>
                          <option value="Sterling Silver">
                            Sterling Silver
                          </option>
                        </select>
                      )}
                    />
                    {/* <label>Metal*</label> */}
                  </div>

                  <div className="field mt-3">
                    <input
                      type="number"
                      {...register(`metals.${index}.quantity`)}
                      placeholder="Quantity"
                      className="w-full h-[45px] p-[15px]"
                    />
                    <label>Quantity*</label>
                  </div>

                  <div className="field mt-3">
                    <input
                      {...register(`metals.${index}.material`)}
                      placeholder="Material"
                      className="w-full h-[45px] p-[15px]"
                    />
                    <label>Material*</label>
                  </div>

                  <div className="mt-3">
                    <input
                      type="file"
                      multiple
                      {...register(`metals.${index}.images`)}
                      className="w-full p-[15px]"
                    />
                  </div>

                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeMetal(index)}
                      className="mt-3 p-2 bg-red-500 text-black rounded"
                    >
                      Remove Metal
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendMetal({
                    metal: "",
                    quantity: 0,
                    material: "",
                    images: [],
                  })
                }
                className="p-3 border border-solid hover:outline-2 hover:outline transition-[outline] duration-100 mt-[15px] text-base px-[30px] bg-[rgba(247,244,244,1)] min-h-[50px]"
              >
                Add Another Metal
              </button>
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
