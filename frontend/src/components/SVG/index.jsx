export const CloseIcon = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 48 48"
    className={`-:fill-text-secondary -:group-hover:fill-text-primary -:group-hover:scale-105 ${className}`}
    {...props}
  >
    <path d="M38 12.83 35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

export const TrashIcon = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 96 96"
    className={`-:fill-text-secondary -:group-hover:fill-text-primary -:group-hover:scale-105 ${className}`}
    {...props}
  >
    <switch>
      <g>
        <path d="M84 22H68v-4c0-6.63-5.37-12-12-12H40c-6.63 0-12 5.37-12 12v4H12a4 4 0 0 0 0 8h4v48c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12V30h4a4 4 0 0 0 0-8zm-48-4c0-2.21 1.79-4 4-4h16c2.21 0 4 1.79 4 4v4H36v-4zm36 60c0 2.21-1.79 4-4 4H28c-2.21 0-4-1.79-4-4V30h48v48z"></path>
      </g>
    </switch>
  </svg>
);

export const StripeIcon = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    className={`${className}`}
    {...props}
  >
    <path
      fill="#fff"
      d="M11.319 9.242h1.673v5.805h-1.673zM4.226 13.355c0-2.005-2.547-1.644-2.547-2.403l.001.002c0-.262.218-.364.567-.368a3.7 3.7 0 0 1 1.658.432V9.434a4.4 4.4 0 0 0-1.654-.307C.9 9.127 0 9.839 0 11.029c0 1.864 2.532 1.561 2.532 2.365 0 .31-.266.413-.638.413-.551 0-1.264-.231-1.823-.538v1.516a4.591 4.591 0 0 0 1.819.382c1.384-.001 2.336-.6 2.336-1.812zM11.314 8.732l1.673-.36V7l-1.673.36zM16.468 9.129a1.86 1.86 0 0 0-1.305.527l-.086-.417H13.61V17l1.665-.357.004-1.902c.24.178.596.425 1.178.425 1.193 0 2.28-.879 2.28-3.016.004-1.956-1.098-3.021-2.269-3.021zm-.397 4.641c-.391.001-.622-.143-.784-.318l-.011-2.501c.173-.193.413-.334.795-.334.607 0 1.027.69 1.027 1.569.005.906-.408 1.584-1.027 1.584zm5.521-4.641c-1.583 0-2.547 1.36-2.547 3.074 0 2.027 1.136 2.964 2.757 2.964.795 0 1.391-.182 1.845-.436v-1.266c-.454.231-.975.371-1.635.371-.649 0-1.219-.231-1.294-1.019h3.259c.007-.087.022-.44.022-.602H24c0-1.725-.825-3.086-2.408-3.086zm-.889 2.448c0-.758.462-1.076.878-1.076.409 0 .844.319.844 1.076h-1.722zm-13.251-.902V9.242H6.188l-.004-1.459-1.625.349-.007 5.396c0 .997.743 1.641 1.729 1.641.548 0 .949-.103 1.171-.224v-1.281c-.214.087-1.264.398-1.264-.595v-2.395h1.264zm3.465.114V9.243c-.225-.08-1.001-.227-1.391.496l-.102-.496h-1.44v5.805h1.662v-3.907c.394-.523 1.058-.42 1.271-.352z"
    ></path>
  </svg>
);

