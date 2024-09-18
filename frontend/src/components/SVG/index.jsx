export const HeaderLogo = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={`${className}`}
    viewBox="0 0 58 17"
    fill="none"
    {...props}
  >
    <path
      d="M8.484 12.132C7.996 12.132 7.62 11.98 7.356 11.676C7.1 11.364 6.972 10.888 6.972 10.248V6.288C6.972 6.24 6.996 6.216 7.044 6.216H7.464C7.512 6.216 7.536 6.24 7.536 6.288V10.212C7.536 10.708 7.628 11.068 7.812 11.292C7.996 11.508 8.268 11.616 8.628 11.616C8.996 11.616 9.348 11.504 9.684 11.28C10.02 11.048 10.376 10.72 10.752 10.296L10.764 10.836C10.508 11.124 10.252 11.364 9.996 11.556C9.748 11.748 9.496 11.892 9.24 11.988C8.992 12.084 8.74 12.132 8.484 12.132ZM10.812 12C10.772 12 10.748 11.976 10.74 11.928C10.724 11.744 10.708 11.556 10.692 11.364C10.684 11.172 10.676 10.98 10.668 10.788L10.644 10.548V6.288C10.644 6.24 10.668 6.216 10.716 6.216H11.136C11.184 6.216 11.208 6.24 11.208 6.288V10.62C11.208 10.844 11.212 11.064 11.22 11.28C11.228 11.496 11.244 11.712 11.268 11.928C11.276 11.976 11.248 12 11.184 12H10.812ZM12.2961 12C12.2721 12 12.2521 11.992 12.2361 11.976C12.2281 11.952 12.2321 11.932 12.2481 11.916L14.3361 8.976L12.4401 6.3C12.4241 6.276 12.4201 6.256 12.4281 6.24C12.4441 6.224 12.4641 6.216 12.4881 6.216H12.9801C13.0281 6.216 13.0601 6.228 13.0761 6.252L14.1081 7.716C14.2041 7.852 14.3001 7.996 14.3961 8.148C14.5001 8.292 14.6001 8.44 14.6961 8.592H14.7081C14.8041 8.448 14.9001 8.3 14.9961 8.148C15.1001 7.996 15.2041 7.844 15.3081 7.692L16.3281 6.252C16.3361 6.228 16.3481 6.216 16.3641 6.216C16.3881 6.216 16.4081 6.216 16.4241 6.216H16.9041C16.9281 6.216 16.9441 6.224 16.9521 6.24C16.9681 6.256 16.9641 6.276 16.9401 6.3L15.0441 8.964L17.1441 11.916C17.1601 11.932 17.1641 11.952 17.1561 11.976C17.1481 11.992 17.1321 12 17.1081 12H16.5921C16.5521 12 16.5241 11.984 16.5081 11.952L15.3921 10.392C15.2801 10.216 15.1641 10.044 15.0441 9.876C14.9241 9.7 14.8081 9.528 14.6961 9.36H14.6841C14.5801 9.528 14.4681 9.7 14.3481 9.876C14.2281 10.044 14.1121 10.212 14.0001 10.38L12.8841 11.952C12.8761 11.984 12.8481 12 12.8001 12H12.2961ZM20.032 12.132C19.328 12.14 18.792 11.968 18.424 11.616C18.056 11.256 17.872 10.736 17.872 10.056V8.28C17.872 7.56 18.052 7.012 18.412 6.636C18.78 6.26 19.308 6.072 19.996 6.072C20.7 6.072 21.232 6.26 21.592 6.636C21.96 7.004 22.144 7.544 22.144 8.256V9.084C22.144 9.132 22.12 9.156 22.072 9.156H18.424V9.936C18.424 10.512 18.556 10.94 18.82 11.22C19.092 11.492 19.504 11.628 20.056 11.628C20.52 11.628 20.872 11.532 21.112 11.34C21.352 11.148 21.468 10.88 21.46 10.536C21.46 10.488 21.484 10.464 21.532 10.464H21.964C21.996 10.464 22.016 10.484 22.024 10.524C22.032 11.028 21.864 11.42 21.52 11.7C21.184 11.98 20.688 12.124 20.032 12.132ZM18.424 8.664H21.58V8.28C21.58 7.72 21.448 7.296 21.184 7.008C20.92 6.72 20.528 6.576 20.008 6.576C19.488 6.576 19.092 6.724 18.82 7.02C18.556 7.308 18.424 7.728 18.424 8.28V8.664ZM36.6628 12C36.5908 12 36.5548 11.964 36.5548 11.892V8.004C36.5548 7.62 36.4788 7.336 36.3268 7.152C36.1748 6.968 35.9388 6.876 35.6188 6.876C35.3148 6.876 35.0068 6.972 34.6948 7.164C34.3908 7.348 34.0628 7.632 33.7108 8.016L33.6988 7.2C33.9468 6.928 34.1868 6.708 34.4188 6.54C34.6508 6.364 34.8868 6.232 35.1268 6.144C35.3668 6.056 35.6188 6.012 35.8828 6.012C36.4188 6.012 36.8228 6.176 37.0948 6.504C37.3748 6.824 37.5148 7.304 37.5148 7.944V11.892C37.5148 11.964 37.4788 12 37.4068 12H36.6628ZM33.0028 12C32.9308 12 32.8948 11.964 32.8948 11.892V3.912C32.8948 3.84 32.9308 3.804 33.0028 3.804H33.7468C33.8188 3.804 33.8548 3.84 33.8548 3.912V11.892C33.8548 11.964 33.8188 12 33.7468 12H33.0028ZM42.3547 12C42.2907 12 42.2507 11.952 42.2347 11.856C42.2187 11.76 42.1987 11.608 42.1747 11.4C42.1507 11.192 42.1347 11 42.1267 10.824L42.0907 10.464V7.944C42.0907 7.544 42.0107 7.264 41.8507 7.104C41.6987 6.936 41.4347 6.852 41.0587 6.852C40.3627 6.852 40.0147 7.12 40.0147 7.656C40.0147 7.728 39.9827 7.764 39.9187 7.764H39.1867C39.1147 7.764 39.0747 7.7 39.0667 7.572C39.0347 7.1 39.1987 6.724 39.5587 6.444C39.9187 6.164 40.4267 6.02 41.0827 6.012C41.7467 6.012 42.2387 6.168 42.5587 6.48C42.8867 6.792 43.0507 7.276 43.0507 7.932V10.56C43.0507 10.84 43.0547 11.092 43.0627 11.316C43.0787 11.532 43.0987 11.72 43.1227 11.88C43.1387 11.96 43.1027 12 43.0147 12H42.3547ZM40.1827 12.132C39.7427 12.132 39.4027 11.996 39.1627 11.724C38.9307 11.444 38.8147 11.04 38.8147 10.512C38.8147 10.112 38.8907 9.784 39.0427 9.528C39.1947 9.264 39.4387 9.06 39.7747 8.916C40.1187 8.764 40.5667 8.664 41.1187 8.616L42.2467 8.508V9.228L41.1427 9.324C40.6307 9.372 40.2747 9.48 40.0747 9.648C39.8747 9.808 39.7747 10.072 39.7747 10.44C39.7747 10.72 39.8307 10.936 39.9427 11.088C40.0547 11.232 40.2267 11.304 40.4587 11.304C40.7147 11.304 40.9787 11.216 41.2507 11.04C41.5307 10.856 41.8787 10.536 42.2947 10.08L42.3067 10.884C41.9067 11.332 41.5427 11.652 41.2147 11.844C40.8867 12.036 40.5427 12.132 40.1827 12.132ZM44.7394 12C44.6674 12 44.6314 11.964 44.6314 11.892V7.572C44.6314 7.34 44.6274 7.116 44.6194 6.9C44.6114 6.684 44.5914 6.476 44.5594 6.276C44.5514 6.196 44.5874 6.156 44.6674 6.156H45.3514C45.4234 6.156 45.4634 6.188 45.4714 6.252C45.4954 6.412 45.5154 6.592 45.5314 6.792C45.5474 6.984 45.5554 7.156 45.5554 7.308L45.5914 7.824V11.892C45.5914 11.964 45.5554 12 45.4834 12H44.7394ZM45.4714 8.196L45.4354 7.272C45.5954 7.048 45.7754 6.84 45.9754 6.648C46.1834 6.456 46.3994 6.304 46.6234 6.192C46.8474 6.072 47.0634 6.012 47.2714 6.012C47.4074 6.012 47.5114 6.024 47.5834 6.048C47.6474 6.072 47.6794 6.112 47.6794 6.168C47.6954 6.32 47.6994 6.476 47.6914 6.636C47.6914 6.796 47.6794 6.948 47.6554 7.092C47.6554 7.172 47.6114 7.204 47.5234 7.188C47.4674 7.172 47.4034 7.16 47.3314 7.152C47.2674 7.144 47.1994 7.14 47.1274 7.14C46.9274 7.14 46.7274 7.188 46.5274 7.284C46.3354 7.372 46.1474 7.496 45.9634 7.656C45.7874 7.808 45.6234 7.988 45.4714 8.196ZM48.7327 12C48.6607 12 48.6247 11.964 48.6247 11.892V7.608C48.6247 7.376 48.6207 7.144 48.6127 6.912C48.6047 6.68 48.5847 6.472 48.5527 6.288C48.5367 6.2 48.5767 6.156 48.6727 6.156H49.3447C49.4087 6.156 49.4447 6.184 49.4527 6.24C49.4687 6.368 49.4847 6.5 49.5007 6.636C49.5247 6.772 49.5407 6.916 49.5487 7.068C49.8927 6.716 50.2207 6.452 50.5327 6.276C50.8447 6.1 51.1807 6.012 51.5407 6.012C51.9167 6.012 52.2247 6.108 52.4647 6.3C52.7047 6.484 52.8687 6.756 52.9567 7.116C53.3167 6.74 53.6527 6.464 53.9647 6.288C54.2847 6.104 54.6287 6.012 54.9967 6.012C55.4927 6.012 55.8687 6.176 56.1247 6.504C56.3807 6.824 56.5087 7.292 56.5087 7.908V11.892C56.5087 11.964 56.4727 12 56.4007 12H55.6567C55.5847 12 55.5487 11.964 55.5487 11.892V7.98C55.5487 7.612 55.4807 7.336 55.3447 7.152C55.2087 6.968 55.0007 6.876 54.7207 6.876C54.4727 6.876 54.2127 6.956 53.9407 7.116C53.6767 7.276 53.3767 7.524 53.0407 7.86V11.892C53.0407 11.964 53.0047 12 52.9327 12H52.2007C52.1207 12 52.0807 11.964 52.0807 11.892V7.98C52.0807 7.612 52.0127 7.336 51.8767 7.152C51.7407 6.968 51.5327 6.876 51.2527 6.876C51.0047 6.876 50.7487 6.956 50.4847 7.116C50.2207 7.276 49.9207 7.524 49.5847 7.86V11.892C49.5847 11.964 49.5487 12 49.4767 12H48.7327Z"
      fill="#121212"
    />
    <path
      d="M1.344 13C1.288 13 1.26 12.972 1.26 12.916V3.914C1.26 3.858 1.288 3.83 1.344 3.83H1.834C1.89 3.83 1.918 3.858 1.918 3.914V12.384H5.922C5.978 12.384 6.006 12.412 6.006 12.468V12.916C6.006 12.972 5.978 13 5.922 13H1.344Z"
      fill="#121212"
    />
    <path
      d="M28.256 13.154C27.1827 13.154 26.366 12.8787 25.806 12.328C25.246 11.7773 24.966 10.9793 24.966 9.934V6.896C24.966 5.86 25.246 5.06667 25.806 4.516C26.3753 3.956 27.1967 3.676 28.27 3.676C28.9607 3.676 29.5627 3.802 30.076 4.054C30.5987 4.29667 30.986 4.65133 31.238 5.118C31.4993 5.57533 31.588 6.126 31.504 6.77C31.4947 6.80733 31.4807 6.84467 31.462 6.882C31.4433 6.91933 31.4107 6.938 31.364 6.938H30.496C30.4027 6.938 30.3653 6.89133 30.384 6.798C30.4213 6.11667 30.2533 5.594 29.88 5.23C29.516 4.866 28.984 4.684 28.284 4.684C27.5747 4.684 27.0287 4.87067 26.646 5.244C26.2727 5.61733 26.086 6.168 26.086 6.896V9.934C26.086 10.662 26.2727 11.2127 26.646 11.586C27.0287 11.9593 27.5747 12.146 28.284 12.146C29.0027 12.146 29.544 11.964 29.908 11.6C30.2813 11.2267 30.44 10.704 30.384 10.032C30.3653 9.93867 30.4027 9.892 30.496 9.892H31.35C31.4433 9.892 31.4947 9.95267 31.504 10.074C31.56 10.6993 31.4573 11.2453 31.196 11.712C30.944 12.1693 30.566 12.524 30.062 12.776C29.558 13.028 28.956 13.154 28.256 13.154Z"
      fill="#121212"
    />
  </svg>
);

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

