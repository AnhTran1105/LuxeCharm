import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

function InfoDisclosure({ title, content }) {
  return (
    <div className="border-b border-border-primary/15">
      <Disclosure as="div" className="w-full text-text-secondary">
        <DisclosureButton className="group w-full py-[15px] text-[15px] text-text-primary flex justify-between items-center text-left">
          {title}
          <svg
            className="h-3 w-3 mr-[15px] group-data-[open]:rotate-180 stroke-text-primary"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 22 13"
          >
            <polyline
              points="21.557 1.222 11 11.778 0.443 1.222"
              fill="none"
              strokeMiterlimit="10"
            ></polyline>
          </svg>
        </DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
          >
            {content.map((item) => (
              <p
                key={item.key}
                className="text-[13px] last:mb-[15px] tracking-[0.6px]"
              >
                <strong className="font-SofiaBold">{item.key}</strong>:{" "}
                {item.value}
              </p>
            ))}
          </DisclosurePanel>
        </div>
      </Disclosure>
    </div>
  );
}

export default InfoDisclosure;