export const MultipleStarsIcon = () => (
  <svg
    width="55"
    height="55"
    viewBox="0 0 55 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M38.813 9.20323L13.2319 34.7843C14.1962 33.82 15.7597 33.82 16.724 34.7843C17.6883 35.7486 17.6883 37.3121 16.724 38.2764L25.3177 29.6826C26.282 28.7183 27.8455 28.7183 28.8098 29.6826C29.7741 30.6469 29.7741 32.2104 28.8098 33.1747L45.8882 16.0963L38.813 9.20323Z"
        fill="#FFF5D7"
      ></path>
      <path
        d="M34.9385 36.4658C35.7811 35.6232 37.1473 35.6232 37.9895 36.4658C38.8124 37.2882 38.8254 38.6063 38.0415 39.4526L35.912 41.586C36.7542 40.7434 38.1204 40.7434 38.963 41.586C39.7905 42.413 39.8006 43.7424 39.0029 44.5879L51.7261 31.8647L45.9878 25.3988L34.9385 36.4658Z"
        fill="#FFF5D7"
      ></path>
      <path
        d="M8.16602 18.0595C9.00861 17.217 10.3745 17.217 11.217 18.0595C12.0399 18.882 12.0529 20.2 11.2691 21.0464L9.13911 23.1793C9.9817 22.3371 11.348 22.3371 12.1901 23.1793C13.0176 24.0068 13.0277 25.3361 12.2304 26.1816L24.9536 13.4584L19.2149 6.99257L8.16602 18.0595Z"
        fill="#FFF5D7"
      ></path>
      <path
        d="M40.237 1.69043L41.0145 6.3679C41.0775 6.74597 40.8865 7.12069 40.5437 7.29189L36.3026 9.4118C35.0379 10.0442 35.3367 11.9278 36.7344 12.138L41.4232 12.8434C41.8021 12.9005 42.0996 13.198 42.1563 13.5769L42.4941 15.8189L42.915 18.1365C43.1252 19.5346 44.682 18.9178 45.3139 17.6531L47.4447 14.1262C47.6159 13.7834 48.2839 13.365 48.662 13.4279L53.1737 14.529C54.5681 14.7611 54.6642 13.856 53.6571 12.864L50.6493 9.26535C50.3762 8.99638 50.1235 7.64479 50.3002 7.3049L52.8783 3.75998C53.5296 2.50532 52.6555 2.19523 51.4013 2.84689L49.4715 2.71933L47.0473 3.97818C46.707 4.15484 46.2916 4.08896 46.0231 3.81621L42.6959 0.437454C41.7044 -0.570046 40.0049 0.295624 40.237 1.69043Z"
        fill="#FFE07D"
      ></path>
      <path
        d="M39.7229 16.1499C39.7229 16.3731 39.6377 16.5968 39.4674 16.7671L1.49135 54.7432C1.1502 55.0843 0.597565 55.0843 0.256837 54.7432C-0.0843103 54.402 -0.0843103 53.8498 0.256837 53.5087L38.2329 15.5326C38.574 15.1915 39.1262 15.1915 39.4674 15.5326C39.6377 15.703 39.7229 15.9266 39.7229 16.1499Z"
        fill="#FFEAA8"
      ></path>
      <path
        d="M34.0476 14.8407C34.0476 15.0639 33.9624 15.2876 33.7916 15.4579L10.6569 38.5931C10.3157 38.9338 9.76351 38.9338 9.42237 38.5931C9.08122 38.2519 9.08122 37.6993 9.42237 37.3586L32.5575 14.2234C32.8982 13.8823 33.4509 13.8823 33.7916 14.2234C33.9624 14.3938 34.0476 14.6174 34.0476 14.8407Z"
        fill="#FFEAA8"
      ></path>
      <path
        d="M17.4601 15.7144C17.4601 15.9376 17.375 16.1609 17.2046 16.3317L1.49037 32.0459C1.14922 32.387 0.59659 32.387 0.255861 32.0459C-0.0852871 31.7047 -0.0852871 31.1525 0.255861 30.8114L15.9701 15.0972C16.3112 14.756 16.8634 14.756 17.2046 15.0972C17.375 15.2675 17.4601 15.4908 17.4601 15.7144Z"
        fill="#FFEAA8"
      ></path>
      <path
        d="M12.6584 14.4043C12.6584 14.6275 12.5733 14.8512 12.4029 15.0216L7.60121 19.8232C7.26007 20.1644 6.70785 20.1644 6.3667 19.8232C6.02555 19.4821 6.02555 18.9299 6.3667 18.5887L11.1684 13.7871C11.5095 13.4459 12.0617 13.4459 12.4029 13.7871C12.5733 13.9574 12.6584 14.1811 12.6584 14.4043Z"
        fill="#FFEAA8"
      ></path>
      <path
        d="M19.2063 20.0791C19.2063 20.3024 19.1211 20.526 18.9507 20.6964L11.0934 28.5537C10.7523 28.8949 10.2 28.8949 9.85889 28.5537C9.51774 28.2126 9.51774 27.6603 9.85889 27.3192L17.7162 19.4619C18.0574 19.1207 18.6096 19.1207 18.9507 19.4619C19.1211 19.6327 19.2063 19.8559 19.2063 20.0791Z"
        fill="#FFEAA8"
      ></path>
      <path
        d="M45.117 24.603L45.6562 27.8458L42.7159 29.3157C41.9443 29.7013 42.1264 30.8511 42.9795 30.9795L46.2298 31.4683L46.4019 32.6101L46.8714 34.5722C46.9998 35.4253 47.8285 35.3083 48.2142 34.5366L49.8435 31.7256L52.9768 32.227C53.8278 32.3684 54.0389 31.8116 53.4246 31.2065L51.3475 28.8432L52.7263 25.7993C53.1237 25.0339 52.7041 24.5782 51.9383 24.976L50.5749 25.3235L48.9246 26.1808L46.618 23.8385C46.0124 23.2237 44.9756 23.752 45.117 24.603Z"
        fill="#FFE07D"
      ></path>
      <path
        d="M41.0317 21.8255C41.0317 22.0492 40.9465 22.2724 40.7761 22.4428L25.9347 37.2842C25.5936 37.6253 25.0413 37.6253 24.7002 37.2842C24.359 36.943 24.359 36.3908 24.7002 36.0497L39.5416 21.2083C39.8824 20.8675 40.435 20.8675 40.7761 21.2083C40.9465 21.379 41.0317 21.6023 41.0317 21.8255Z"
        fill="#FFEAA8"
      ></path>
      <path
        d="M49.4719 2.71848C49.6557 3.53001 49.7618 4.37051 49.7618 5.23785C49.7618 10.0651 46.7427 14.1778 42.4937 15.8181L42.8621 18.2653C43.0723 19.663 44.9564 19.9613 45.5883 18.697L47.7082 14.4556C47.8794 14.1132 48.2546 13.9218 48.6322 13.9848L53.3101 14.7627C54.7045 14.9944 55.5702 13.2949 54.5631 12.3034L51.1843 8.97663C50.9112 8.70766 50.8457 8.29224 51.0219 7.95193L53.2073 3.7436C53.859 2.48937 52.5103 1.14072 51.2557 1.79196L49.4719 2.71848Z"
        fill="#FFD064"
      ></path>
      <path
        d="M51.8418 24.6651L50.5754 25.3226C50.6106 25.6076 50.6349 25.8954 50.6349 26.19C50.6349 29.0698 48.8906 31.5414 46.4019 32.6093L46.7195 34.7183C46.8475 35.5714 47.9972 35.7535 48.3829 34.9818L49.8528 32.0416L53.0956 32.5808C53.9466 32.7222 54.4749 31.6853 53.8601 31.0798L51.5178 28.7736L53.0326 25.856C53.4304 25.0906 52.6071 24.2673 51.8418 24.6651Z"
        fill="#FFD064"
      ></path>
      <path
        d="M18.35 6.08718L18.8892 9.32997L15.949 10.7999C15.1773 11.1855 15.359 12.3349 16.2125 12.4633L19.4629 12.9525L19.6345 14.0943L20.0612 16.0862C20.1896 16.9393 21.1258 16.8848 21.5114 16.1131L22.9885 13.2664L26.2648 13.8304C27.1158 13.9718 27.363 13.3075 26.7482 12.7024L24.385 10.4734L25.9963 7.43876C26.3941 6.67296 25.849 5.9936 25.0832 6.3914L23.8088 6.80724L22.1572 7.66493L19.8506 5.32263C19.2455 4.70789 18.2082 5.23619 18.35 6.08718Z"
        fill="#FFE07D"
      ></path>
      <path
        d="M25.0743 6.15047L23.8083 6.80801C23.8435 7.09251 23.8674 7.38078 23.8674 7.67535C23.8674 10.5552 22.1235 13.0267 19.6348 14.0946L19.952 16.2036C20.0804 17.0567 21.2301 17.2388 21.6158 16.4672L23.0857 13.5269L26.3285 14.0661C27.1795 14.2075 27.7078 13.1702 27.093 12.5651L24.7507 10.2585L26.2655 7.34134C26.6629 6.57596 25.8401 5.75267 25.0743 6.15047Z"
        fill="#FFD064"
      ></path>
      <path
        d="M44.1579 34.232C44.1579 34.4556 44.0727 34.6789 43.9023 34.8492L28.1881 50.5635C27.847 50.9046 27.2948 50.9046 26.9536 50.5635C26.6125 50.2227 26.6125 49.6701 26.9536 49.3294L42.6678 33.6147C43.009 33.274 43.5612 33.274 43.9023 33.6147C44.0727 33.7855 44.1579 34.0088 44.1579 34.232Z"
        fill="#FFEAA8"
      ></path>
      <path
        d="M39.3568 32.9233C39.3568 33.1465 39.2712 33.3698 39.1008 33.5405L34.2991 38.3418C33.9584 38.6829 33.4058 38.6829 33.0646 38.3418C32.7239 38.0011 32.7239 37.4484 33.0646 37.1073L37.8663 32.306C38.2075 31.9649 38.7597 31.9649 39.1008 32.306C39.2716 32.4764 39.3568 32.6996 39.3568 32.9233Z"
        fill="#FFEAA8"
      ></path>
      <path
        d="M45.9041 38.5971C45.9041 38.8204 45.8185 39.044 45.6482 39.2144L37.7908 47.0713C37.4501 47.4124 36.8975 47.4124 36.5563 47.0713C36.2156 46.7306 36.2156 46.1779 36.5563 45.8368L44.4137 37.9799C44.7548 37.6387 45.307 37.6387 45.6482 37.9799C45.8185 38.1502 45.9041 38.3739 45.9041 38.5971Z"
        fill="#FFEAA8"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="55"
          height="55"
          fill="white"
          transform="translate(0 55) rotate(-90)"
        ></rect>
      </clipPath>
    </defs>
  </svg>
);

export const WarningIcon = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    className={`-:fill-red -:mr-2 ${className}`}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    id="exclamation-mark"
    {...props}
  >
    <path
      d="M12,2C12,2,12,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,17c-0.6,0-1-0.4-1-1s0.4-1,1-1
	s1,0.4,1,1S12.6,17,12,17z M13,12c0,0.6-0.4,1-1,1s-1-0.4-1-1V8c0-0.6,0.4-1,1-1s1,0.4,1,1V12z"
    ></path>
  </svg>
);