export const MenuIcon = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={width}
    height={height}
    id="menu"
    className={`-:fill-text-secondary -:group-hover:fill-text-primary -:group-hover:scale-105 ${className}`}
    {...props}
  >
    <path d="M30 4.112H2a1 1 0 0 0 0 2h28a1 1 0 0 0 0-2zM30 15H2a1 1 0 0 0 0 2h28a1 1 0 0 0 0-2zm0 10.888H2a1 1 0 1 0 0 2h28a1 1 0 1 0 0-2z"></path>
  </svg>
);

export const SearchIcon = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={width + 2}
    height={height + 2}
    id="search"
    className={`-:fill-text-secondary -:group-hover:fill-text-primary -:group-hover:scale-105 ${className}`}
    {...props}
  >
    <path
      fill=""
      d="M13.85,13.15l-2.68-2.69a5.14,5.14,0,0,0,1.2-3.28,5.19,5.19,0,1,0-5.19,5.19,5.14,5.14,0,0,0,3.28-1.2l2.69,2.68a.48.48,0,0,0,.7,0A.48.48,0,0,0,13.85,13.15ZM3,7.18a4.19,4.19,0,1,1,4.18,4.19A4.19,4.19,0,0,1,3,7.18Z"
    ></path>
  </svg>
);

export const AccountIcon = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    fill="none"
    width={width}
    height={height}
    className={`-:stroke-text-secondary -:group-hover:stroke-text-primary -:group-hover:scale-105 ${className}`}
    viewBox="0 0 18 19"
    {...props}
  >
    <g>
      <circle
        cx="9"
        cy="4.3273"
        r="3.367"
        fill="none"
        stroke=""
        strokeMiterlimit="10"
      ></circle>
      <path
        d="M15.25,15.1109a6.25,6.25,0,0,0-12.5,0Z"
        fill="none"
        stroke=""
        strokeMiterlimit="10"
      ></path>
    </g>
  </svg>
);

export const CartIcon = ({ width, height, className, ...props }) => (
  <svg
    className={`-:fill-text-secondary -:group-hover:fill-text-primary -:group-hover:scale-105 ${className}`}
    x="0px"
    y="0px"
    width={width}
    height={height}
    viewBox="0.218 4.167 17.24 15.822"
    enableBackground="new 0.218 4.167 17.24 15.822"
    xmlSpace="preserve"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <g>
      <polyline
        fill="none"
        stroke="#231F20"
        strokeMiterlimit="10"
        points="0.218,4.664 2.864,4.664 5.335,15.42 15.22,15.42 	"
      ></polyline>
      <polyline
        fill="none"
        stroke="#231F20"
        strokeMiterlimit="10"
        points="3.321,6.655 16.856,6.655 15.429,13.262 4.906,13.262 	"
      ></polyline>
      <path
        fill="#231F20"
        d="M7.433,17.419c0.433,0,0.785,0.351,0.785,0.785s-0.351,0.785-0.785,0.785s-0.785-0.351-0.785-0.785l0,0
    		C6.648,17.771,7,17.419,7.433,17.419 M7.433,16.419c-0.986,0-1.785,0.799-1.785,1.785c0,0.986,0.799,1.785,1.785,1.785
    		c0.986,0,1.785-0.799,1.785-1.785C9.217,17.219,8.418,16.421,7.433,16.419z"
      ></path>
      <path
        fill="#231F20"
        d="M13.37,17.419c0.433,0,0.785,0.351,0.785,0.785s-0.351,0.785-0.785,0.785c-0.433,0-0.785-0.351-0.785-0.785
    		l0,0C12.585,17.771,12.937,17.419,13.37,17.419 M13.37,16.419c-0.986,0-1.785,0.799-1.785,1.785c0,0.986,0.799,1.785,1.785,1.785
    		c0.986,0,1.785-0.799,1.785-1.785C15.154,17.219,14.355,16.421,13.37,16.419z"
      ></path>
      <line
        fill="none"
        stroke="#231F20"
        strokeMiterlimit="10"
        x1="4.091"
        y1="10.004"
        x2="16.133"
        y2="10.004"
      ></line>
      <line
        fill="none"
        stroke="#231F20"
        strokeMiterlimit="10"
        x1="6.604"
        y1="6.655"
        x2="7.433"
        y2="13.262"
      ></line>
      <line
        fill="none"
        stroke="#231F20"
        strokeMiterlimit="10"
        x1="10.291"
        y1="6.712"
        x2="10.291"
        y2="13.156"
      ></line>
      <line
        fill="none"
        stroke="#231F20"
        strokeMiterlimit="10"
        x1="14.009"
        y1="6.712"
        x2="12.731"
        y2="13.262"
      ></line>
    </g>
  </svg>
);

export const CaretIcon = ({ width, height, className, ...props }) => (
  <svg
    aria-hidden="true"
    width={width}
    height={height}
    focusable="false"
    className={`-:stroke-text-secondary -:group-hover:stroke-text-primary -:group-hover:scale-105 ${className}`}
    viewBox="0 0 22 13"
    {...props}
  >
    <polyline
      points="21.557 1.222 11 11.778 0.443 1.222"
      fill="none"
      stroke=""
      strokeMiterlimit="10"
    ></polyline>
  </svg>
);

export const EyeIcon = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    id="eye-closed"
    className={`${className}`}
    width={width}
    height={height}
  >
    <rect width="256" height="256" fill="none"></rect>
    <line
      x1="201.15"
      x2="223.96"
      y1="127.305"
      y2="166.813"
      fill="none"
      stroke="#121212"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
    ></line>
    <line
      x1="154.182"
      x2="161.296"
      y1="149.263"
      y2="189.607"
      fill="none"
      stroke="#121212"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
    ></line>
    <line
      x1="101.73"
      x2="94.615"
      y1="149.244"
      y2="189.594"
      fill="none"
      stroke="#121212"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
    ></line>
    <line
      x1="54.809"
      x2="31.889"
      y1="127.272"
      y2="166.971"
      fill="none"
      stroke="#121212"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
    ></line>
    <path
      fill="none"
      stroke="#121212"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
      d="M31.99943,104.87509C48.81193,125.68556,79.63353,152,128,152c48.36629,0,79.18784-26.31424,96.00039-47.12468"
    ></path>
  </svg>
);

export const FacebookIcon = ({ width, height, className, ...props }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 18 18"
    width={width}
    height={height}
    className={`-:fill-text-secondary -:group-hover:fill-text-primary -:group-hover:scale-105 ${className}`}
    {...props}
  >
    <path
      fill=""
      d="M16.42.61c.27 0 .5.1.69.28.19.2.28.42.28.7v15.44c0 .27-.1.5-.28.69a.94.94 0 01-.7.28h-4.39v-6.7h2.25l.31-2.65h-2.56v-1.7c0-.4.1-.72.28-.93.18-.2.5-.32 1-.32h1.37V3.35c-.6-.06-1.27-.1-2.01-.1-1.01 0-1.83.3-2.45.9-.62.6-.93 1.44-.93 2.53v1.97H7.04v2.65h2.24V18H.98c-.28 0-.5-.1-.7-.28a.94.94 0 01-.28-.7V1.59c0-.27.1-.5.28-.69a.94.94 0 01.7-.28h15.44z"
    ></path>
  </svg>
);

export const InstagramIcon = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    id="instagram"
    width={width}
    height={height}
    className={`-:fill-text-secondary -:group-hover:fill-text-primary -:group-hover:scale-105 ${className}`}
    {...props}
  >
    <path
      d="M18.946 6.29a6.606 6.606 0 0 0-.418-2.185 4.412 4.412 0 0 0-1.039-1.594 4.412 4.412 0 0 0-1.594-1.039 6.606 6.606 0 0 0-2.184-.418C12.75 1.01 12.444 1 10 1s-2.75.01-3.71.054a6.606 6.606 0 0 0-2.185.418A4.412 4.412 0 0 0 2.51 2.511a4.412 4.412 0 0 0-1.039 1.594 6.606 6.606 0 0 0-.418 2.184C1.01 7.25 1 7.556 1 10s.01 2.75.054 3.71a6.606 6.606 0 0 0 .418 2.185 4.412 4.412 0 0 0 1.039 1.594 4.411 4.411 0 0 0 1.594 1.039 6.606 6.606 0 0 0 2.184.418C7.25 18.99 7.556 19 10 19s2.75-.01 3.71-.054a6.606 6.606 0 0 0 2.185-.418 4.602 4.602 0 0 0 2.633-2.633 6.606 6.606 0 0 0 .418-2.184C18.99 12.75 19 12.444 19 10s-.01-2.75-.054-3.71zm-1.62 7.347a4.978 4.978 0 0 1-.31 1.67 2.98 2.98 0 0 1-1.708 1.709 4.979 4.979 0 0 1-1.671.31c-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052a4.979 4.979 0 0 1-1.67-.31 2.788 2.788 0 0 1-1.036-.673 2.788 2.788 0 0 1-.673-1.035 4.978 4.978 0 0 1-.31-1.671c-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637a4.979 4.979 0 0 1 .31-1.67 2.788 2.788 0 0 1 .673-1.036 2.788 2.788 0 0 1 1.035-.673 4.979 4.979 0 0 1 1.671-.31c.95-.043 1.234-.052 3.637-.052s2.688.009 3.637.052a4.979 4.979 0 0 1 1.67.31 2.788 2.788 0 0 1 1.036.673 2.788 2.788 0 0 1 .673 1.035 4.979 4.979 0 0 1 .31 1.671c.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637zM10 5.378A4.622 4.622 0 1 0 14.622 10 4.622 4.622 0 0 0 10 5.378zM10 13a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm5.884-7.804a1.08 1.08 0 1 1-1.08-1.08 1.08 1.08 0 0 1 1.08 1.08z"
      transform="translate(-1 -1)"
    ></path>
  </svg>
);

export const TiktokIcon = ({ width, height, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 33.867 33.867"
    id="tiktok"
    width={width}
    height={height}
    className={`-:fill-text-secondary -:group-hover:fill-text-primary -:group-hover:scale-105 ${className}`}
    {...props}
  >
    <path
      d="m22.913 1.057-5.29.001v21.836a4.614 4.614 0 0 1-2.859 4.276 4.611 4.611 0 0 1-5.043-1.003 4.615 4.615 0 0 1-1.004-5.046 4.612 4.612 0 0 1 4.276-2.856h1.711v-5.29h-1.71A9.934 9.934 0 0 0 3.83 19.1a9.934 9.934 0 0 0 2.15 10.81 9.935 9.935 0 0 0 10.81 2.149 9.934 9.934 0 0 0 6.123-9.164V10.786c1.44.858 3.14 1.488 5.233 1.488h2.644V6.983h-2.644c-2.975 0-3.781-1.21-4.487-2.745-.706-1.534-.746-3.181-.746-3.181Z"
      color="#000"
      overflow="visible"
    ></path>
  </svg>
);

export const PinterestIcon = ({ width, height, className, ...props }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    width={width}
    height={height}
    className={`-:fill-text-secondary -:group-hover:fill-text-primary -:group-hover:scale-105 ${className}`}
    {...props}
    viewBox="0 0 17 18"
  >
    <path
      fill=""
      d="M8.48.58a8.42 8.42 0 015.9 2.45 8.42 8.42 0 011.33 10.08 8.28 8.28 0 01-7.23 4.16 8.5 8.5 0 01-2.37-.32c.42-.68.7-1.29.85-1.8l.59-2.29c.14.28.41.52.8.73.4.2.8.31 1.24.31.87 0 1.65-.25 2.34-.75a4.87 4.87 0 001.6-2.05 7.3 7.3 0 00.56-2.93c0-1.3-.5-2.41-1.49-3.36a5.27 5.27 0 00-3.8-1.43c-.93 0-1.8.16-2.58.48A5.23 5.23 0 002.85 8.6c0 .75.14 1.41.43 1.98.28.56.7.96 1.27 1.2.1.04.19.04.26 0 .07-.03.12-.1.15-.2l.18-.68c.05-.15.02-.3-.11-.45a2.35 2.35 0 01-.57-1.63A3.96 3.96 0 018.6 4.8c1.09 0 1.94.3 2.54.89.61.6.92 1.37.92 2.32 0 .8-.11 1.54-.33 2.21a3.97 3.97 0 01-.93 1.62c-.4.4-.87.6-1.4.6-.43 0-.78-.15-1.06-.47-.27-.32-.36-.7-.26-1.13a111.14 111.14 0 01.47-1.6l.18-.73c.06-.26.09-.47.09-.65 0-.36-.1-.66-.28-.89-.2-.23-.47-.35-.83-.35-.45 0-.83.2-1.13.62-.3.41-.46.93-.46 1.56a4.1 4.1 0 00.18 1.15l.06.15c-.6 2.58-.95 4.1-1.08 4.54-.12.55-.16 1.2-.13 1.94a8.4 8.4 0 01-5-7.65c0-2.3.81-4.28 2.44-5.9A8.04 8.04 0 018.48.57z"
    ></path>
  </svg>
);
